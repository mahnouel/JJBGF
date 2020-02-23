<template>
  <article
    class="teaser-event clickable"
    :class="
      `${isATM ? 'teaser-event--is-atm' : ''} ${
        isHistory ? 'teaser-event--is-history' : ''
      }`
    "
  >
    <div class="teaser-event__info">
      <p>
        <span class="teaser-event__date" v-if="page.frontmatter.date">{{
          page.frontmatter.date | date
        }}</span>
      </p>
    </div>
    <div class="teaser-event__card text">
      <h2 v-html="page.frontmatter.title"></h2>
      <p>{{ page.frontmatter.excerpt }}</p>
      <div class="teaser-event__button-container">
        <router-link :to="page.path" class="teaser-event__button"
          >Mehr</router-link
        >
      </div>
    </div>
    <footer
      class="teaser-event__info"
      v-if="page.frontmatter.signup.deadline && !isHistory"
    >
      <p>
        Anmeldeschluss 📮
        <span
          class="teaser-event__deadline"
          :class="isDeadlineSoonOver ? 'teaser-event__deadline--is-soon' : ''"
          >{{ page.frontmatter.signup.deadline | date }}</span
        >
      </p>
    </footer>
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
  props: ["page"],
  computed: {
    deadline() {
      const signup = this.page.frontmatter.signup;
      if (!signup) return this.page.frontmatter.date;
      if (!signup.deadline) return this.page.frontmatter.date;
      return signup.deadline;
    },
    isDeadlineOver() {
      return moment().isAfter(this.deadline, "day");
    },
    isDeadlineSoonOver() {
      const difference = moment().diff(this.deadline, "days");
      return difference >= -2 && difference <= 1;
    },
    isATM() {
      if (!this.page.frontmatter.date_end) return false;

      const afterStart = moment().isAfter(this.page.frontmatter.date);
      const beforeEnd = moment().isBefore(this.page.frontmatter.date_end);
      return afterStart && beforeEnd;
    },

    isHistory() {
      if (this.page.frontmatter.date_end) {
        return moment().isAfter(this.page.frontmatter.date_end);
      }
      return moment().isAfter(this.page.frontmatter.date);
    },

    status() {
      const m = moment();

      const dateStart = this.page.frontmatter.date;
      const dateEnd = this.page.frontmatter.date_end || dateStart;
      if (m.isAfter(dateEnd)) return EVENTSTATUS.PAST;
      if (m.isAfter(dateStart) && m.isBefore(dateEnd)) return EVENTSTATUS.NOW;

      const signup = this.page.frontmatter.signup;
      const deadline = !signup ? signup.deadline || dateStart : dateStart;
      if (m.isAfter(deadline)) return EVENTSTATUS.DEAD;

      const diff = moment().diff(deadline, "days");
      if (diff >= -2 && diff <= 1) return EVENTSTATUS.ALMOSTDEAD;

      return EVENTSTATUS.FUTURE;
    }
  },
  filters: {
    date: function(date) {
      const m = moment(date);
      const isSameYear = m.isSame(new Date(), "year");
      if (isSameYear) {
        return moment(date).calendar(null, {
          sameDay: "[Heute]",
          nextDay: "[Morgen]",
          nextWeek: "DD. MMMM",
          lastDay: "DD. MMMM",
          lastWeek: "DD. MMMM",
          sameElse: "DD. MMMM"
        });
      }
      return m.format("DD. MMMM YYYY");
    },
    deadline: function(date) {
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
