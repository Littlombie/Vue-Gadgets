import axios from 'axios'

export default ({
  state: {
    num: 0,
    list: []
  },
  getters: {
    currentList: (state) => (id) => {
      let newArr = {}
      state.list.forEach(element => {
        element.goodsContent.filter(item => {
          if (item.id === id) {
            newArr = item
          }
        })
      })
      return newArr
    }
  },
  mutations: {
    changetabNum (state, num) {
      state.num = num
      console.log('/num', state, num, state.list[state.num])
      state.list.forEach(item => {
        item.isActive = false
      })
      state.list[state.num].isActive = true
    },
    getTabList (state, vm) {
      state.list = vm
    }
  },
  actions: {
    changeNum (content, num) {
      content.commit('changetabNum', num)
    },
    gettabList ({content, state, commit}) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/static/json/tabList.json'
        }).then((resp) => {
          if (resp.data && resp.data.length > 0) {
            // console.log(resp.data)
            commit('getTabList', resp.data)
          }
        }).catch(err => {
          console.log(err)
          throw err
        })
      })
    }
  }
})
