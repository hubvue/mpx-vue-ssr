import App from './app.mpx?app=true'
import Router from 'vue-router'
import Vue from 'vue'

delete App.router

Vue.use(Router)

export const createRouter = () => {
  return new Router({
    model: 'history',
    routes: global.__mpxRouter.options.routes
  })
}

export const createApp = () => {
  const router = createRouter()
  const app = new Vue({
    router,
    render: h => h(App)
  })
  return {
    router,
    app
  }
}
