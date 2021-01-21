<template>
  <div class="primary-button w-full">
    <button @click="$router.push(to).catch(() => {})"><slot /></button>
  </div>
</template>

<script>
export default {
  name: 'primary-button',
  props: ['to']
}
</script>

<style lang="scss" scoped>
.primary-button {
  min-width: 120px;
  height: $input-height;
  border-radius: $input-radius;
  overflow: hidden;

  button {
    width: 100%;
    height: 100%;
    padding: 0 $input-padding;
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
