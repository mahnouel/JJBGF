<template>
  <div>
    <page-header />
    <article class="text container">
      <header class="header">
        <Content slot-key="head" />
      </header>

      <div class="info">
        <event-location :location="$page.frontmatter.location" />
        <event-date :date="$page.frontmatter.date" />
        <event-signup
          :date="$page.frontmatter.date"
          :signup="$page.frontmatter.signup"
          :is-fully-booked="isFullyBooked"
          :is-canceled="!!this.canceled"
        />
      </div>
      <event-notification :notification="$page.frontmatter.notification" />
      <Content class="text" />

      <div
        v-if="eventState === EVENT_STATE.upcomming"
        :class="{
          'info--signup':
            isRegAvaiable &&
            regState !== REGESTRATION_STATE.availableButDeadlineExpired
        }"
        class="info clickable"
      >
        <p v-if="isRegAvaiable">
          <signup-button :href="signup.link" target="_blank">
            {{ signup.text }}
          </signup-button>
          <small v-if="signup.annotation">{{ signup.annotation }}</small>
          <small
            v-if="regState === REGESTRATION_STATE.availableButDeadlineExpired"
          >
            <strong> Am {{ $page.frontmatter.signup.end | date }} </strong>
            endete die Anmeldefrist.
          </small>
        </p>
        <p
          v-else-if="regState === REGESTRATION_STATE.soonAvailableWithCountdown"
        >
          Anmeldung <strong>{{ timeToRelease }}</strong> ⏰
        </p>
        <p v-else-if="regState === REGESTRATION_STATE.unavailableFullyBooked">
          ℹ️ <strong>Die maximale Teilnehmeranzahl ist erreicht.</strong>
        </p>
        <p v-else-if="regState === REGESTRATION_STATE.unavailableCanceled">
          ℹ️ <strong>{{ canceled.text }}</strong>
        </p>
      </div>

      <div v-else-if="eventState === EVENT_STATE.active" class="info">
        <p>
          Diese Veranstaltung hat begonnen. 👏
          <span v-if="$page.frontmatter.location">
            <br />
            <strong>Anfahrt:</strong> 📍
            <a
              :href="$page.frontmatter.location.link"
              class="location"
              target="_blank"
              >{{ $page.frontmatter.location.name }}</a
            >
          </span>
        </p>
      </div>

      <div v-else-if="eventState === EVENT_STATE.archived" class="info">
        Diese Veranstaltung ist
        <strong>archiviert</strong>. Zur
        <router-link class="button" to="/events/">📅 Übersicht</router-link>
      </div>
    </article>
    <page-footer />
  </div>
</template>

<script>
import moment from "moment";
import Events from "./Events";
import Home from "./Home";
moment.locale("de");

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
  data() {
    return {
      REGESTRATION_STATE,
      EVENT_STATE
    };
  },

  computed: {
    header() {
      return this.$page.frontmatter.header;
    },

    momentStart() {
      return moment(this.$page.frontmatter.date.start);
    },

    momentEnd() {
      if (!this.$page.frontmatter.date.end) return this.momentStart;

      return moment(this.$page.frontmatter.date.end);
    },

    momentDeadline() {
      if (!this.signup?.end) return false;
      return moment(this.signup.end);
    },

    momentReleaseTime() {
      if (!this.signup?.start) return false;
      return moment(this.signup.start);
    },

    isRegAvaiable() {
      return isRegestrationAvailable(this.regState);
    },

    canceled() {
      const canceled = this.$page.frontmatter.canceled;
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

    eventState() {
      if (this.isTodayAfterStart && this.isTodayBeforeEnd)
        return EVENT_STATE.active;
      if (this.isTodayAfterEnd) return EVENT_STATE.archived;
      return EVENT_STATE.upcomming;
    },

    hasDeadline() {
      return !!this.signup.end;
    },

    isTodayAfterEnd() {
      return moment().isAfter(this.momentEnd);
    },

    isTodayAfterStart() {
      return moment().isAfter(this.momentStart);
    },

    isTodayBeforeEnd() {
      return moment().isBefore(this.momentEnd);
    },

    isFullyBooked() {
      return this.signup.fullyBooked || false;
    },

    timeToRelease() {
      if (!this.momentReleaseTime) return false;

      const now = moment();

      if (now.isAfter(this.momentReleaseTime)) return false;

      return now.to(this.momentReleaseTime);
    },

    timeToReleaseFormat() {
      const duration = moment.duration(this.timeToRelease);
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
