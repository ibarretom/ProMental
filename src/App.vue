<template>
    <!-- App.vue -->
    <v-app>
        <!-- <v-navigation-drawer app> -->
        <!-- <v-app-bar class="" color="white" app>
        </v-app-bar > -->
        
        <!-- </v-navigation-drawer> -->
            <!-- <v-app-bar class="mx-0" app> -->
        <!-- </v-app-bar > -->
        
        <!-- <v-app-bar app>
        <v-icon> mdi-menu</v-icon>
        <h2 class="mx-2 " >ProMental </h2>
        </v-app-bar> -->

        <!--Sizes your content based upon application components-->
        <v-main class="background-main">
        <!-- Provides the application the proper gutter -->
        <!-- <v-container style="background-color:red"> -->
            <router-view></router-view>
        <!-- </v-container> -->
        </v-main>

    </v-app>
</template>

<script>
// import BottomMenu from "./../components/BottomMenu.vue";
// import ToolBar from "./../components/ToolBar.vue";
// //  import ProgressBar from "./../components/ProgressBar.vue";
export default {
  name: "App",
//   components: { ProgressBar },

    data: () => ({
  }),
};
</script>

<style>
#app {
  /* font-family: "Roboto", "Avenir", Helvetica, Arial, sans-serif; */
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50; */
  
}
.background-main{
  background-color: white;

}
</style>

