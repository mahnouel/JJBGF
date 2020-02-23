<template>
  <div>
    <page-header />

    <article class="text container">
      <Content class="text" />
    </article>

    <section class="container">
      <teaser-event v-for="page in events" :key="page.key" :page="page" />
    </section>
    <page-footer />
  </div>
</template>

<script>
import { ByDate, ByPriority, EventPages } from "../utils";

export default {
  computed: {
    events() {
      return EventPages(this.$site)
        .filter(page => page.frontmatter.featured)
        .sort(ByDate("ASC"))
        .sort(ByPriority("DESC"));
    }
  }
};
</script>
