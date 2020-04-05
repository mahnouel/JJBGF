<template>
  <p v-if="date.postponed" class="important-event-notice">
    <span>
      ℹ️ Veranstaltung <strong>wird verschoben</strong>. Weitere Informationen
      folgen.
    </span>
  </p>
  <div v-else-if="date.start">
    <p title="Wann?">
      📅
      <strong> {{ date.start | formatDate }} </strong>
      <strong v-if="date.end"> — {{ date.end | formatDate }} </strong>
    </p>
    <p v-if="date.previousDate" class="important-event-notice">
      <span>ℹ️ Veranstaltung hat <strong>neues Datum</strong></span>
    </p>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("de");

export default {
  filters: {
    formatDate(date) {
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
    }
  },
  props: {
    date: {
      type: Object
    }
  }
};
</script>
