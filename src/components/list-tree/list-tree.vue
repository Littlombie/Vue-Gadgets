<template>
  <li class="item-li">
    <div @click="toggleTree()" >
    <span :class="{'bold':isFolder}">{{treeData.name}}</span>
    <i class="icon-font " v-if="isFolder" :class="open?'icon-cheveron-down':'icon-cheveron-right'"></i>
    </div>
    <ul class="list-tree" v-if="isFolder"  v-show="open" >
      <list-tree class="item-child" v-for="item in treeData.list" :key="item.id" :treeData=item></list-tree>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'listTree',
  props: {
    treeData: Object
  },
  data () {
    return {
      open: false
    }
  },
  computed: {
    // getTree () {
    //   // console.log('222', this.$store.state.treeList.list)
    // }
    isFolder: function () {
      return this.treeData.list &&
        this.treeData.list.length
    }
  },
  methods: {
    toggleTree () {
      if (this.isFolder) this.open = !this.open
    }
  }
}
</script>

<style lang="stylus" scoped>

    .item-li {
      position relative
      color #333
      .icon-font {
        position: absolute;
        right: 5%;
        top: 9px;
        font-size: 22px;
        line-height: 22px;
        color: #333;
        // transition: .2s ease;
        // &.icon-circle-down{
        //   &:before {
        //       content: "\EA42";
        //   }
        //   transform rotate(90deg);
        // }
      }
      .bold{
        font-weight bold;
      }
    }
    &>.item-li {
      width 100%;
      background #f5f5f5;
      span {
        display block;
        width 100%;
        padding-left 5%;
        text-align left;
        line-height 40px;
        color #42b983;
      }
      &>.item-child {
        width 100%;
        .item-li {
          width 100%;
          background #e8e8e8;
          &>span {
            display block;
            width 100%;
          }
          &>.item-child {
            width 100%;
            .item-li {
              width 100%;
              background #e0e0e0;
              &>span {
                display block;
                width 100%;
              }
              &>.item-child {
                width 100%;
                .item-li {
                  width 100%;
                  background #d8d8d8;
                  &>span {
                    display block;
                    width 100%;
                  }
                }
              }
            }
          }
        }
      }
    }
</style>
