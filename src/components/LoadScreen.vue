<template>
  <v-container v-if='show' class='justify-center align-center load primary' fluid fill-height>
    <div>
    <v-img
      lazy-src="@/assets/head.svg"
      src="@/assets/head.svg"
      contain
      max-width="200"
    ></v-img>
    </div>
  </v-container >
</template>
<style scoped>
.load{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 99;
}
</style>
<script>
export default {
  data: () => ({
    show: true
  }),
  created () {
    this.$root.$on('spinner::show', () => {
      this.show = true
    })
    this.$root.$on('spinner::hide', () => {
      this.show = false
    })
  }
}
</script>
