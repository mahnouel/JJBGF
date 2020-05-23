<template>
  <p
    v-if="notification && notification.summary"
    class="event-notification"
    v-html="notification.summary"
  />
</template>

<script>
export default {
  props: {
    notification: {
      type: Object
    }
  }
};
</script>
