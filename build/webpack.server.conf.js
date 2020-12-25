// const nodeExternals = require('webpack-node-externals')
// const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
module.exports = {
  target: 'node',
  output: {
    libraryTarget: 'commonjs2'
  }
  // plugins: [
  //   new VueSSRServerPlugin()
  // ]
  // externals: nodeExternals({
  //   allowlist: [/\.css$/, /\.mpx$/, /\.styl(us)?$/]
  // })
}
