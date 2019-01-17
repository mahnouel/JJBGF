<template>
  <span class="highlight">{{ date | time}}</span>
</template>
<script>
import moment from "moment";
moment.locale("de");
export default {
  props: {
    date: {
      type: String,
      required: true
    }
  },
  filters: {
    time: function(date) {
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