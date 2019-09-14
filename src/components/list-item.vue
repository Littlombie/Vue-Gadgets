<template>
  <div class="list-con">
    <h3 class="hot-title">热门产品</h3>
    <dl v-for="item in filterHot" :key="item.id" class="hot-item" @click="toLink(item.id)">
        <!-- <router-link :to="{name:'detail',params:{id:item.id}}" :name="'goods_'+item.id"> -->
            <dd>
            <img :src="item.goodsImg" alt="">
            </dd>
            <dt class="">
            <h3>【{{item.goodsTitle}}】</h3>
            <p>{{item.prices[0]}} / {{item.size[0]}}</p>
            </dt>
        <!-- </router-link> -->
    </dl>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    getTabList () {
      return this.$store.state.tab.list
    },
    filterHot () {
      let hotList = []
      let isList = this.$store.state.tab.list
      isList.forEach((now, index) => {
        now.goodsContent.forEach((item, indexs) => {
          if (item.isHot && item.isHot === true) {
            if (hotList.length < 4) {
              hotList.push(item)
            }
          }
        })
      })
      return hotList
    }
  },
  methods: {
    toLink (id) {
      this.$router.push({name: 'detail', params: {id: id}})
    }
  }
}
</script>

<style lang="stylus" scoped>
  .list-con {
    display: flex;
    justify-content: space-between;
    flex-flow: wrap;
    position: relative;
    width: 96%;
    margin: 0 auto;
    padding-top: 40px;
    -webkit-overflow-scrolling: touch;
    background: #e74c3c;
    .hot-title {
      position: absolute;
      top: 10px;
      padding-left: 2%;
      font-size: 18px;
      color: #fff;
    }
  }
  .hot-item {
    width: 45%;
    float: left;
    margin: 10px 2.5%;
    border-radius: 5px;
    overflow: hidden;
    dd {
    width: 100%;
    img {
        width: 100%;
        height: auto;
    }
    }
    dt {
    padding: 10px 0;
    background: #fff;
    h3{
        font-size: 15px;
        line-height:1.5;
    }
    p {
        line-height: 1.5;
        font-size: 12px;
        color: #e74c3c;
    }
    }
}
</style>
