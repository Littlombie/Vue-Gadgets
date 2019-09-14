import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Home from '@/views/home'
import Info from '@/views/info'
import About from '@/views/about'
import Detail from '@/views/detail'
import Github from '@/views/githubList'

Vue.use(Router)

const vueRouter = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: Home
    },
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'Home'
      },
      component: Home
    },
    {
      path: '/detail/:id',
      name: 'detail',
      meta: {
        title: 'goods-detail'
      },
      component: Detail
    },
    {
      path: '/info',
      name: 'Info',
      meta: {
        title: 'Info Page'
      },
      component: Info
    },
    {
      path: '/about',
      name: 'About',
      meta: {
        title: 'About Page'
      },
      component: About
    },
    {
      path: '/github',
      name: 'Github',
      meta: {
        title: 'Github Search'
      },
      component: Github
    }
  ],
  scrollBehavior: (to, from, savedPosition) => ({ x: 0, y: 0 })
})

vueRouter.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.name === 'detail' && store.state.init.footState) {
    store.state.init.footState = !store.state.init.footState
  } else {
    store.state.init.footState = true
  }
  // document.body.scrollTop = 0
  // document.documentElement.scrollTop = 0
  next()
})
vueRouter.afterEach((to, from, next) => {
  // 跳到每个页面的时候 让页面滑动到最顶端
  // document.body.scrollTop = 0
  // document.documentElement.scrollTop = 0
})

export default vueRouter
