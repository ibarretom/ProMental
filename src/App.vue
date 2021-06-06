<template>
  <v-app>
    <v-main>
      <load :show="true" />
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
import { GoogleAuthProvider } from "firebase/auth";
export default {
  name: "App",

  data: () => ({
    //
  }),
  created() {
    this.$root.$emit("spinner::show");
  }
};
</script>
<style></style>
