  <template>
  <header class="page-header width">
    <img class="page-header__logo" :src="$withBase('/jjbgf.svg')" alt="JJBGF">

    <nav class="page-header__nav">
      <router-link to="/" class="button">🏡 JJBGF</router-link>
      <router-link to="/events/" class="button">📅 Events</router-link>
    </nav>
  </header>
</template>

