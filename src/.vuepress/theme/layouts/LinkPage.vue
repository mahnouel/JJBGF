<template>
  <div>
    <page-header />
    <article class="text container">
      <header class="header">
        <h2>🔗 Weiterleitung</h2>
      </header>

      <p>
        Diese Seite leitet automatisch auf
        <strong>"{{ title }}"</strong> weiter. <br />
      </p>
      <p>
        Falls dies nicht passiert,
        <a :href="link" class="link link--is-external">hier&nbsp;klicken</a>
      </p>
    </article>
    <page-footer />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    title() {
      return this.$page.frontmatter.title;
    },
    link() {
      return this.$page.frontmatter.link;
    }
  },
  mounted() {
    setTimeout(() => {
      window.location.href = this.link;
    }, 1500);
  }
};
</script>
