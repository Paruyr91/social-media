export default {
  computed: {
    mobileSize () {
      const windowWidth = this.$store.getters['General/WindowWidth']
      return windowWidth < 670
    }
  }
}
