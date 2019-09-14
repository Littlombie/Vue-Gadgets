export default {
  state: {
    count: 0,
    show: false,
    showLala: '没变'
  },
  getters: {
    not_show (state) {
      return !state.show
    }
  },
  mutations: {
    switch_dialog (state) {
      // eslint-disable-next-line
      state.show = state.show ? false : true;
      state.showLala = '变化了'
    },
    increment (state) {
      state.count++
    },
    clearData (state) {
      state.count = 0
    }
  },
  actions: {
    switch_dialog (context) {
      context.commit('switch_dialog')
    },
    add_increment (state) {
      state.commit('increment')
    },
    clear_data (state) {
      state.commit('clearData')
    }
  }
}
