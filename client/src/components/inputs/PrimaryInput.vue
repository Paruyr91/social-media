<template>
  <div class="primary-input flex flex-col-reverse w-full">
    <input
      :type="type || 'text'"
      class="primary-input__field"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :placeholder="placeholder || null" >
    <label
      v-if="label"
      class="primary-input__label main w-full font-semibold">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'primary-input',
  props: ['label', 'value', 'type', 'placeholder']
}
</script>

<style lang="scss" scoped>
.primary-input {

  .primary-input__label {
    font-size: 0.875rem;
    margin-bottom: 5px;
    color: #6d6d6d;
  }
  .primary-input__field {
    display: block;
    width: 100%;
    height: $input-height;
    padding: 0 $input-padding;
    border: 1px solid #828282;
    border-radius: $input-radius;
    outline: none;

    &:focus {
      border-color: $primary;

      & ~ .primary-input__label {
        color: $primary;
      }
    }
  }
  &.danger .primary-input__field {
    border-color: $danger;
  }
}
</style>
