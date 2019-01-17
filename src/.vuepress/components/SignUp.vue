<template>
  <wonder-button :href="href" target="_blank" type="primary">Anmelden</wonder-button>
</template>

<script>
import WonderButton from "./WonderButton.vue";

export default {
  components: { WonderButton },
  props: {
    href: {
      type: String,
      required: true
    }
  }
};
</script>
