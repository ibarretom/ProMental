<template>
  <v-app-bar class="ma-0" :color="color" short app :flat="flat">
    <v-btn icon router :to="backTo">
      <v-icon :color="iconColor">{{ icon }}</v-icon>
    </v-btn>

    <ProgressBar :activeBar="active" :progressValue="progressVal"></ProgressBar>
  </v-app-bar>
</template>

<script>
import ProgressBar from './ProgressBar.vue'
export default {
  props: ['progressVal', 'backTo', 'active', 'icon', 'color', 'iconColor', 'onClick', 'flat'],
  components: { ProgressBar }
}
</script>

<style scoped></style>
