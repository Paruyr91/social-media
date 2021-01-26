<template>
  <div class="main-container w-full flex items-center justify-center" v-cloak>
    <div class="bg-effect">
      <div class="bg-effect__inner"></div>
    </div>

    <div class="main-container__inner">
      <h1 class="main-container__inner--header text-center pb-6">Account verification</h1>
      <template v-if="status === 'verify'">
        <p class="main-container__inner--text text-center mb-12">Account successfully verified. Go to <router-link class="main-container__inner--link" to="/">Home page</router-link></p>
        <img class="verification-icon" :src="verifySVG" alt="Verify account">
      </template>
    </div>
  </div>
</template>

<script>
import verifySVG from '@/assets/svgs/verify.svg'
import { mapActions } from 'vuex'

export default {
  // mixins: [screenSize]
  data () {
    return {
      status: 'verify'
    }
  },
  computed: {
    verifySVG: () => verifySVG
  },
  async mounted () {
    setTimeout(() => {
      this.$loading.open()
    }, 0)
    try {
      const res = await this.checkVerification(this.$route.params.token)
      console.log('response: ', res)
    } catch (err) {
      console.log('Error: ', err)
    } finally {
      this.$loading.close()
    }
  },
  methods: {
    ...mapActions({
      checkVerification: 'Auth/VerifyAccount'
    })
  }
}
</script>

<style lang="scss" scoped>
  @import './scss/';
</style>
