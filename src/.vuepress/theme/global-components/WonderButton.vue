<template>
  <a :class="`button ${type ? `button--${type}` : ''}`" :href="href" :target="target" v-if="href">
    <slot></slot>
  </a>
  <router-link :class="`button ${type ? `button--${type}` : ''}`" :to="to" v-else-if="to">
    <slot></slot>
  </router-link>
</template>

<style lang="scss">

</style>

<script>
export default {
  props: {
    to: { type: String },
    href: {
      type: String
    },
    target: {
      type: String,
      default: "_self"
    },
    type: {
      type: String,
      validator: value => {
        return ["primary", "small"].indexOf(value) !== -1;
      }
    }
  }
};
</script>
