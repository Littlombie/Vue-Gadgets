<template>
<transition :name="transitionName">
  <div id="infoPage">
    <div class="header">
      <span @click="goBack">返回</span>
      <h2>This is  Info Page</h2>
    </div>
    <div class="content">
      <v-slide></v-slide>
      <v-lottery></v-lottery>
      <v-tags></v-tags>
      <v-infinte></v-infinte>
    </div>
  </div>
</transition>
</template>
<script>
import tags from '../components/tags/tag.vue'
import slide from '../components/slider/slider.vue'
import lottery from '../components/lottery/lottery.vue'
import infinteSscroll from '../components/element/infinite-scroll.vue'
export default({
  data () {
    return {
      info: '',
      transitionName: 'fade'
    }
  },
  created () {
    // console.log(this.$route)
  },
  methods: {
    goBack () {
      // history.back()
      this.$router.go(-1)
    }
  },
  components: {
    'v-tags': tags,
    'v-slide': slide,
    'v-lottery': lottery,
    'v-infinte': infinteSscroll
  }
})
</script>

<style lang="stylus" scoped>
  .fade-left-enter,.fade-left-leave-to {
    //  transform: translateX(100%);
    opacity: 0;
  }
  .fade-left-enter-active,.slide-left-leave-active {
    transition: all .5s;
  }
  #infoPage {
    position: absolute;
    left: 0;
    width 100%
    height calc(100vh - 50px)
    background #fff
    .header {
      position relative
      width 100%
      height 40px
      h2 {
        display block
        width 100%
        margin 0 auto
        line-height 40px
        text-align center
        color: #f0e;
        font-size: 24px;
      }
      span {
        position absolute
        left 5px
        line-height 40px
      }
    }
    .content {}
  }
</style>
