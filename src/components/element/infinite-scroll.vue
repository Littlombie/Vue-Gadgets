<template>
  <div>
    <div
      class="hacker-news-item"
      v-for="(item, $index) in list"
      :key="$index"
      :data-num="$index + 1"
    >
      <a target="_blank" :href="item.url" v-text="item.title"></a>
      <p>
        <span v-text="item.points"></span>
        points by
        <a
          target="_blank"
          :href="`https://news.ycombinator.com/user?id=${item.author}`"
          v-text="item.author"
        ></a>
        |
        <a
          target="_blank"
          :href="`https://news.ycombinator.com/item?id=${item.objectID}`"
          v-text="`${item.num_comments} comments`"
        ></a>
      </p>
    </div>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
const api = '//hn.algolia.com/api/v1/search_by_date?tags=story'
export default {
  data () {
    return {
      page: 1,
      list: []
    }
  },
  methods: {
    infiniteHandler ($state) {
      console.log($state)
      this.$http({
        method: 'GET',
        url: api,
        params: {
          page: this.page
        }
      }).then(data => {
        console.log(data.data)
        if (data.data.hits.length) {
          this.page += 1
          this.list.push(...data.data.hits)
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.hacker-news-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 4px 20px;
  line-height: 14px;
  background-color: #FF6600;

  img {
    border: 1px solid #fff;
    vertical-align: middle;
  }

  span {
    font-family: Verdana, Geneva, sans-serif;
    font-size: 14px;
    font-weight: bold;
    vertical-align: middle;
  }
}

.hacker-news-item {
  margin: 10px 0;
  padding: 0 10px 0 40px;
  text-align left ;
  line-height: 16px;
  font-size: 14px;

  &::before {
    content: attr(data-num) '.';
    float: left;
    margin-left: -40px;
    width: 32px;
    color: #888;
    text-align: right;
  }

  & > a {
    color: #333;
    text-decoration: none;

    &:hover {
      color: #000;
    }
  }

  p {
    margin: 0;
    font-size: 12px;

    &, a {
      color: #888;
    }

    a:not(:hover) {
      text-decoration: none;
    }
  }
}
</style>
