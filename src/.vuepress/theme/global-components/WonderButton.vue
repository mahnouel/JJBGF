<template>
  <a :class="`button ${type ? `button--${type}` : ''}`" :href="href" :target="target" v-if="href">
    <slot></slot>
  </a>
  <router-link :class="`button ${type ? `button--${type}` : ''}`" :to="to" v-else-if="to">
    <slot></slot>
  </router-link>
</template>

<style lang="scss">
.button.button--small {
  border: 0.2em solid #ccc;
  background-color: #ccc;
  color: #000;
  padding: 0.15em 0.5em;
}
.button.router-link-exact-active {
  border-color: #aaa;
}

.button {
  --button-background: #39cccc;
  --button-color: #fff;
  --button-background: #ddd;
  --button-color: #000;
  border: 0.2em solid #ddd;
  margin-right: 0.2em;
  margin-bottom: 0.5rem;
  display: inline-block;
  background-color: var(--button-background);
  padding: 0.3em;
  color: var(--button-color);
  border-radius: 0.5em;
  font-weight: bold;
  text-decoration: none;
}

.button:hover {
  opacity: 0.5;
}

.button.button--primary {
  transition: box-shadow 0.5s, color 0.5s, background-color 0.5s,
    border-color 0.5s;

  margin-right: 0.5rem;
  color: black;
  background-color: #ffdc00;
  box-shadow: 3px 3px 0px #ff851b, 6px 6px 0px #ff4136;
  border-color: #ffdc00;
  &:hover {
    border-color: #111;
    background-color: #111;
    color: white;
    box-shadow: none;
    opacity: 1;
  }
}
</style>

<script>
export default {
  props: {
    to: { type: String },
    href: {
      type: String
    },
    target: {
      type: String,
      default: "_self"
    },
    type: {
      type: String,
      validator: value => {
        return ["primary", "small"].indexOf(value) !== -1;
      }
    }
  }
};
</script>
