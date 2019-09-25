<template>
  <transition name="tslide-fade" mode="in-out">
    <div class="goods-detail" ref="goodsDetail" :key="id">
      <!-- <i @click="$router.back()"></i> -->
      <router-link tag="i" to="/"></router-link>
      <div class="goods">
        <img :src="goodItems.goodsImg" alt="">
        <div class="goods-info">
          <h3 v-text="goodItems.goodsTitle"></h3>
          <p class="prices" v-for="(item, index) in goodItems.prices" :key="index">
            <span class="price">{{item}}</span>
            <span class="size">{{goodItems.size[index]}}</span>
          </p>
          <p>{{goodItems.descripion}}</p>
          <p>销售门店：{{goodItems.sellStore}}</p>
        </div>
      </div>
      <div class="hot-list">
        <hotList></hotList>
      </div>
    </div>
  </transition>
</template>
<script>
import hotList from '../components/list-item.vue'
export default {
  data () {
    return {
      id: this.$route.params.id,
      goodItems: {}
    }
  },
  created () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.goodsItem()
      }, 200)
    })
  },
  mounted () {
    // 页面滑动到最顶端
    this.$parent.$el.scrollTop = 0
  },
  updated () {
    console.log('updated')
  },
  watch: {
    $route: {
      handler (newName, oldName) {
        this.id = this.$route.params.id
        this.goodsItem()
        this.$parent.$el.scrollTop = 0
        // this.$router.go(0) //页面重新刷新
      },
      deep: true
    }
  },
  methods: {
    goodsItem () {
      this.goodItems = this.$store.getters.currentList(this.id)
    }
  },
  components: {
    hotList
  }
}
</script>
<style lang="stylus" scoped>
.tslide-fade-enter,.tslide-fade-leave-to
  transform: translateX(100%);
  opacity: 0;
.tslide-fade-enter-active,.tslide-fade-leave-active
  transition: all .5s ease;
.goods-detail
  position absolute
  top 0
  left 0
  z-index 999
  width 100%
  height 100%
  background #fff
  i
    display block
    position absolute
    top 2vw
    left 2vw
    width 32px
    height 32px
    background url(../assets/images/goback.png) 100% 100% / cover no-repeat
  .goods
    img
      width 100%
      height 100vw
      min-height 100vw
    .goods-info
      width 100%
      padding 0 2vw
      text-align left
      h3
        margin 20px 0 10px
        fons-size 24px
      p
        margin 10px 0
        font-size 14px
        text-align left
      .prices
        color #e74c3c
        .price
          font-size 20px
.hot-list {
  margin-top: 30px;
  background: #e74c3c;
}
</style>
