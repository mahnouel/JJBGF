<template>
  <p v-if="location" title="Wo?">
    📍
    <a :href="location.link" class="location" target="_blank">
      {{ location.name }}
    </a>
  </p>
</template>

<script>
export default {
  props: {
    location: {
      type: Object
    }
  }
};
</script>
