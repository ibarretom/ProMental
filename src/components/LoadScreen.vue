<template>
  <v-container v-if='mostrar' :class="`justify-center align-center load flex-column`" :style='`background-color: ${color};` ' fluid fill-height>
    <slot />
    <div v-if='img'>
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
  z-index: 999999;
}

</style>
<script>
export default {
  props: {
    color: {
      default: () => '#1975D1'
    },
    show: Boolean,
    img: {
      type: Boolean,
      default: () => true
    }
  },

  data () {
    return {
      mostrar: this.show
    }
  },
  created () {
    this.$root.$on('spinner::show', () => {
      this.mostrar = true
    })
    this.$root.$on('spinner::hide', () => {
      this.mostrar = false
    })
  }
}
</script>
