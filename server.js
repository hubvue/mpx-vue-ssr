// require('node-window-polyfill/register')
// require('isomorphic-fetch')
const Koa = require('koa')
// const KoaStatic = require('koa-static')
const { createBundleRenderer } = require('vue-server-renderer')
// const { resolve } = require('path')

const fs = require('fs')
// const { createSSR } = require('./dist/web/server/app')
const serverBundler = require('./dist/ssr/server/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/ssr/client/vue-ssr-client-manifest.json')
const app = new Koa()

// app.use(KoaStatic(resolve(__dirname, 'dist/ssr/client')))
const renderer = createBundleRenderer(serverBundler, {
  runInNewContext: () => false,
  template: fs.readFileSync('./src/index.html').toString(),
  clientManifest
})
app.use(async (ctx, next) => {
  const context = {
    url: '/pages/list'
  }
  try {
    console.log('context', context)
    const html = await renderer.renderToString(context)
    ctx.body = html
  } catch (err) {
    console.log('err', err)
    if (err.code === 404) {
      ctx.status = 404
      ctx.body = 'Page not found'
    } else {
      ctx.status = 500
      ctx.body = 'Internal Server Error'
    }
  }
})

app.listen(8081, () => {
  console.log('server is running')
})
