<template>
  <transition name="zoom">
    <div class="bigload">
      <img src="../../assets/images/loading.gif" alt="">
      <p>正在加载</p>
    </div>
  </transition>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
  .zoom-enter-active, .zoom-leave-active {
    transition all .1s ease-out
    transform scale(1)
    opacity 1
  }
  .zoom-enter, .zoom-leave-to {
    opacity 0
    transform scale(.5)
  }
  .bigload
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: -20%;
    z-index 99
    width 90px
    height 90px
    margin auto
    padding: 0 !important
    background rgba(0, 0, 0, .7)
    border-radius 8px
    img
      display block
      position: absolute;
      left: 25px;
      top: 15px;
      width 40px
      height 40px
    p
      position absolute
      bottom 10px
      width 90px
      color #fff
      text-align center
      font-size 12px
</style>
