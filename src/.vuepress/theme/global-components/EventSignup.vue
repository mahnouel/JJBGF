<template>
  <p v-if="regestrationState === REGESTRATION_STATE.soonAvailableWithCountdown">
    Anmeldung <strong>{{ timeToRelease }}</strong> ⏰
  </p>
  <p v-else-if="regestrationState === REGESTRATION_STATE.availableWithDeadline">
    Bis 📮
    <strong>{{ signup.end | formatDeadline }}</strong>
    <a :href="signup.link" class="signup" target="_blank">Anmelden</a> ✨
  </p>
  <p v-else-if="regestrationState === REGESTRATION_STATE.available">
    Schnell
    <a :href="signup.link" class="signup" target="_blank">Anmelden</a> ✨
  </p>
  <p
    v-else-if="regestrationState === REGESTRATION_STATE.unavailableCanceled"
    class="important-event-notice"
  >
    ℹ️ <strong>Veranstaltung abgesagt</strong>
  </p>
</template>

<script>
import moment from "moment";
moment.locale("de");

import { REGESTRATION_STATE, getRegestrationState } from "../utils";

export default {
  filters: {
    formatDeadline(date) {
      const m = moment(date);
      const isSameYear = m.isSame(new Date(), "year");
      if (isSameYear) {
        return moment(date).calendar(null, {
          sameDay: "[Heute 😱]",
          nextDay: "[Morgen]",
          nextWeek: "dddd",
          lastDay: "[Gestern 😴]",
          lastWeek: "DD. MMMM",
          sameElse: "DD. MMMM"
        });
      }
      return m.format("DD. MMMM YYYY");
    }
  },
  props: {
    signup: {
      type: Object
    },
    date: {
      type: Object
    },
    isCanceled: {
      type: Boolean,
      default: false
    },
    isFullyBooked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      REGESTRATION_STATE
    };
  },
  computed: {
    regestrationState() {
      return getRegestrationState({
        start: moment(this.date.start),
        signupStart: moment(this.signup.start),
        signupEnd: moment(this.signup.end),
        isFullyBooked: this.isFullyBooked,
        isCanceled: this.isCanceled
      });
    },

    momentReleaseTime() {
      if (!this.signup?.start) return false;
      return moment(this.signup.start);
    },

    timeToRelease() {
      if (!this.momentReleaseTime) return false;

      const now = moment();

      if (now.isAfter(this.momentReleaseTime)) return false;

      return now.to(this.momentReleaseTime);
    }
  }
};
</script>
