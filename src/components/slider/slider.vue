<template>
  <div class="slide" v-on:touchstart="stop()" v-on:touchend="move()">
    <div class="slideshow">
        <transition-group tag="ul" name="image">
            <li v-for="(item, index) in imgArray" v-show="index == mark" :key="item" >
                <a href="#">
                    <img :src="item" alt="">
                </a>
            </li>
        </transition-group>
    </div>
    <div class="bar">
      <span v-for="(item, index) in imgArray" :class="{'active' : index=== mark}" @click="change(index)" :key="index"></span>
    </div>
  </div>
</template>
<script>
export default ({
  data () {
    return {
      mark: 0,
      imgArray: [
        require('../../assets/images/1.jpg'),
        require('../../assets/images/2.jpg'),
        require('../../assets/images/3.jpg')
      ],
      timer: null
    }
  },
  created () {
    this.play()
  },
  mounted () {
    let _this = this
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        _this.stop()
        console.log('leave')
      } else {
        _this.move()
        console.log('come')
      }
    })
  },
  methods: {
    autoPlay () {
      this.mark++
      if (this.mark === 3) {
        this.mark = 0
      }
    },
    play () {
      this.timer = setInterval(this.autoPlay, 5000)
    },
    change (i) {
      this.mark = i
    },
    stop () {
      clearInterval(this.timer)
    },
    move () {
      this.timer = setInterval(this.autoPlay, 5000)
    }
  }
})
</script>
<style lang="stylus" scoped>
  .slide
    position relative
    width 100%
    min-height 30vw
    margin 0
    overflow hidden
    .slideshow
      width 100%
      height 30vw
      ul
        width 100%
        height 100%
        li
          position absolute
          width 100%
          height 100%
          background #ccc
          a
            display block
            width 100%
            height 100%
            img
              display block
              width 100%
              height 100%
      .image-enter-active
        transform translateX(0)
        transition all 1s linear
      .image-leave-active
        transform translateX(-100%)
        transition all 1s  linear
      .image-enter
        transform translateX(100%)
      .image-leave
        transform translateX(0)
    .bar
      position absolute
      bottom 5px
      z-index 9
      width 100%
      text-align center
      span
        width: 20px;
        height: 5px;
        border: 1px solid;
        background: white;
        display: inline-block;
        margin-right: 10px;
        &.active
          background: red !important;
</style>
