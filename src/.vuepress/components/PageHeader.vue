  <template>
  <header class="page-header">
    <span class="page-header__title">JJBGF</span>
    <nav class="page-header__nav">
      <router-link
        :to="page.path"
        v-for="page in $site.pages"
        v-if="page.frontmatter.featured"
        :key="page.key"
        class="button"
      >{{page.frontmatter.navtitle}}</router-link>
    </nav>
  </header>
</template>

<style lang="stylus">
.page-header {
  padding-top: 1rem;
}

.page-header__nav {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 0.2rem solid;
}

.page-header__title {
  float: right;
  color: #111;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 0;
  border-radius: 0.5em;
}
</style>
