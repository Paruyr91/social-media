<template>
  <div
    v-if="loading === true"
    class="loader">
    <div class="loader__inner"><div></div><div></div><div></div><div></div></div>
  </div>
</template>

<script>
import './loader'

export default {
  data () {
    return {
      loading: false
    }
  },
  created () {
    this.$eventEmitter.$on('toggle-loading', state => { this.loading = state })
  }
}
</script>

<style lang="scss" scoped>
@import './scss/';
</style>
