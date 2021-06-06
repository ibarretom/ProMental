<template>
  <v-container class="justify-center" fluid fill-height primary>
    <v-row class="justify-center white--text flex-row-reverse">
      <v-col class="border col-8 col-sm-4">
        <v-img
          contain
          min-height="150px"
          max-height="360px"
          class=""
          src="./../assets/head.svg"
        />
      </v-col>

      <v-col class="mx-4 mt-auto col-12 col-md-6">
        <p
          v-html="bemVindo.titulo"
          class="border mb-md-10 text-h5 text-sm-h3 text-center text-md-h3 font-weight-bold"
        ></p>
        <p
          v-html="bemVindo.texto"
          class="border mb-8 text-body-1 text-center text-sm-h5 font-weight-regular"
        ></p>
        <v-btn
          dark
          block
          x-large
          outlined
          rounded
          class="text-center"
          router
          to="/cadastro"
        >
          Clique aqui para começar
        </v-btn>
      </v-col>
    </v-row>
    <!-- <v-row class="justify-center align-center">
      <v-col class="col-12 col-md-6"> </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
import questionsBank from "./../data_center/questions.js";

export default {
  data: () => ({
    startFormPage: "/cadastro",
    bemVindo: { titulo: "", texto: "" }
  }),

  async beforeCreate() {
    const welcome = await questionsBank.colecao("boas-vindas");
    this.bemVindo = { ...welcome[0] };
    this.$root.$emit("spinner::hide");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container.fill-height > .row {
  flex: 1 1 100%;
  max-width: 100%;
}
.v-btn {
  text-transform: none;
}
</style>
