<template>
  <div class="main-container w-full h-screen relative">
    <div class="main-container__inner w-full flex absolute p-4">
      <div
        v-if="!mobileSize"
        class="main-container__item h-full main-container__image"></div>
      <div
        class="main-container__item h-full main-container__form p-4"
        :class="{ 'full-width': mobileSize, ' pl-10': !mobileSize }">
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
            <div class="main-container__form-btn">
              <primary-button>Sign In</primary-button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import screenSize from '@/mixins/screenSize'

export default {
  mixins: [screenSize]
}
</script>

<style lang="scss" scoped>
.main-container {
  background-color: #d8e8f7;

  .main-container__inner {
    top: 50%;
    left: 50%;
    max-width: 900px;
    height: 500px;
    transform: translate(-50%, -50%);

    .main-container__item {
      flex-basis: 50%;

      &.full-width {
        flex-basis: 100%;
      }
      &.main-container__image {
        background-image: url(../../../assets/images/login.png);
        background-size: contain;
        background-repeat: no-repeat;
      }
      &.main-container__form {

        .main-container__form-btn {
          flex-basis: 45%;
        }
      }
    }
  }
}

@media screen and (max-width: 420px) {
  .main-container__form-btns {
    flex-direction: column;

    .main-container__form-btn {
      flex-basis: 100%;

      &:not(:last-child) {
        margin-bottom: 15px;
      }
    }
  }
}
</style>
