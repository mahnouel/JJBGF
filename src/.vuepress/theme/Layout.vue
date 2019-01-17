<template>
  <div>
    <page-header/>
    <article class="mb-2 text">
      <wonder-header :theme="$page.frontmatter.theme">
        <Content slot-key="head"/>
        <wonder-time :date="$page.frontmatter.date" v-if="header && header.date"/>
        <wonder-link
          :href="header.location.link"
          v-if="header && header.location"
        >{{header.location.name}}</wonder-link>
      </wonder-header>
      <Content class="text"/>
      <wonder-button
        :href="signup.link"
        type="primary"
        target="_blank"
        v-if="signup"
      >{{signup.text}}</wonder-button>
    </article>
    <page-footer/>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("de");

export default {
  computed: {
    header() {
      return this.$page.frontmatter.header;
    },
    signup() {
      const signup = this.$page.frontmatter.signup;

      if (signup) {
        if (signup.autohide) {
          const deadline = signup.deadline || this.$page.frontmatter.date;
          if (moment().isAfter(deadline)) {
            return false;
          }
        }

        return {
          text: "Anmelden",
          link:
            "//cloud.johannische-kirche.org/index.php/s/NjIqFZcWUL2EMF2?path=%2FAnmeldungen#pdfviewer",
          ...signup
        };
      }
    }
  }
};
</script>

<style src="./styles/theme.styl" lang="stylus"></style>