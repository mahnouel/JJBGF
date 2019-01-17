<template>
  <div>
    <page-header/>
    <article class="mb-3 text">
      <wonder-header theme="header--without-padding">
        <h1>404</h1>
      </wonder-header>
      <p class="center">
        <img
          src="./404.gif"
          class="mb-1"
          alt="Meme welches den verschwindenen Homer Simpson zeigt."
        >
        <br>Zurück zur
        <wonder-button to="/">ersten Seite</wonder-button>
      </p>
    </article>
    <page-footer/>
    <!-- <pre>
      {{$site}}
    </pre>
    <pre>
      {{$site.pages}}
    </pre>-->
  </div>
</template>

<style src="./styles/theme.styl" lang="stylus"></style>
