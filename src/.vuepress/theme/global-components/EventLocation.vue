<template>
  <p v-if="location" title="Wo?">
    📍
    <a
      v-if="location.link"
      :href="location.link"
      class="location"
      target="_blank"
    >
      {{ location.name }}
    </a>
    <span v-else class="location">
      {{ location.name }}
    </span>
  </p>
</template>

<script>
export default {
  props: {
    location: {
      type: Object,
    },
  },
};
</script>
