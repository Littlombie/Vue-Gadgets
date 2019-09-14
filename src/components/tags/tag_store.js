export default ({
  state: {
    tagList: [
      {
        id: 0,
        content: '张三'
      },
      {
        id: 1,
        content: '李四'
      }]
  },
  getters: {},
  mutations: {
    addTag (state, text) {
      let id = 0
      id = state.tagList.length ? id = state.tagList[state.tagList.length - 1].id + 1 : id = 0
      state.tagList.push({
        id: id,
        content: text
      })
    },
    removeTag (state, index) {
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === index) {
          state.tagList.splice(i, 1)
        }
      }
    },
    removeAllTag (state) {
      state.tagList.splice(0, state.tagList.length)
    }
  },
  actions: {
    addTags (context, text) {
      context.commit('addTag', text)
    },
    removeTags (content, index) {
      content.commit('removeTag', index)
    },
    removeAllTag (content) {
      content.commit('removeAllTag')
    }
  }
})
