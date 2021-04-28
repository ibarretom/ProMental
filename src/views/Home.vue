<template>
  <v-container fill-height fluid primary>
    <v-layout row wrap justify-center align-center class="mx-auto white--text flex-row-reverse">
      <v-flex class="border" xs8 sm4>
        <v-img contain min-height="150px" max-height="360px" class="" src="./../assets/head.svg" />
      </v-flex>

      <v-flex id="textoAqui" class="mx-4" xs12 sm12 md6>
        <p id="titulo" v-html="bemVindo.titulo" class="border mb-md-10 text-h5 text-sm-h3 text-md-h3 font-weight-bold" style="text-align: center">

        </p>
        <p id="texto" v-html="bemVindo.texto" class="border mx-2 text-body-1 text-sm-h5 font-weight-regular" style="text-align: center"></p>
      </v-flex>

      <v-flex class="border mx-4 mb-2" xs12 sm12 md6>
        <v-btn block dark height="56px" outlined rounded class="button" router :to="startFormPage"> Clique aqui para começar </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import questionsBank from './../data_center/questions.js'
export default {
  data: () => ({
    startFormPage: '/ds',
    bemVindo: { titulo: '', texto: '' }
  }),

  async beforeCreate () {
    const welcome = await questionsBank.colecao('boas-vindas')
    this.bemVindo = welcome[0]
    this.$root.$emit('spinner::hide')
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  box-sizing: border-box;
}

</style>
