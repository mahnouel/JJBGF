<template>
  <figure class="quote">
    <blockquote>
      <slot></slot>
    </blockquote>
    <figcaption v-if="author">— {{ author }}</figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    author: String
  }
};
</script>



