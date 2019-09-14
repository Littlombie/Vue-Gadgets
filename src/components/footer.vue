<template>
<transition name="slide">
  <div id="footer">
    <ul>
      <li><router-link to="/"><i class="icon-font icon-home3"></i> Home</router-link></li>
      <li><router-link to="/Info"><i class="icon-font icon-steam2"></i> Info</router-link></li>
      <li><router-link to="/About"><i class="icon-font icon-user-tie"></i> About</router-link></li>
      <li><router-link to="/Github"><i class="icon-font icon-github"></i> GitHub</router-link></li>
    </ul>
  </div>
</transition>
</template>
<script >
export default ({
  data () {
    return {
      name: ' '
    }
  }
})
</script>
<style lang="stylus" scoped>
 .slide-enter,.slide-leave-to {
    transform: translateY(100%);
    /* opacity: 0; */
  }
  .slide-enter-active,.slide-leave-active {
    transition: all .5s;
  }
  #footer
    position: fixed;
    bottom: 0;
    z-index 2147483648
    width: 100%;
    line-height: 50px;
    height: 50px;
    background #333
    color #fff
    ul
      display: flex;
      justify-content: space-around;
      align-items: center;
      li
        width 33.3333%
        a
          &.router-link-exact-active
            color #42b983
          .icon-font
            display: block;
            margin: 2.5vw 0 -13px;
            font-size: 17px;
</style>
