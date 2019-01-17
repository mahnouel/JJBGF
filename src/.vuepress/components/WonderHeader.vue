<template>
  <header :class="`header ${theme}`">
    <slot></slot>
  </header>
</template>

<style lang="scss">
.header {
  margin-bottom: 1rem;
  padding: 1em;
  border-radius: 0.5rem;
  .highlight {
    color: inherit;
    background-color: rgba(0, 0, 0, 0.4);
  }
  &.header--without-padding {
    padding: 0;
  }
}
</style>

<script>
export default {
  props: {
    theme: String
  }
};
</script>
