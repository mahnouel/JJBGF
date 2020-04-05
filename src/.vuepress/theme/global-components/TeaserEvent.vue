<template>
  <article
    :class="{
      'teaser-event--is-atm': eventState === EVENT_STATE.active,
      'teaser-event--is-history': eventState === EVENT_STATE.archived
    }"
    class="teaser-event clickable"
  >
    <div class="teaser-event__info">
      <p
        v-if="page.frontmatter.date.postponed"
        class="teaser-event__notification"
      >
        <strong>Verschoben</strong>
      </p>
      <p v-else>
        <span v-if="page.frontmatter.date.start" class="teaser-event__date">
          <span v-if="page.frontmatter.date.previousDate">
            🆕
          </span>
          {{ page.frontmatter.date.start | date }}
        </span>
      </p>

      <p
        v-if="
          page.frontmatter.notification && page.frontmatter.notification.summary
        "
        class="teaser-event__notification"
        v-html="page.frontmatter.notification.summary"
      />
      <p
        v-if="regState === REGESTRATION_STATE.unavailableCanceled"
        class="teaser-event__notification"
      >
        <strong>Veranstaltung abgesagt</strong>
      </p>
    </div>
    <div class="teaser-event__card text">
      <h3 class="teaser__heading" v-html="title" />
      <p>{{ page.frontmatter.excerpt }}</p>

      <div class="teaser-event__button-container">
        <router-link :to="page.path" class="teaser-event__button">
          Mehr
        </router-link>
      </div>
    </div>
    <footer
      v-if="page.frontmatter.signup.end && !isHistory"
      class="teaser-event__info"
    >
      <p>
        Anmeldeschluss 📮
        <span
          :class="isDeadlineSoonOver ? 'teaser-event__deadline--is-soon' : ''"
          class="teaser-event__deadline"
          >{{ page.frontmatter.signup.end | date }}</span
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

import {
  REGESTRATION_STATE,
  EVENT_STATE,
  isRegestrationAvailable,
  getRegestrationState
} from "../utils";

export default {
  filters: {
    date(date) {
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
  },
  props: ["page"],
  data() {
    return {
      REGESTRATION_STATE,
      EVENT_STATE
    };
  },
  computed: {
    title() {
      return this.page.frontmatter.displayTitle || this.page.frontmatter.title;
    },

    momentStart() {
      return moment(this.page.frontmatter.date.start);
    },

    momentEnd() {
      if (!this.page.frontmatter.date.end) return this.momentStart;

      return moment(this.page.frontmatter.date.end);
    },

    momentDeadline() {
      if (!this.signup?.end) return false;
      return moment(this.signup.end);
    },

    momentReleaseTime() {
      if (!this.signup?.start) return false;
      return moment(this.signup.start);
    },

    isFullyBooked() {
      return this.signup.fullyBooked || false;
    },

    eventState() {
      const today = moment();

      if (today.isAfter(this.momentStart) && today.isBefore(this.momentEnd)) {
        return EVENT_STATE.active;
      }

      if (today.isAfter(this.momentEnd)) return EVENT_STATE.archived;

      return EVENT_STATE.upcomming;
    },

    canceled() {
      const canceled = this.page.frontmatter.canceled;
      if (canceled) {
        return {
          text:
            "Diese Veranstaltung wurde abgesagt. Für weitere Informationen wendet euch an einen Jugendleiter.",
          ...canceled
        };
      } else {
        return false;
      }
    },

    regState() {
      return getRegestrationState({
        start: this.momentStart,
        signupStart: this.momentReleaseTime,
        signupEnd: this.momentDeadline,
        isFullyBooked: this.isFullyBooked,
        isCanceled: !!this.canceled
      });
    },

    deadline() {
      const signup = this.page.frontmatter.signup;
      if (!signup) return this.page.frontmatter.date.start;
      if (!signup.end) return this.page.frontmatter.date.start;
      return signup.end;
    },
    isDeadlineOver() {
      return moment().isAfter(this.deadline, "day");
    },
    isDeadlineSoonOver() {
      const difference = moment().diff(this.deadline, "days");
      return difference >= -2 && difference <= 1;
    },
    isATM() {
      if (!this.page.frontmatter.date.end) return false;

      const afterStart = moment().isAfter(this.page.frontmatter.date.start);
      const beforeEnd = moment().isBefore(this.page.frontmatter.date.end);
      return afterStart && beforeEnd;
    },

    isHistory() {
      if (this.page.frontmatter.date.end) {
        return moment().isAfter(this.page.frontmatter.date.end);
      }
      return moment().isAfter(this.page.frontmatter.date.start);
    },

    status() {
      const m = moment();

      const dateStart = this.page.frontmatter.date.start;
      const dateEnd = this.page.frontmatter.date.end || dateStart;
      if (m.isAfter(dateEnd)) return EVENTSTATUS.PAST;
      if (m.isAfter(dateStart) && m.isBefore(dateEnd)) return EVENTSTATUS.NOW;

      const signup = this.page.frontmatter.signup;
      const deadline = !signup ? signup.end || dateStart : dateStart;
      if (m.isAfter(deadline)) return EVENTSTATUS.DEAD;

      const diff = moment().diff(deadline, "days");
      if (diff >= -2 && diff <= 1) return EVENTSTATUS.ALMOSTDEAD;

      return EVENTSTATUS.FUTURE;
    },
    signup() {
      const signup = this.$page.frontmatter.signup;

      if (signup) {
        return {
          text: "Anmelden",
          link:
            "//cloud.johannische-kirche.org/index.php/s/NjIqFZcWUL2EMF2?path=%2FAnmeldungen#pdfviewer",
          ...signup
        };
      } else {
        return false;
      }
    }
  }
};
</script>
