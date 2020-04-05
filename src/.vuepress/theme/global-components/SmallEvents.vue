<template>
  <ul class="list-reset small-events">
    <li v-for="event in smallEvents" class="small-events__item">
      <!-- <span class="small-events__emoji">
          {{ event.start | dateEmoji }}
        </span> -->

      <span
        class="small-events__date"
        v-if="event.end"
        style="font-variant-numeric: tabular-nums;"
      >
        {{ event.start | date }} — {{ event.end | date }}
      </span>
      <span
        class="small-events__date"
        v-else
        style="font-variant-numeric: tabular-nums;"
        >{{ event.start | date }}</span
      >
      <br />

      <span class="small-events__title">
        {{ event.title }}
      </span>
    </li>
  </ul>
</template>

<script>
import SmallEvents from "../../../data/small-events.json";
import moment from "moment";
moment.locale("de");

export default {
  data() {
    return {
      smallEvents: SmallEvents
    };
  },
  filters: {
    dateEmoji(date) {
      const m = moment(date);
      const isSameYear = m.isSame(new Date(), "year");
      if (isSameYear) {
        return moment(date).calendar(null, {
          sameDay: "[🎉]",
          nextDay: "[🎒]",
          nextWeek: "[🔜]",
          lastDay: "[😴]",
          lastWeek: "[📆]",
          sameElse: "[📝]"
        });
      }
      return m.format("DD. MMMM YYYY");
    },
    date(date) {
      const m = moment(date);
      const isSameYear = m.isSame(new Date(), "year");
      if (isSameYear) {
        return moment(date).calendar(null, {
          sameDay: "DD. MMMM",
          nextDay: "DD. MMMM",
          nextWeek: "DD. MMMM",
          lastDay: "DD. MMMM",
          lastWeek: "DD. MMMM",
          sameElse: "DD. MMMM"
        });
      }
      return m.format("DD. MMMM YYYY");
    }
  }
};
</script>

<style lang="stylus">
.small-events
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;

.small-events__item
    flex-basis:calc(50% - 0.5rem);
    background-color: #eee;
    margin-bottom: 1rem;
    padding:0.5rem;
    padding-left:1rem;
    padding-right:1rem;
    border-radius:0.5rem;

.small-events__date
    font-weight: bold;
</style>
