<template>
  <div id="app">
    <!-- Loading -->
    <Loader />

    <router-view />
  </div>
</template>

<script>
export default {
  components: {
    Loader: () => import('@/components/loader/Index.vue')
  },
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
