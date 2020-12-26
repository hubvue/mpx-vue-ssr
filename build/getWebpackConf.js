const webpackBaseConf = require('./webpack.base.conf')
const merge = require('webpack-merge')
const getRules = require('./getRules')
const getPlugins = require('./getPlugins')
const { resolveSrc, resolveDist } = require('./utils')

module.exports = function getWebpackConfs (options) {
  const { plugin, subDir, mode, production, watch, ssr } = options
  let entry
  if (ssr) {
    entry = {
      app: resolveSrc(`entry-${ssr}.js`, subDir)
    }
  } else {
    entry = plugin ? {
      plugin: resolveSrc('plugin.json', subDir)
    } : {
      app: resolveSrc('app.mpx', subDir)
    }
  }

  const output = {
    path: resolveDist(ssr ? 'ssr' : mode, ssr || subDir)
  }
  const name = plugin ? 'plugin-compiler' : `${mode}-compiler`
  const rules = getRules(options)
  const plugins = getPlugins(options)
  let extendConfs = {}
  if (production) {
    extendConfs.mode = 'production'
  }
  if (watch) {
    extendConfs.cache = true
    extendConfs.devtool = 'source-map' // 仅在watch模式下生产sourcemap
  }
  if (ssr) {
    const ssrConfig = require(`./webpack.${ssr}.conf.js`)
    extendConfs = merge(extendConfs, ssrConfig)
  }

  return merge(webpackBaseConf, {
    name,
    entry,
    output,
    module: {
      rules
    },
    plugins
  }, extendConfs)
}
