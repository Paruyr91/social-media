<template>
  <div class="primary-button w-full">
    <button @click="$router.push(to).catch(() => {})"><slot /></button>
    <div
      v-if="loading === true"
      class="button-loader">
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'primary-button',
  props: ['to', 'loading']
}
</script>

<style lang="scss" scoped>
.primary-button {
  position: relative;
  min-width: 140px;
  height: $input-height;
  border-radius: $input-radius;
  overflow: hidden;

  .button-loader {
    $loader-size: 28px;

    position: absolute;
    top: 5px;
    right: 10px;
    display: inline-block;
    width: $loader-size;
    height: $loader-size;

    .lds-ellipsis {
      display: inline-block;
      position: relative;
      width: 100%;
      height: 100%;

      div {
        position: absolute;
        top: $loader-size * 0.4125;
        width: $loader-size * 0.1625;
        height: $loader-size * 0.1625;
        border-radius: 50%;
        background: #fff;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);

        &:nth-child(1) {
          left: $loader-size * 0.1;
          animation: lds-ellipsis1 0.6s infinite;
        }
        &:nth-child(2) {
          left: $loader-size * 0.1;
          animation: lds-ellipsis2 0.6s infinite;
        }
        &:nth-child(3) {
          left: $loader-size * 0.4;
          animation: lds-ellipsis2 0.6s infinite;
        }
        &:nth-child(4) {
          left: $loader-size * 0.7;
          animation: lds-ellipsis3 0.6s infinite;
        }
      }
    }
    @keyframes lds-ellipsis1 {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes lds-ellipsis3 {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0);
      }
    }
    @keyframes lds-ellipsis2 {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate($loader-size * 0.3, 0);
      }
    }
  }

  button {
    width: 100%;
    height: 100%;
    padding: 0 40px;
    border: none;
    outline: none;
    font-size: 1.1rem;
    background-color: $primary;
    color: #fff;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      background-color: #0f58aa;
    }
  }
}
</style>
