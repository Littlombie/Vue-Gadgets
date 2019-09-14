<template>
  <div>
    <h3>添加Tag</h3>
    <ul class="tags">
      <li v-for="(item, index) in tagLists" :key="index"><span :name="item.id">{{item.content}}</span><i @click="clean(index)"></i></li>
    </ul>
    <input type="text" v-model="insertTag" v-show="showInsert" class="showInput" ref="input" placeholder="添加Tag,按enter创建" @keyup.enter="add(insertTag)" />
    <span @click="addTag" class="addBtn">点击添加tag</span>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default ({
  name: 'tamplateName-tag',
  data () {
    return {
      showInsert: false,
      insertTag: '',
      addTags: false
    }
  },
  computed: {
    ...mapState({
      tagLists: state => state.tag.tagList
    })
  },
  directive: {
    // 当绑定元素插入到 DOM 中。
    focus: {
      bind (el) {
        el.focus()
      },
      inserted (el) {
        el.focus()
      },
      // 也可以用update,update就是当页面有操作的时候就触发，比如点击按钮，输入框输入都算。
      // 有一个要注意的就是，就是你页面有几个input,比如一个input绑定了v-focus,一个没有绑定。你在没绑定v-focus的input输入时，绑定了v-focus的input就是自动获取焦点，这是个bug.
      update (el) {
        el.focus()
      }
    }
  },
  methods: {
    addTag () {
      if (!this.addTags) {
        this.showInsert = true
        this.addTags = true
        // this.$refs.input.focus()
      }
    },
    add (text) {
      if (text.trim() !== '') {
        this.$store.dispatch('addTags', text)
        this.insertTag = ''
        this.addTags = false
        this.showInsert = false
      }
    },
    clean (index) {
      this.$store.dispatch('removeTags', index)
    }
  }
})
</script>
<style lang="stylus" scoped>
  ul.tags {
    li {
      display: inline-block;
      margin: 5px;
      padding: 2px 6px;
      font-size: 14px;
      color: #fff;
      background: #42b983;
      border-radius: 5px;
      i {
        display: inline-block;
        vertical-align middle;
        width: 14px;
        height: 14px;
        background: url(../../assets/images/close.svg) 100% 100% / 100% 100% no-repeat;
      }
    }
  }
  .showInput {
    width: 55vw;
    height: 24px;
    line-height:24px;
    margin-top:30px;
    border-radius:3px;
    text-indent: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
  }
  .addBtn {
    display:inline-block;
    margin-top:30px;
    padding: 2px 6px;
    background: #f5f5f5;
    border-radius: 5px;
  }
</style>
