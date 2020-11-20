<template>
  <v-row class="mx-md-4 justify-left" no-gutters>
    <text-list :listItem="list" />
  </v-row>
</template>

<script>
import TextList from "./../components/TextList.vue";
export default {
  props: ["list"],
  components: { TextList },
};
</script>

<style scoped></style>
