export default({
  state: {
    welcome: true,
    footState: true,
    testInnerState: false
  },
  mutations: {
    hideFoot (state) {
      state.footState = false
    },
    hideWelcome (state) {
      state.welcome = false
    }
  },
  actions: {
    hideWelcome (content) {
      content.commit('hideWelcome')
    }
  }
})
