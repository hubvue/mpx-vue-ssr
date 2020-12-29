import { createPage } from '@mpxjs/core'
import store from '../store/index'

createPage({
  onLoad () {
    console.log('11', store.state.count)
  }
})
