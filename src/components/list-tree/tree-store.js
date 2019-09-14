import axios from 'axios'
// import aTree from '../../../static/json/list-tree.json'

export default ({
  state: {
    olist: {}
  },
  getter: {

  },
  mutations: {
    treeList (state, vm) {
      state.olist = vm
    }
  },
  actions: {
    getTreeList (content, state, commit) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/static/json/list-tree.json'
        }).then((resp) => {
          resolve(resp)
        }).catch((err) => {
          console.log(err)
        })
      }).then(resp => {
        console.log('treeList', resp.data)
        if (resp.data) {
          content.commit('treeList', resp.data)
        }
      })
    }
  }
})
