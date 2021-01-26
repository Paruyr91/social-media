<template>
  <div class="main-container w-full flex items-center justify-center">
    <div class="bg-effect">
      <div class="bg-effect__inner"></div>
    </div>
    <div class="main-container__inner w-full flex items-start p-4">
      <div
        v-if="!mobileSize"
        class="main-container__item left-box h-full main-container__image"></div>

      <div
        class="main-container__item right-box h-full main-container__form"
        :class="{ 'full-width': mobileSize }">
        <div class="main-container__form--inner">
          <h1 class="p-4 pb-6">Register</h1>
          <form class="main-container__form w-full flex flex-wrap" @submit.prevent.stop>
            <div class="main-container__form-col col-1">
              <primary-input
                v-validate="'required|alpha|min:3'"
                name="First Name"
                label="First Name"
                v-model="payload.name"
                class="p-4 pt-2 pb-2"
                :class="{ 'danger': errors.has('First Name') }" />
              <primary-input
                v-validate="'required|alpha|min:3'"
                name="Last Name"
                label="Last Name"
                v-model="payload.surname"
                class="p-4 pt-2 pb-2"
                :class="{ 'danger': errors.has('Last Name') }" />
            </div>
            <div class="main-container__form-col col-2">
              <primary-input
                v-validate="'required|email'"
                name="E-mail"
                class="p-4 pt-2 pb-2"
                label="E-mail"
                v-model="payload.email"
                :class="{ 'danger': errors.has('E-mail') }" />
              <primary-input
                v-validate="'required|min:6'"
                name="Password"
                label="Password"
                class="p-4 pt-2 pb-2"
                type="password"
                v-model="payload.password"
                :class="{ 'danger': errors.has('Password') }" />
            </div>

            <div class="main-container__form-btns w-full flex justify-around mt-8 p-4">
              <div class="main-container__form-btn">
                <secondary-button :to="{ name: 'login' }">Sign In</secondary-button>
              </div>
              <div
                class="main-container__form-btn"
                @click="signUp">
                <primary-button>Sign Up</primary-button>
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
import { mapActions } from 'vuex'

export default {
  mixins: [screenSize],
  data () {
    return {
      payload: {
        name: '',
        surname: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      register: 'Auth/Register'
    }),
    async signUp () {
      const isValid = await this.$validator.validate()

      if (!isValid) return

      try {
        await this.register(this.payload)
        this.$router.push({ name: 'login' })
      } catch (err) {
        console.log('error: ', err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './scss/';
</style>
