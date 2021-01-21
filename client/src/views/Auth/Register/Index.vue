<template>
  <div class="main-container w-full flex items-center justify-center">
    <div class="main-container__inner w-full flex items-center p-4">
      <div
        v-if="!mobileSize"
        class="main-container__item left-box h-full main-container__image"></div>

      <div
        class="main-container__item right-box h-full main-container__form p-4"
        :class="{ 'full-width': mobileSize, ' pl-10': !mobileSize }">
        <h1 class="pb-6">Register</h1>
        <form class="main-container__form w-full flex flex-wrap" @submit.prevent.stop>
          <div class="main-container__form-col col-1 p-3">
            <primary-input
              v-validate="'required|alpha|min:3'"
              name="First Name"
              label="First Name"
              v-model="payload.name"
              class="mb-4"
              :class="{ 'danger': errors.has('First Name') }" />
            <primary-input
              v-validate="'required|alpha|min:3'"
              name="Last Name"
              label="Last Name"
              v-model="payload.surname"
              :class="{ 'danger': errors.has('Last Name') }" />
          </div>
          <div class="main-container__form-col col-2 p-3">
            <primary-input
              v-validate="'required|email'"
              name="E-mail"
              class="mb-4"
              label="E-mail"
              v-model="payload.email"
              :class="{ 'danger': errors.has('E-mail') }" />
            <primary-input
              v-validate="'required|min:6'"
              name="Password"
              label="Password"
              type="password"
              v-model="payload.password"
              :class="{ 'danger': errors.has('Password') }" />
          </div>

          <div class="main-container__form-btns w-full flex justify-around mt-12 p-3">
            <div class="main-container__form-btn">
              <secondary-button :to="{ name: 'login' }">Sign In</secondary-button>
            </div>
            <div
              class="main-container__form-btn"
              @click="SignUp">
              <primary-button>Sign Up</primary-button>
            </div>
          </div>
        </form>
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
      Register: 'Auth/Register'
    }),
    async SignUp () {
      const isValid = await this.$validator.validate()

      if (!isValid) return

      try {
        const response = await this.Register(this.payload)
        console.log('component: ', response)
        this.ResetFields()
      } catch (err) {
        console.log('error: ', err)
      }
    },
    ResetFields () {
      const keys = Object.keys(this.payload)

      keys.forEach(key => {
        this.payload[key] = ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  min-height: 100vh;
  height: 100%;
  background-color: #d8e8f7;

  .main-container__inner {
    max-width: 1100px;
    min-height: 500px;

    .main-container__item {

      &.left-box {
        height: 500px;
        flex-basis: 40%;
      }
      &.right-box {
        flex-basis: 60%;
        transform: translateY(-80px);
      }
      &.full-width {
        flex-basis: 100%;
      }
      &.main-container__image {
        background-image: url(../../../assets/images/register.png);
        background-size: contain;
        background-repeat: no-repeat;
      }
      &.main-container__form {

        .main-container__form-col {
          flex-basis: 50%;
          flex-grow: 1;
          min-width: 230px;
        }
        .main-container__form-btn {
          flex-basis: 40%;
        }
      }
    }
  }
}

@media screen and (max-width: 420px) {
  .main-container__form-btns {
    flex-direction: column;

    .main-container__form-btn {
      flex-basis: 100% !important;

      &:not(:last-child) {
        margin-bottom: 15px;
      }
    }
  }
}
</style>
