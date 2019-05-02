<template>
  <div>
    <page-header/>
    <article class="text width">
      <Content class="text"/>
      <event-teaser v-for="page in events" :key="page.key" :page="page"/>
    </article>
    <page-footer/>
  </div>
</template>

<script>
import { ByDate, EventPages } from "../utils";

export default {
  computed: {
    events() {
      return EventPages(this.$site)
        .filter(page => page.frontmatter.featured)
        .sort(ByDate("ASC"));
    }
  }
};
</script>



