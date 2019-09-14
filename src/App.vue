<template>
  <div id="app" ref="apps">
    <router-view/>
    <Loading  v-show="showLoading"></Loading>
    <v-footer v-if="$store.state.init.footState"></v-footer>
  </div>
</template>

<script>
import {mapState} from 'vuex'

import Footer from './components/footer'
import Loading from './components/loading/loading'

export default {
  name: 'App',
  created () {
    //  页面导入 开始提交 请求列表数据 到store
    this.$store.dispatch('gettabList')
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.scrolls, true)
    })
  },
  computed: {
    ...mapState({
      showLala: state => state.dialog.showLala,
      count: state => state.dialog.count,
      showLoading: state => state.loading.showLoading
    })
  },
  methods: {
    scrolls () {
      // let top = document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset
      // console.log(this.$refs.app.scrollTop)
      // setTimeout(() => {
      //   console.log(1)
      //   window.scrollTo(0, 0)
      // }, 5000)
    }
  },
  components: {
    'v-footer': Footer,
    Loading
  }
}
</script>

<style lang="stylus">
@import './assets/css/base.styl'

#app {
  position relative
  width 100%
  height 100vh
  overflow-x hidden
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.topTips {
  display:flex;
  justify-content: space-around;
  align-items: center;
}

</style>
