<template>
  <footer class="page-footer">
    <div class="page-footer__content container">
      <section class="page-footer__column text">
        <h4>Highlights</h4>
        <p>
          <router-link
            :to="page.path"
            v-for="page in events"
            :key="page.key"
            class="button"
            v-html="page.frontmatter.navtitle"
          ></router-link>
          <router-link to="/events/" class="button">📅 Events</router-link>
        </p>
      </section>
      <section class="page-footer__column text">
        <h4>Kalender</h4>
        <p>
          <a
            target="_blank"
            href="//calendar.google.com/calendar/embed?src=jugend%40johannische-kirche.org&ctz=Europe%2FBerlins"
            >Jugend</a
          >
          <br />
          <a
            target="_blank"
            href="//calendar.google.com/calendar/embed?src=41cva8imqg9f443kn41dul8onc%40group.calendar.google.com&ctz=Europe%2FBerlin"
            >SMH</a
          >
          <br />
          <a
            target="_blank"
            href="//calendar.google.com/calendar/embed?src=90k02p9ir853ts5ks5hanilpfg%40group.calendar.google.com&ctz=Europe%2FBerlin"
            >Velten</a
          >
          <br />
          <a
            target="_blank"
            href="//calendar.google.com/calendar/embed?src=2ma7gn9d8sa5j6ekin4pkhnm4k%40group.calendar.google.com&ctz=Europe%2FBerlin"
            >Urgemeinde</a
          >
          <br />
          <a
            target="_blank"
            href="//calendar.google.com/calendar/embed?src=c009ps9dpfhds19bjapr6lvte0%40group.calendar.google.com&ctz=Europe%2FBerlin"
            >Chor</a
          >
        </p>
      </section>
      <section class="page-footer__column text">
        <h4>Mehr</h4>
        <p>
          <router-link to="/impressum/" class="button">Impressum</router-link>
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

export default {
  computed: {
    events() {
      return EventPages(this.$site)
        .filter(page => page.frontmatter.featured)
        .sort(ByDate("DESC"));
    }
  }
};
</script>
