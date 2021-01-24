<template>
  <div class="main-container w-full h-screen relative">
    <div class="bg-effect">
      <div class="bg-effect__inner"></div>
    </div>
    <div class="main-container__inner w-full flex absolute p-4">
      <div
        v-if="!mobileSize"
        class="main-container__item h-full main-container__image"></div>
      <div
        class="main-container__item h-full main-container__form"
        :class="{ 'full-width': mobileSize }">
        <div class="main-container__form--inner p-4">
          <h1 class="pb-6">Login</h1>
          <form class="main-container__form" @submit.prevent>
            <primary-input
              class="pb-4"
              label="Username"
              />
            <primary-input
              label="Password"
              type="password"
              />

            <div class="main-container__form-btns flex justify-between mt-12">
              <div class="main-container__form-btn">
                <secondary-button :to="{ name: 'register' }">Sign Up</secondary-button>
              </div>
              <div
                class="main-container__form-btn"
                @click="login">
                <primary-button :loading="buttonLoading">Sign In</primary-button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import screenSize from '@/mixins/screenSize'

export default {
  mixins: [screenSize],
  data () {
    return {
      buttonLoading: false
    }
  },
  methods: {
    login () {
      this.$loading.open()
      this.buttonLoading = true
      console.log('start loading')

      setTimeout(() => {
        this.buttonLoading = false
        this.$loading.close()
        console.log('end loading')
      }, 1800)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './scss/';
</style>
