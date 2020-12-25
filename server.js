// require('node-window-polyfill/register')
const Koa = require('koa')
const Renderer = require('vue-server-renderer')
const fs = require('fs')
const { createSSR } = require('./dist/web/server/app')
const app = new Koa()

const renderer = Renderer.createRenderer({
  template: fs.readFileSync('./src/index.html').toString()
})
app.use(async (ctx, next) => {
  const context = {
    url: ctx.url
  }
  createSSR(context).then(app => {
    renderer.renderToString(app.app, (err, html) => {
      console.log('err', err)
      if (err) {
        if (err.code === 404) {
          ctx.status = 404
          ctx.body = 'Page not found'
        } else {
          ctx.status = 500
          ctx.body = 'Internal Server Error'
        }
      } else {
        ctx.body = html
      }
    })
  }).catch(err => {
    if (err) {
      if (err.code === 404) {
        ctx.status = 404
        ctx.body = 'Page not found'
      } else {
        ctx.status = 500
        ctx.body = 'Internal Server Error'
      }
    }
  })
})

app.listen(8081, () => {
  console.log('server is running')
})
