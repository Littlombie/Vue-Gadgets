// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'
import Mock from 'mockjs'
import InfiniteLoading from 'vue-infinite-loading'
import pub from './assets/script/utils.js'

import './assets/css/index.styl'

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$pub = pub

Vue.use(VueAxios, axios)
Vue.use(InfiniteLoading)

//  配置数据请求全局
axios.interceptors.request.use(function (config) {
  store.dispatch('showloader') // 每个请求 都显示 loading
  return config
}, function (err) {
  return Promise.reject(err)
})

axios.interceptors.response.use(function (response) {
  store.dispatch('hideloader') // 隐藏loading
  return response
}, function (err) {
  return Promise.reject(err)
})

Mock.mock('api/users', (req, res) => {
  return Mock.mock({
    'status': 200,
    'data|30': [
      {
        'id|+1': 0,
        'ava': "@image('40x40', '@hex()', '#FFF', 'png', 'ava'",
        'name': '@cname()'
      }
    ]
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
