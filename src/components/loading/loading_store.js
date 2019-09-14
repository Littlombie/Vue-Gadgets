
const loadingStore = ({
  state: {
    showLoading: false
  },
  getters: {
    showLoading (state) {
      return state.showLoading
    }
  },
  mutations: {
    showLoading (state) {
      state.showLoading = true
    },
    hideLoading (state) {
      state.showLoading = false
    }
  },
  actions: {
    showloader ({commit}) {
      commit('showLoading')
    },
    hideloader ({commit}) {
      commit('hideLoading')
    }
  }
})

export default loadingStore
