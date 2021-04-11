<template>
  <section class='content px-md-16 d-flex flex-column justify-space-between'>
    <tool-bar :active="false" :flat="true" :backTo="homeRouter" color="white" icon="mdi-arrow-left" />
    <div class='up d-flex flex-column'>
      <section class='pergunta d-flex pt-4 px-4'>
        <Message :botQuestion='botQuestion' />
      </section>
    <section class="texto-resposta-usuario d-flex justify-end">
      <p class='px-4 py-2 mr-5 primary rounded-lg white--text'>{{userAnsware[answareIndex]}}</p>
    </section>
    <section class="opcao-resposta-usuario" >
      <v-item-group v-if='steps[answareIndex] === "gender"' class='card d-flex justify-space-around' active-class="justify-space-around" v-model='cardSelection'>
      <CardItemGender v-for="(card, index) in cardGender" :key='index' :gender="card.label" :colorCard="card.cardColor" :imageSource="card.imageSource" :cardValue="card.value"/>
      </v-item-group>
      <div class='opcoes-trablho d-flex justify-center' v-if='steps[answareIndex] === "work"'>
        <v-radio-group row v-model='radio'>
          <v-radio v-for="(radio, index) in workOptions" :key="index" :label="radio.label" :value="radio.value" ></v-radio>
        </v-radio-group>
      </div>
      <v-form ref="ageForm" class='idade' v-if='steps[answareIndex] === "age"' v-on:submit.prevent="confirmar(steps[answareIndex])">
        <v-text-field outlined color="light-blue" type="number" v-model="ageField" :counter="maxTextAgeInput" :rules="ageRule" label="Digte sua idade" required> </v-text-field>
      </v-form>
    </section>
    </div>
      <div class='down'>
        <section class="botao-confirmar d-flex justify-center">
          <div class='content-button'>
            <v-btn v-if='ageField || radio || cardSelection ' confirma block color="primary" dark large rounded @click='confirmar(steps[answareIndex])'> confirmar </v-btn>
          </div>
        </section>
      </div>
  </section>
</template>

<script>
import CardItemGender from '../components/CardItemGender.vue'
import ToolBar from './../components/ToolBar'
import Message from './../components/Message'
export default {
  components: { ToolBar, CardItemGender, Message /* ,TextAnsware, */ },
  data: () => {
    return {
      cardSelection: null,
      steps: ['gender', 'work', 'age'],
      step: 0,
      user: {
        gender: null,
        age: null,
        isWorking: null,
        score: null,
        burnout: null
      },

      ageField: '',
      maxTextAgeInput: 3,

      radio: null,
      answareIndex: 0,

      botQuestion: 'Olá seja bem vindo ao questionário, antes de começar, que tal contar um pouco sobre você?',
      userAnsware: ['Eu sou', 'No momento eu', 'Eu Tenho'],

      ageRule: [(ageRules) => ageRules.length < 4 || 'Excedido quantidade de caracteres', (ageRules) => ageRules !== '' || 'Campo Invalido'],
      homeRouter: '/home',

      cardGender: [
        { imageSource: 'avatar-men.png', label: 'Homem', cardColor: 'primary', value: 1 },
        { imageSource: 'avatar-women2.png', label: 'Mulher', cardColor: 'pink', value: 2 }
      ],

      workOptions: [
        { label: 'Trabalho', value: 1 },
        { label: 'Não Trabalho', value: 2 }
      ]
    }
  },
  methods: {
    confirmar (step) {
      if (this.answareIndex !== 2) {
        this.answareIndex++
      }
      if (step === this.steps[0]) {
        this.user.gender = this.cardSelection === 2 ? 'female' : 'male'
        this.cardSelection = 0
      } else if (step === this.steps[1]) {
        this.user.isWorking = this.radio === 1
        this.radio = 0
      } else if (step === this.steps[2]) {
        if (this.$refs.ageForm.validate()) {
          this.steps = step
          this.user.age = this.ageField
          this.$router.push({ name: 'QuizScreen', params: { user: this.user } })
        }
      }
    }
  }, // end Methods

  mounted () {
    this.$firebase
      .firestore()
      .collection('falas-coleta-de-dados')
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.botQuestion = doc.data().sistema
          this.userAnsware = doc.data().usuario
        })
      })
  }
}
</script>

<style scoped>
.borda{
  border: 1px solid black;
}
.content{
  padding: 8px;
  height: 100%;
}
.grid-layout{
  display: grid;
  height: 100%;
}
.botao-confirmar{
  /* position: absolute; */
  /* bottom: 24px; */
}
.content-button{
  width: 50vw;
}
</style>