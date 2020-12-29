import { createPage } from '@mpxjs/core'
import store from '../store/index'

createPage({

  async onReady () {
    // eslint-disable-next-line no-debugger
    debugger
    if (!store.state.items.length) {
      await this.asyncData()
    }
    // eslint-disable-next-line no-debugger
    debugger
    console.log('111')
    console.log('store.state.items', store.state.items)
  },
  computed: {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    items () {
      return store.state.items
    }
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async asyncData () {
      console.log('123aaaa')
      await store.dispatch('fetchItems')
    }
  }
})
