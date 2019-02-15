<template>
  <footer class="footer" v-if="this.$route.name !== 'links'">
    <section class="linkblock text">
      <p>
        <wonder-button
          :to="page.path"
          v-for="page in $site.pages"
          v-if="page.path.indexOf('zeltlager') >= 0"
          :key="page.key"
          type="small"
          class="block"
        >{{page.frontmatter.navtitle}}</wonder-button>
      </p>
      <h4>Seminare</h4>
      <p>
        <wonder-button
          :to="page.path"
          v-for="page in $site.pages"
          v-if="page.path.indexOf('seminar') >= 0"
          :key="page.key"
          type="small"
          class="block"
        >{{page.frontmatter.navtitle}}</wonder-button>
      </p>
    </section>
    <section class="linkblock text">
      <h4>Kalender</h4>
      <p>
        <wonder-link
          href="//calendar.google.com/calendar/embed?src=jugend%40johannische-kirche.org&ctz=Europe%2FBerlins"
        >Jugend</wonder-link>
        <br>
        <wonder-link
          href="//calendar.google.com/calendar/embed?src=c009ps9dpfhds19bjapr6lvte0%40group.calendar.google.com&ctz=Europe%2FBerlin"
        >Chor</wonder-link>
        <br>
        <wonder-link
          href="//calendar.google.com/calendar/embed?src=41cva8imqg9f443kn41dul8onc%40group.calendar.google.com&ctz=Europe%2FBerlin"
        >SMH</wonder-link>
      </p>
    </section>
    <section class="linkblock text">
      <h4>Mehr</h4>
      <p>
        <wonder-button to="/impressum/" type="small">Impressum</wonder-button>
        <br>
        <wonder-link
          href="//cloud.johannische-kirche.org/index.php/s/NjIqFZcWUL2EMF2?path=%2FAnmeldungen#"
        >Anmeldungen</wonder-link>
        <br>🆕
        <wonder-link href="//www.instagram.com/jjbgf.de">Instagram</wonder-link>
        <br>
        <wonder-link href="//www.facebook.com/jjbgf">Facebook</wonder-link>
      </p>
    </section>
  </footer>
</template>

<style lang="stylus">
.linkblock {
  display: inline-block;
  vertical-align: top;

  &:not(:last-child) {
    margin-right: 2rem;
  }
}

.footer {
  padding-top: 1rem;
  border-top: 0.2rem solid;
}
</style>


