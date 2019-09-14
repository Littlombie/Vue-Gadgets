<template>
<transition name="fade">
  <div id="page_about">
    <vuex-contorller></vuex-contorller>
    Tag 列表显示
    <ul class="tagList">
      <li v-for="(item, index) in tagLists" :key="index" :class="[{move: candelete.id == item.id}, 'touchMove'+item.id, 'tagItem']">Tag 为
        <p @touchstart="touchStart(item)" @touchmove="touchMove(item)"  @touchend="touchEnd(item)">{{item.content}}</p>
        <i @click="clean(item.id)">删除</i>
      </li>
    </ul>
    <button @click="cleanAll"> Clean All</button>
    <div class="list-tree">
      <ul>
        <list-tree :treeData="olist"></list-tree>
      </ul>
    </div>
  </div>
</transition>
</template>
<script>
import {mapState} from 'vuex'
import vuexContorller from '@/components/vuexController'
import listTree from '../components/list-tree/list-tree'
export default {
  data () {
    return {
      name: '',
      clientNum: {},
      candelete: {},
      olist: {}
    }
  },
  created () {
    this.$store.dispatch('getTreeList')
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.olist = this.getList()
        console.log('222222', this.olist)
      }, 1000)
    })
  },
  computed: {
    ...mapState({
      tagLists: state => state.tag.tagList
    })
  },
  methods: {
    init () {
      let moveItems = document.querySelectorAll('.tagItem')
      for (let i = 0; i < moveItems.length; i++) {
        moveItems[i].style.transform = `translateX(0)`
      }
    },
    getList () {
      console.log(this.$store.state.treeList.olist)
      return this.$store.state.treeList.olist
    },
    touchStart (item) {
      let touchs = event.changedTouches[0]
      // 开始记录滑动的鼠标位置
      this.clientNum.x1 = touchs.pageX
      this.candelete = {}
      // console.log(this.clientNum.x1)
      this.$options.methods.init.bind(this)()
    },
    touchMove (item) {
      let touchs = event.changedTouches[0]
      let moveItem = document.querySelector('.touchMove' + item.id)

      // 开始记录滑动的鼠标位置
      this.clientNum.x3 = touchs.pageX
      if (touchs.pageX > 180) {
        moveItem.style.transform = `translateX(-60px)`
      } else {
        moveItem.style.transform = `translateX(-${this.clientNum.x3 - this.clientNum.x1}px)`
      }
    },
    touchEnd (item) {
      let touchs = event.changedTouches[0]
      this.clientNum.x2 = touchs.pageX
      this.candelete = {}
      // console.log(this.clientNum.x2)

      // 判断滑动的距离大于50 则滑动成功 否则失败 不变
      if (this.clientNum.x2 < this.clientNum.x1 && Math.abs(this.clientNum.x1) - Math.abs(this.clientNum.x2) > 50) {
        event.preventDefault()
        this.candelete = item
        // console.log(this.candelete)
      } else if (this.clientNum.x2 > this.clientNum.x1 && Math.abs(this.clientNum.x2) - Math.abs(this.clientNum.x1) > 10) {
        event.preventDefault()
        this.candelete = {}
        let moveItem = document.querySelector('.touchMove' + item.id)
        moveItem.style.transform = `translateX(0px)`
      }
    },
    clean (id) {
      // console.log(id)
      this.$store.dispatch('removeTags', id)
      this.$options.methods.init.bind(this)()
    },
    cleanAll () {
      this.$store.dispatch('removeAllTag')
    }
  },
  components: {
    'vuex-contorller': vuexContorller,
    'list-tree': listTree
  }
}
</script>
<style lang="stylus" scoped>
.fade-enter,.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: all .5s;
}
#page_about {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  .tagList {
    width: 100%;
    margin-top: 20px;
    overflow: hidden;
    li {
      display: block;
      line-height: 40px;
      text-indent: 5%;
      list-style: none;
      text-align: left;
      transition: all .2s ease-in;
      transform: translateX(0px);
      &:nth-child(odd) {
        background-color: #f5f5f5;
      }
      &:nth-child(even) {
        background-color: #fff;
      }
      &.move {
        transform: translateX(-60px);
      }
      p {
        display:inline-block;
        width: 80%;
        text-align: left;
        color:#42b983;
      }
      i {
        position: absolute;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        display: inline-block;
        vertical-align: middle;
        width: 60px;
        height: 40px;
        line-height: 40px;
        margin-left: 10px;
        -webkit-transform: translateX(60px);
        transform: translateX(60px);
        background: #f00;
        color: #fff;
        text-align: center;
      }
    }
  }
  button {
    background: #42b983;
    color: #fff;
    padding: 5px 10px;
    border-radius: 3px;
    margin-top: 20px;
  }
  .list-tree {
    margin-top 20px;
  }
}
</style>
