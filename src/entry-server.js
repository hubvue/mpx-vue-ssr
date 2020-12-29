import { createApp } from './main'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject({ code: 404 })
      }
      Promise.all(matchedComponents.map(Component => {
        if (Component.methods.asyncData) {
          return Component.methods.asyncData()
        }
      })).then(() => {
        resolve(app)
      })
    })
  })
}
