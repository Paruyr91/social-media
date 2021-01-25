<template>
  <div class="secondary-button w-full">
    <button type="button" @click="$router.push(to).catch(() => {})"><slot /></button>
  </div>
</template>

<script>
export default {
  name: 'secondary-button',
  props: ['to']
}
</script>

<style lang="scss" scoped>
.secondary-button {
  min-width: 120px;
  height: $input-height;
  border-radius: $input-radius;
  overflow: hidden;

  button {
    width: 100%;
    height: 100%;
    padding: 0 $input-padding;
    border-radius: $input-radius;
    border: 1px solid $primary;
    outline: none;
    font-size: 1.1rem;
    background-color: #fff;
    color: $primary;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      border-color: #0f58aa;
    }
  }
}
</style>
