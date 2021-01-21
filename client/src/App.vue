<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created () {
    this.ChangeWindowSize()
    window.addEventListener('resize', this.ChangeWindowSize)
  },
  destroyed () {
    window.removeEventListener('resize', this.ChangeWindowSize)
  },
  methods: {
    ChangeWindowSize () {
      this.$store.commit('General/WindowWidth', window.innerWidth)
    }
  }
}
</script>
