<template>
  <section class='pergunta d-flex pt-4 px-4'>
    <v-avatar class='mr-3'>
      <v-img
          lazy-src="./../assets/head.svg"
          src="./../assets/head.svg"
          contain
    ></v-img>
    </v-avatar>
    <p class='pa-2 primary rounded-lg white--text'> {{botQuestion}}</p>
  </section>
</template>

<script>

export default {
  props: ['botQuestion']
}
</script>
<style scoped></style>
