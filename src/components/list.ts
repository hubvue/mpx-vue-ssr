import { createComponent } from '@mpxjs/core'

createComponent({
  data: {
    listData: ['手机', '电视', '电脑']
  },
  onReady () {
    console.log('ready')
  }
})
