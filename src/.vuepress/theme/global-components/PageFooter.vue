<template>
  <footer class="page-footer">
    <div class="page-footer__content container">
      <section class="page-footer__column text">
        <h4>Highlights</h4>
        <p>
          <router-link
            v-for="page in events"
            :to="page.path"
            :key="page.key"
            class="button"
            v-html="page.frontmatter.navtitle"
          ></router-link>
          <router-link to="/events/" class="button">📅 Events</router-link>
        </p>
      </section>
      <section class="page-footer__column text">
        <h4>Kalender</h4>
        <ul class="list-reset">
          <li v-for="calendar in calendarList">
            <a :href="calendar.url" target="_blank">
              {{ calendar.title }}
            </a>
          </li>
        </ul>
      </section>
      <section class="page-footer__column text">
        <h4>Mehr</h4>
        <p>
          <router-link to="/impressum/" class="button">Impressum</router-link>
          <a target="_blank" href="//t.me/joinchat/AAAAAE92NHpopjNHyCbXcA">
            🆕 Telegram</a
          >
          <a
            target="_blank"
            href="//cloud.johannische-kirche.org/index.php/s/NjIqFZcWUL2EMF2?path=%2FAnmeldungen#"
            >Anmeldungen</a
          >
          <a target="_blank" href="//www.instagram.com/jjbgf.de">Instagram</a>
          <a target="_blank" href="//www.facebook.com/jjbgf">Facebook</a>
        </p>
      </section>
    </div>
  </footer>
</template>

<script>
import { ByDate, EventPages } from "../utils";
import CalendarList from "../../../data/calendar-list.json";

export default {
  data() {
    return {
      calendarList: CalendarList
    };
  },
  computed: {
    events() {
      return EventPages(this.$site)
        .filter(page => page.frontmatter.featured)
        .sort(ByDate("DESC"));
    }
  }
};
</script>
