<template>
  <div class="content-lottery">
    <h2>抽个奖</h2>
    <h3 v-if="status === 1"> 准备 </h3>
    <h3 v-if="status === 2">
      <p v-show="number===0">点</p>
      <p v-show="number===1">兵</p>
      <p v-show="number===2">点</p>
      <p v-show="number===3">将</p>
    </h3>
    <div v-if="status===3" class="infos">
      <h3>恭喜</h3>
      <h2>{{users[price].name}}</h2>
      <img class="ava" :src="users[price].ava" alt="">
    </div>
    <div class="btns">
      <button :disabled="status !== 1" @click="handleStart">开始</button>
      <button :disabled="status !== 2" @click="handleEnd">结束</button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      status: 1,
      number: 0,
      users: [],
      price: -1,
      ready_s: 0
    }
  },
  created () {
    this.$nextTick(() => {
      this.getUser()
    })
  },
  mounted () {
    setInterval(() => {
      if (this.number === 3) {
        this.number = 0
      } else {
        this.number++
      }
    }, 200)
  },
  methods: {
    getUser () {
      this.$http({
        method: 'GET',
        url: 'api/users'
      }).then(resp => {
        console.log(resp.data)
        if (resp.data.status === 200) {
          if (resp.data.data.length > 1) {
            this.users = resp.data.data
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleStart () {
      this.status = 2
    },
    handleEnd () {
      this.status = 3
      let count = this.users.length
      let num = Math.floor(Math.random() * count + 0)
      this.price = num
      console.log(this.price, count)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .content-lottery
    margin 20px 0
    background #efefef
    padding 20px 0
    h2
      font-size 20px
    .infos
      width 100%
      text-align center
      .ava
        margin 10px auto
        display block
    .btns
      margin-top 20px
      button
        background-color #ccc
        padding 4px 8px
        border-radius 2px
</style>
