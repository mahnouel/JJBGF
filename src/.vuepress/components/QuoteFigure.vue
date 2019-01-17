<template>
  <figure class="quote">
    <blockquote>
      <slot></slot>
    </blockquote>
    <figcaption v-if="author">— {{ author }}</figcaption>
  </figure>
</template>

<style lang="scss">
.quote {
  font-size: 1.5em;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;

  blockquote p {
    display: inline;
  }
  blockquote {
    display: inline;
    margin: 0;
  }
  blockquote::before {
    content: "„";
  }
  blockquote::after {
    content: "“";
    // margin-left: -0.5ch;
    // margin-right: 0.5ch;
  }

  figcaption {
    display: inline;
    font-size: smaller;
  }
}
</style>

<script>
export default {
  props: {
    author: String
  }
};
</script>



