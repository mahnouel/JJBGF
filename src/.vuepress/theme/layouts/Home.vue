<template>
  <div>
    <page-header/>
    <article class="mb-2 text">
      <router-link
        :to="page.path"
        :key="page.key"
        v-for="page in $site.pages"
        v-if="page.frontmatter.featured"
        class="excerpt"
      >
        <article class="text">
          <h2>{{page.frontmatter.title}}</h2>
          <p>{{page.frontmatter.excerpt}}</p>
          <wonder-time class="excerpt__time" :date="page.frontmatter.date"/>
        </article>
      </router-link>
      <Content class="text"/>
    </article>
    <page-footer/>
  </div>
</template>
<style lang="stylus">
.excerpt {
  background-color: #ddd;
  padding: 1rem;
  border-radius: 0.5rem;
  display: block;
  margin-bottom: 2rem;
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: lighten(#ddd, 50%);

    .excerpt__time {
      background-color: lighten(#eee, 50%);
    }
  }

  h2 {
    margin-top: 0;
  }

  .excerpt__time {
    background-color: #eee;
    color: #000;
    font-size: 1rem;
  }

  .excerpt__more {
    display: inline-block;
    float: right;
  }
}
</style>

