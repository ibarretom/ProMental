<template>
  <v-progress-linear :active="activeBar" :background-opacity="opacity" :bottom="bottom" :buffer-value="buffer" :height="height" :indeterminate="indeterminate" :query="query" :rounded="rounded" :stream="stream" :striped="striped" :top="top" :value="progressValue" color="primary" class="rounded-xl">
    <strong class="white--text">{{ progressValue }}%</strong>
  </v-progress-linear>
</template>
<script>
export default {
  props: ['progressValue', 'activeBar'],
  data: () => ({
    absolute: false,
    active: true,
    opacity: 0.3,
    bottom: false,
    buffer: 100,
    fixed: true,
    height: 24,
    indeterminate: false,
    query: false,
    rounded: true,
    stream: false,
    striped: false,
    top: false,
    value: 25,
    progressNum: localStorage.getItem('pP')
  }),
  methods: {
    addProgress () {
      if (this.value === 100) {
        this.value = 0
      } else {
        console.log(this.value)
        this.value += 5
        console.log(this.value)
      }
    }
  }
}
</script>

<style scoped></style>
