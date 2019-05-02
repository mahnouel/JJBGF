<template>
  <a class="button button--signup" :href="href" :target="target" v-if="href">
    <slot></slot>
  </a>
  <router-link class="signup-button" :to="to" v-else-if="to">
    <slot></slot>
  </router-link>
</template>

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
