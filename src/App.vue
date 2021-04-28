<template>
  <v-app>
    <v-main>
      <load />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<style>
#app {
  font-family: "Roboto", "Avenir", Helvetica, Arial, sans-serif;
}
</style>
<script>
import Load from './components/LoadScreen'
export default {
  name: 'App',

  components: { Load },

  data: () => ({
    //
  })
}
</script>
<style>
</style>
