<template>
  <div id="tabs">
    <div class="tab_hd">
      <dl v-for="(item, index) in tabList" :key="item.id" :class="{active:index == $store.state.tab.num}" :name="item.isActived" @click="changeTab(item.id)">
        <dd><img :src="item.goodsIcon" alt=""></dd>
        <dt><span>{{item.typeTitle}}</span></dt>
      </dl>
    </div>
    <div class="tab_bd">
      <transition-group name="fade" mode="out-in">
        <div class="bd_con" v-for="items in tabLists" :key="items.id">
          <h2 class="tTitle">{{items.topTitle}}</h2>
          <dl v-for="(item, index) in items.goodsContent" :key="index">
            <router-link :to="{name:'detail',params:{id:item.id}}" :name="'goods_'+item.id">
              <dd>
                <img :src="item.goodsImg" alt="">
              </dd>
              <dt class="">
                <h3>【{{item.goodsTitle}}】</h3>
                <p>{{item.prices[0]}} / {{item.size[0]}}</p>
              </dt>
            </router-link>
          </dl>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // tabList: []
    }
  },
  created () {
    // this.getTabList()
  },
  computed: {
    tabList () {
      return this.$store.state.tab.list
    },
    tabLists () {
      return this.$store.state.tab.list.filter((item) => {
        if (item.isActive) {
          console.log(item)
        }
        return item.isActive
      })
    }
  },
  methods: {
    // getTabList () {
    //   let _this = this
    //   this.$http({
    //     method: 'GET',
    //     url: '/static/json/tabList.json'
    //   }).then(resp => {
    //     if (resp.data && resp.data.length > 0) {
    //       _this.tabList = resp.data
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    changeTab (i) {
      console.log(i)
      this.$store.dispatch('changeNum', i)
    }
  }
}
</script>

<style lang="stylus" scoped>
  #tabs
    // padding-bottom: 50px
    .tab_hd
      display flex
      flex-wrap wrap
      justify-content center
      dl
        width 22%
        margin 10px 0
        text-align center
        dd
          position relative
          width 18vw
          height 18vw
          margin 0 auto
          text-align center
          border 2px solid #e74c3c
          border-radius 50%
          img
            position absolute
            top 0
            left 0
            right 0
            bottom 0
            margin auto
            width 80%
            height 80%
        dt
          width 18vw
          margin 0 auto
          padding-top 5px
          text-align center
          span
            font-size 14px
        &.active
          dd
            background #e74c3c
    .tab_bd
      padding 20px 0 50px
      background #e74c3c
      .fade-enter-active, .fade-leave-active
        transition: opacity .3s
      .fade-enter, .fade-leave-to
        opacity: 0
      .tTitle
        position relative
        margin-bottom 10px
        color #ffffff
        &:before,&:after
          display block
          content:''
          position absolute
          top 0
          bottom 0
          margin auto
          width: 20vw
          height: 1px
          background: #fff
        &:before
          left -40vw
          right 0
        &:after
          right -40vw
          left 0
      .bd_con
        // display flex
        // justify-content space-around
        // flex-wrap wrap
        width 96%
        margin 20px auto
        -webkit-overflow-scrolling: touch;
        &:after
          display block
          content: ''
          height 0
          clear both
        dl
          width 45%
          float left
          margin 10px 2.5%
          border-radius 5px
          overflow hidden
          dd
            width 100%
            img
              width 100%
              height auto
          dt
            padding 10px 0
            background #fff
            h3
              font-size 15px
              line-height 1.5
            p
              line-height 1.5
              font-size 12px
              color  #e74c3c
</style>
