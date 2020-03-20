<template>
  <div class="page-github-search">
    <header>
      <a href="https://github.com/littlombie" target="blank">
      <i class="icon-font icon-github octicon-mark-github"></i>
      </a>
      <input class="searchInput" type="text" value="npm" v-model="npm" @keyup.enter="getInfo(npm)">
      <!-- <button>查看 </button> -->
      <span  @click="getInfo(npm)" class="search-btn"><svg height="24" className="octicon octicon-search" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true"><path fillRule="evenodd" d="M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z"></path></svg></span>
    </header>
    <h4 class="text-normal" v-show="showRepo">
      <svg height="48" class="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="48" aria-hidden="true">
        <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
      </svg>
       Search more than <strong>101M</strong> repositories
    </h4>
    <div class="show-list"  ref="showList" v-show="!showRepo">
      <span><em>{{dataList.total_count | thousandSign}} </em> repository results</span>
      <ul class="list" ref="list">
        <li v-for="(item, index) in allItem" :key="index" :name="'repo-'+item.id">
          <a :href="item.svn_url" target="_blank" class="repo-full-name">{{item.full_name}}</a>
          <p class="repo-desc">{{item.description}}</p>
          <div class="iss-update">
            <span v-for="(i, key, index) in item.license" :key="index"  v-show="key === 'name'" class="license">{{i}}</span>
            <span class="repo-update">Updated {{item.updastedTime}}</span>
          </div>
          <div class="info">
            <span :class="['repo-language repo-language-color', item.language == null ? 'Other': item.language ]" :name="item.language == null ? 'Other': item.language">{{item.language  == null ? 'Other': item.language }}</span>
            <!-- <span class="repo-name">{{item.name}}</span> -->
            <span class="forks-count"><i class="icon-font icon-git"></i> {{item.forkC}}</span>
            <span class="star-count"><i class="icon-font icon-star-full"></i> {{item.sCount}}</span>
          </div>
        </li>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
      </ul>
    </div>
  </div>
</template>
<script>
import loading from '../components/loading/loading.vue'
export default {
  data () {
    return {
      api: 'https://api.github.com/search/repositories',
      npm: '',
      showRepo: true,
      dataList: {},
      allItems: [],
      pageNo: 1,
      pageSize: 10

    }
  },
  filters: {
    thousandSign: function (num) {
      return ('' + num).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
  },
  created () {
    console.log('Cearch Npmjs info')
  },
  computed: {
    allItem () {
      let _this = this
      _this.allItems.forEach(ele => {
        ele.sCount = _this.$pub.toDecimal(ele.stargazers_count)
        ele.forkC = _this.$pub.toThousands(ele.forks_count)
        ele.updastedTime = _this.$pub.getTimes(ele.updated_at)
      })
      return this.allItems
    }
  },
  methods: {
    getInfo (val, pageNo = 1, pageSize = 30) {
      let _this = this
      _this.$http({
        method: 'GET',
        url: `${_this.api}?q=${val}&sort=star&order=desc&page=${pageNo}&per_page=${pageSize}`
      }).then(resp => {
        console.log(resp.data)
        if (resp.data.incomplete_results === false) {
          _this.showRepo = false
          _this.dataList = resp.data
          _this.allItems = resp.data.items
          // 每次更新搜索 页面滑动到最顶端
          if (_this.allItems.length <= pageSize) {
            // _this.$pub.scrollTop()
            _this.$refs.showList.scrollTo(0, 0)
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    infiniteHandler ($state) {
      let _this = this
      _this.$http({
        method: 'GET',
        url: `${_this.api}?q=${_this.npm}&sort=star&order=desc&page=${_this.pageNo}&per_page=${_this.pageSize}`
      }).then((resp) => {
        if (resp.data.incomplete_results === false) {
          _this.showRepo = false
          _this.dataList = resp.data
          _this.pageNo += 1
          _this.allItems.push(...resp.data.items)
          $state.loaded()
          // 每次更新搜索 页面滑动到最顶端
          if (_this.allItems.length <= _this.pageSize) {
            // _this.$pub.scrollTop()
            _this.$refs.showList.scrollTo(0, 0)
          }
        } else {
          $state.complete()
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    'loading': loading
  }
}
</script>
<style lang="stylus" scoped>
  .page-github-search
    position absolute
    top 0
    left 0
    width 100%
  header
    position fixed
    top 0
    left 0
    display flex
    justify-content space-around
    align-items center
    width 100%
    background #24292e
    padding 2vw 0
    .octicon-mark-github
      font-size 32px
      color #fff
    .searchInput
      width 75vw
      height 32px
      background #fff
      border-radius 3px
      border 1px solid #fff
    .search-btn
      fill: currentColor;
      color #fff
  .text-normal
    text-align center
    display block
    margin 40vw auto
    svg
      margin 0 auto 20px
  .show-list
    margin-top 60px
    text-align left
    width 100%
    height calc(100vh - 110px)
    padding 0 3vw
    overflow-y scroll
    -webkit-overflow-scrolling touch
    &>span
      display block
      width 100%
      font-size 12px
      padding-bottom: 5px;
      border-bottom 1px solid #d4d4d4
      em
        font-size: 18px;
    ul
      li
        padding 20px 0
        border-bottom 1px solid #eee
        a.repo-full-name
          font-size 18px
          color #0366d6
          line-height 1.2
        p.repo-desc
          display block
          margin-top 20px
          font-size 14px
          line-height 1.5
        .iss-update
          display flex
          justify-content start
          margin-top 20px
          span.repo-update, span.license
            display block
            font-size: 12px;
            margin-right 10px
        .info
          display flex
          justify-content space-between
          margin-top 20px
          .repo-language
            width 50%
            font-size 16px
          .forks-count,.star-count
            flex 1
            text-align center
          .forks-count
            &:before
              display inline-block
              content:''
          .star-count
            padding-right 10px
            text-align right
            &:before
              display inline-block
              content:''
</style>
