<template>
  <article class="teaser-kitawo" :class="highlight ? 'teaser-kitawo--is-highlight' : ''">
    <!-- :class="`${isATM ? 'teaser-kitawo--is-atm' : ''} ${isHistory ? 'teaser-kitawo--is-history' : ''}`" -->
    <header class="teaser-kitawo__header">
      <p class="teaser-kitawo__info">
        <span
          class="teaser-kitawo__location"
          :class="`teaser-kitawo__location--is-${location}`"
        >{{location}}</span>
        <span class="teaser-kitawo__date" v-if="startDate">
          {{startDate | asDate}}
          <span v-if="endDate > 0">bis {{endDate | asDate}}</span>
        </span>
        <span class="teaser-kitawo__place" v-if="place">📍 {{place}}</span>
      </p>
      <h4 class="teaser-kitawo__heading">{{name}}</h4>
    </header>
  </article>
</template>

<script>
import moment from "moment";
moment.locale("de");

const EVENTSTATUS = {
  FUTURE: "future",
  NOW: "now",
  PAST: "past",
  DEAD: "dead",
  ALMOSTDEAD: "almostdead"
};
export default {
  props: [
    "startDate",
    "endDate",
    "place",
    "highlight",
    "name",
    "category",
    "location"
  ],
  computed: {
    // deadline() {
    //   const signup = this.page.frontmatter.signup;
    //   if (!signup) return this.page.frontmatter.date;
    //   if (!signup.deadline) return this.page.frontmatter.date;
    //   return signup.deadline;
    // },
    // isDeadlineOver() {
    //   return moment().isAfter(this.deadline, "day");
    // },
    // isDeadlineSoonOver() {
    //   const difference = moment().diff(this.deadline, "days");
    //   return difference >= -2 && difference <= 1;
    // },
    // isATM() {
    //   if (!this.page.frontmatter.date_end) return false;
    //   const afterStart = moment().isAfter(this.page.frontmatter.date);
    //   const beforeEnd = moment().isBefore(this.page.frontmatter.date_end);
    //   return afterStart && beforeEnd;
    // },
    // isHistory() {
    //   if (this.page.frontmatter.date_end) {
    //     return moment().isAfter(this.page.frontmatter.date_end);
    //   }
    //   return moment().isAfter(this.page.frontmatter.date);
    // },
    // status() {
    //   const m = moment();
    //   const dateStart = this.page.frontmatter.date;
    //   const dateEnd = this.page.frontmatter.date_end || dateStart;
    //   if (m.isAfter(dateEnd)) return EVENTSTATUS.PAST;
    //   if (m.isAfter(dateStart) && m.isBefore(dateEnd)) return EVENTSTATUS.NOW;
    //   const signup = this.page.frontmatter.signup;
    //   const deadline = !signup ? signup.deadline || dateStart : dateStart;
    //   if (m.isAfter(deadline)) return EVENTSTATUS.DEAD;
    //   const diff = moment().diff(deadline, "days");
    //   if (diff >= -2 && diff <= 1) return EVENTSTATUS.ALMOSTDEAD;
    //   return EVENTSTATUS.FUTURE;
    // }
  },
  filters: {
    asDate(date) {
      const m = moment.unix(date);
      console.log(date);
      return m.format("HH:mm") + " Uhr";
    },
    deadline(date) {
      return moment(date).calendar(null, {
        sameDay: "[Heute]",
        nextDay: "[Morgen]",
        nextWeek: "dddd",
        lastDay: "[Gestern]",
        lastWeek: "[Letzte Woche,] dddd",
        sameElse: "DD.MM.YYYY"
      });
    }
  }
};
</script>
