<template>
  <div>
    <page-header />
    <article class="text container">
      <header class="header">
        <Content slot-key="head" />
      </header>

      <Content class="text" />
    </article>
    <page-footer />
  </div>
</template>
