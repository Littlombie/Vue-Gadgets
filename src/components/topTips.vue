<template>

    <div class="topTips">
      <a href="javascript:;"  @click="$store.dispatch('switch_dialog')">click it</a>
      <p v-show="$store.state.dialog.show">{{$store.state.dialog.showLala}}</p>
      <p>{{$store.state.dialog.count}}</p>
    </div>
</template>
<script>
export default {}
</script>
<style lang="stylus" scoped>

</style>
