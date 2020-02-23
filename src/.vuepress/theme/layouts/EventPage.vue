<template>
  <div>
    <page-header />
    <article class="text container">
      <header class="header">
        <Content slot-key="head" />
      </header>
      <div class="info">
        <p v-if="$page.frontmatter.location" title="Wo?">
          📍
          <a
            class="location"
            target="_blank"
            :href="$page.frontmatter.location.link"
            >{{ $page.frontmatter.location.name }}</a
          >
        </p>
        <p v-if="$page.frontmatter.date" title="Wann?">
          📅
          <strong>{{ $page.frontmatter.date | date }}</strong>
          <span v-if="$page.frontmatter.date_end">
            —
            <strong>{{ $page.frontmatter.date_end | date }}</strong>
          </span>
        </p>

        <p v-if="timeToRelease">
          Anmeldung <strong>{{ timeToRelease }}</strong> ⏰
        </p>
        <p
          v-else-if="
            $page.frontmatter.signup.deadline && !isHistory && !isDeadlineOver
          "
        >
          Bis 📮
          <strong>{{ $page.frontmatter.signup.deadline | deadline }}</strong>
          <a class="signup" :href="signup.link" target="_blank">Anmelden</a> ✨
        </p>
        <p v-else-if="!isHistory && !isDeadlineOver">
          Schnell
          <a class="signup" :href="signup.link" target="_blank">Anmelden</a> ✨
        </p>
      </div>

      <Content class="text" />

      <div class="info" v-if="timeToRelease">
        <p>
          Anmeldung <strong>{{ timeToRelease }}</strong> ⏰
        </p>
      </div>
      <div
        v-else-if="signup && !isHistory && !isATM"
        class="info clickable"
        :class="isDeadlineOver ? '' : 'info--signup'"
      >
        <signup-button :href="signup.link" target="_blank">{{
          signup.text
        }}</signup-button>
        <small v-if="signup.annotation">{{ signup.annotation }}</small>
        <small v-else-if="isDeadlineOver">
          <strong>Am {{ $page.frontmatter.signup.deadline | date }}</strong>
          endete die Anmeldefrist.
        </small>
      </div>

      <div class="info" v-else-if="isATM">
        <p>
          Diese Veranstaltung hat begonnen. 👏
          <span v-if="$page.frontmatter.location">
            <br />
            <strong>Anfahrt:</strong> 📍
            <a
              class="location"
              target="_blank"
              :href="$page.frontmatter.location.link"
              >{{ $page.frontmatter.location.name }}</a
            >
          </span>
        </p>
      </div>

      <div class="info" v-else-if="isHistory">
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

export default {
  computed: {
    header() {
      return this.$page.frontmatter.header;
    },

    isDeadlineOver() {
      const signup = this.$page.frontmatter.signup;
      const deadline = signup.deadline || this.$page.frontmatter.date;
      return moment().isAfter(deadline, "day");
    },

    isATM() {
      if (this.$page.frontmatter.date_end) {
        const startDayAfterToday = moment().isAfter(
          this.$page.frontmatter.date
        );
        const endDayBeforeToday = moment().isBefore(
          this.$page.frontmatter.date_end
        );
        return startDayAfterToday && endDayBeforeToday;
      }
    },

    isHistory() {
      return moment().isAfter(this.$page.frontmatter.date);
    },

    timeToRelease() {
      if (!this.$page.frontmatter.signup) return -1;
      const releaseTime = moment(this.$page.frontmatter.signup.releasetime);
      const now = moment();

      if (now.isAfter(releaseTime)) return false;

      return now.to(releaseTime);
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
  }
};
</script>
