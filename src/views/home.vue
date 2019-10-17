<template>
  <transition name="fade">
    <div class="hello">
      <transition name="slide2">
        <h1 class="welcome" v-if="welcome">{{ msg }}</h1>
      </transition>
      <h2>Some decisions you need to say <span>"{{yesNo.toUpperCase()}}"</span></h2>
      <tabs></tabs>
    </div>
  </transition>
</template>

<script>
import tabs from '../components/tab/tab'
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      bc: [],
      yesNo: ''
    }
  },
  created () {
    this.getData()
    this.yesNos()
  },
  mounted () {
    this.hideTips()
  },
  computed: {
    welcome () {
      return this.$store.state.init.welcome
    }
  },
  methods: {
    getData () {
      this.$http({
        method: 'GET',
        url: '/static/json/text.json'
      }).then(resp => {
        if (resp.data) {
          this.bc = resp.data
        }
      })
    },
    yesNos () {
      this.$http({
        method: 'GET',
        url: 'https://yesno.wtf/api'
      }).then(resp => {
        if (resp.data.answer) {
          this.yesNo = resp.data.answer
        }
      }).catch(err => {
        console.log(err)
      })
    },
    hideTips () {
      this.$nextTick(function () {
        setTimeout(() => {
          this.$store.dispatch('hideWelcome')
        }, 3000)
      })
    }
  },
  components: {
    tabs
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .fade-enter,.fade-leave-to {
    opacity: 0;
  }
  .fade-enter-active,.fade-leave-active {
    transition: all .5s;
  }
 .slide2-enter,.slide2-leave-to {
    transform: translateY(-100%);
    /* opacity: 0; */
  }
  .slide2-enter-active,.slide2-leave-active {
    transition: all .5s;
  }
  .hello {
    position: absolute;
    width: 100%;
    margin-top: 20px;
  }
  h1, h2 {
    font-weight: normal;
  }
  h1.welcome {
    position: fixed;
    z-index: 999;
    top: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    text-align: center;
    background: #fff;
  }
  h2  {
    font-weight: 600;
    color: transparent;
    background-image: -webkit-linear-gradient(right, #777dff 0px, #f154ff 200px, #f0357c 400px),-webkit-linear-gradient(left, #777dff 0px, #497ce2 200px, #37bdde 400px);
    background-image: linear-gradient(to left, #777dff 0px, #f154ff 200px, #f0357c 400px),linear-gradient(to right, #777dff 0px, #497ce2 200px, #37bdde 400px);
    background-size: 51% 100%;
    background-position: top left, top right;
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  h2 span {
    font-size: 18px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 20px 10px;
  }
  a {
    color: #42b983;
  }

</style>
