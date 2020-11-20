<template>
  <v-col class="pa-2 rounded-lg primary text-width-subtitle-2 white--text text-left col-md-8 col-8">
    <p class="mx-auto my-auto">{{ text }}</p>
  </v-col>
</template>

<script>
export default {
  props: ["text"],
};
</script>
<style scoped></style>
