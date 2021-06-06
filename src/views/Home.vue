<template>
  <v-container fill-height fluid primary>
    <v-row class="justify-center mx-auto white--text flex-row-reverse">
      <v-col class="border col-8 col-sm-4">
        <v-img
          contain
          min-height="150px"
          max-height="360px"
          class=""
          src="./../assets/head.svg"
        />
      </v-col>

      <v-col id="textoAqui" class="mx-4 mt-auto col-12 col-md-6">
        <p
          id="titulo"
          v-html="bemVindo.titulo"
          class="border mb-md-10 text-h5 text-sm-h3 text-md-h3 font-weight-bold"
          style="text-align: center"
        ></p>
        <p
          id="texto"
          v-html="bemVindo.texto"
          class="border mx-2 text-body-1 text-sm-h5 font-weight-regular"
          style="text-align: center"
        ></p>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col class="border mx-4 mb-2 col-12 col-md-6 ma-auto text-center">
        <v-btn
          dark
          block
          x-large
          outlined
          rounded
          class="button"
          router
          to="/cadastro"
        >
          Clique aqui para começar
        </v-btn>
      </v-col>
    </v-row>
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
<style scoped>
* {
  box-sizing: border-box;
}
</style>
