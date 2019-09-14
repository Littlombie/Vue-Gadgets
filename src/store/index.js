import Vue from 'vue'
import Vuex from 'vuex'
import Init from '@/store/init.js'
import dialogStore from '@/components/dialog_store.js'
import tagStroe from '@/components/tags/tag_store.js'
import tabStroe from '@/components/tab/tab_store.js'
import loadingStore from '@/components/loading/loading_store.js'
import treeList from '@/components/list-tree/tree-store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    init: Init,
    dialog: dialogStore,
    tag: tagStroe,
    tab: tabStroe,
    loading: loadingStore,
    treeList
  }
})
