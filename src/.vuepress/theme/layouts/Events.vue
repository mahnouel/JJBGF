<template>
  <div>
    <page-header />
    <article class="text padding">
      <Content class="text" />
      <section v-for="year in eventYears">
        <header>
          <h2>{{year}}</h2>
        </header>
        <div class="teaser-container">
          <teaser-event v-for="page in eventsForYear(year)" :key="page.key" :page="page" />
        </div>
      </section>
    </article>
    <page-footer />
  </div>
</template>
<script>
import { ByDate, EventPages, OnlyYear } from "../utils";

import moment from "moment";
moment.locale("de");

export default {
  computed: {
    eventYears() {
      const uniqueYears = EventPages(this.$site)
        .sort(ByDate("DESC"))
        .reduce((acc, page) => {
          const year = moment(page.frontmatter.date).format("YYYY");
          if (acc.indexOf(year) < 0) acc.push(year);
          return acc;
        }, []);

      return uniqueYears;
    },
    events() {
      return EventPages(this.$site).sort(ByDate("DESC"));
    }
  },
  methods: {
    eventsForYear(year) {
      return EventPages(this.$site)
        .sort(ByDate("DESC"))
        .filter(OnlyYear(year));
    }
  }
};
</script>
