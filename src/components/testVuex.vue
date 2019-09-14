<template>
  <div>
      <ul>
        <li v-show="$store.state.dialog.show">
          <a  href="https://github.com/vuejs/awesome-vue"  target="_blank" > awesome-vue  </a>
        </li>
      </ul>
      <button @click="$store.dispatch('add_increment')">参数加一 </button>
  </div>
</template>
<script>
export default {}
</script>
<style lang="stylus" scoped>

</style>
