import { createStore } from '@mpxjs/core'
import axios from 'axios'
const store = createStore({
  state: {
    count: 0,
    items: []
  },
  getters: {
    getItems: state => state.items,
    getCount: state => state.count
  },
  mutations: {
    setItems: (state, payload) => {
      state.items = payload
    }
  },
  actions: {
    fetchItems: async ({ commit }) => {
      try {
        // const res = await axios.get('http://jsonplaceholder.typicode.com/posts')
        // commit('setItems', res.data)
      } catch (err) {
        console.log('err', err)
      }
    }
  }
})
export default store
