<template>
  <div>
    <page-header/>
    <article class="mb-2 text">
      <article
        class="excerpt text"
        v-for="page in $site.pages"
        v-if="page.frontmatter.featured"
        :key="page.key"
      >
        <h2>
          {{page.frontmatter.title}}
          <wonder-time class="excerpt__time" :date="page.frontmatter.date"/>
        </h2>
        <p>{{page.frontmatter.excerpt}}</p>
        <router-link :to="page.path" :key="page.key" class="button button--small">Weiterlesen</router-link>
      </article>
      <Content class="text"/>
    </article>
    <page-footer/>
  </div>
</template>
<style lang="stylus">
.excerpt {
  margin-bottom: 2rem;

  h2 {
    margin-top: 0;
  }

  .excerpt__time {
    background-color: #eee;
    color: #000;
    font-size: 1rem;
    float: right;
  }
}
</style>

