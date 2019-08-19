<template>
  <span class="room-status" :class="isOpen && 'room-status--is-open'">
    {{name}}
    <span v-if="isOpen">ist geöffnet! 🥳</span>
    <span v-else>😴</span>
  </span>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    isOpen: {
      type: Boolean,
      required: true
    }
  }
};
</script>
