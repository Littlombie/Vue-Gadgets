<template>
  <div class="controller">
    <span @click="getCount">获取参数- {{nCount}}--{{$store.state.dialog.count}}</span>
    <p @click="$store.dispatch('clear_data')">参数清零</p>
  </div>
</template>
<script>
export default{
  data () {
    return {
      name: '',
      nCount: 0
    }
  },
  computed: {},
  created () {
    // console.log(this.$store.state.dialog)
  },
  methods: {
    getCount () {
      this.nCount = this.$store.state.dialog.count
    }
  }
}
</script>

<style lang="stylus" scoped>
  .controller {
    display flex
    justify-content space-around
    align-items center
    width 100%
    margin-top 20px
  }
  p {
    color: #999
  }
</style>
