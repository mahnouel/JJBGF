<template>
  <a class="link" :href="href" :target="target">
    <slot></slot>
  </a>
</template>
<style lang="scss">
.link {
  font-weight: normal;
  text-decoration: none;
  text-decoration: underline;
  color: inherit;
  &::after {
    content: "->";
  }
  &:hover {
    text-decoration: none;
  }
}
a[target="_blank"]:not(.button) {
  font-weight: normal;
  text-decoration: none;
  text-decoration: underline;
  color: inherit;
  display: inline;

  .outbound {
    display: none;
  }

  &::after {
    content: "->";
  }

  &:hover {
    text-decoration: none;
  }
}
</style>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true
    },
    target: {
      type: String,
      default: "_blank"
    }
  }
};
</script>
