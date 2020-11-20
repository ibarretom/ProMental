<template>
  <v-col class="pa-2 rounded-lg primary text-width-subtitle-2 white--text text-left col-md-3 col-8">
    <ul class="mx-auto my-auto">
      <li v-for="(item, index) in listItem" :key="index">
        {{ item }}
      </li>
    </ul>
  </v-col>
</template>

<script>
export default {
  props: ["listItem"],

  data: () => ({}),
};
</script>
<style scoped></style>
