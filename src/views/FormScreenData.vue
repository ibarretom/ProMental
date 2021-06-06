<template>
  <v-container
    class="content px-md-16 d-flex flex-column justify-space-between"
  >
    <tool-bar
      :active="false"
      :flat="true"
      :backTo="homeRouter"
      color="white"
      icon="mdi-arrow-left"
    />
    <div class="up d-flex flex-column">
      <section class="pergunta d-flex pt-4 px-4">
        <Message :botQuestion="botQuestion" />
      </section>
      <section class="texto-resposta-usuario d-flex justify-end">
        <p class="px-4 py-2 mr-5 primary rounded-lg white--text">
          {{ userAnsware[answareIndex] }}
        </p>
      </section>
      <section class="opcao-resposta-usuario">
        <v-item-group
          v-if="steps[answareIndex] === 'gender'"
          class="card d-flex justify-space-around"
          active-class="justify-space-around"
          v-model="cardSelection"
        >
          <CardItemGender
            v-for="(card, index) in cardGender"
            :key="index"
            :gender="card.label"
            :colorCard="card.cardColor"
            :imageSource="card.imageSource"
            :cardValue="card.value"
          />
        </v-item-group>
        <div
          class="opcoes-trablho d-flex justify-center"
          v-if="steps[answareIndex] === 'work'"
        >
          <v-radio-group row v-model="radio">
            <v-radio
              v-for="(radio, index) in workOptions"
              :key="index"
              :label="radio.label"
              :value="radio.value"
            ></v-radio>
          </v-radio-group>
        </div>
        <div
          class="opcoes-estado mx-5"
          v-if="steps[answareIndex] === 'municipio'"
        >
          <v-select
            :items="listaEstados"
            v-model="estado"
            label="Estado"
            dense
            outlined
          ></v-select>
          <v-select
            v-if="municipioAux"
            v-model="municipio"
            :items="listaMunicipios"
            label="Cidade"
            dense
            outlined
          ></v-select>
        </div>
        <v-form
          ref="ageForm"
          class="idade mx-5"
          v-if="steps[answareIndex] === 'age'"
          v-on:submit.prevent="confirmar(steps[answareIndex])"
        >
          <v-text-field
            outlined
            color="light-blue"
            type="number"
            v-model="ageField"
            :counter="maxTextAgeInput"
            :rules="ageRule"
            label="Digite sua idade"
            required
          >
          </v-text-field>
        </v-form>
      </section>
    </div>
    <div class="down">
      <section class="botao-confirmar mb-4 d-flex justify-center">
        <v-btn
          v-if="ageField || municipio || radio || cardSelection"
          @click="confirmar(steps[answareIndex])"
          color="primary"
          width="260px"
          rounded
          large
          dark
        >
          Confirmar
        </v-btn>
      </section>
    </div>
  </v-container>
</template>

<script>
import CardItemGender from "@/components/CardItemGender.vue";
import ToolBar from "@/components/ToolBar";
import Message from "@/components/Message";
import axios from "axios";

export default {
  components: { ToolBar, CardItemGender, Message /* ,TextAnsware, */ },
  data: () => {
    return {
      cardSelection: null,
      steps: ["gender", "municipio", "work", "age"],
      step: 0,
      user: {
        gender: null,
        age: null,
        trabalhando: null,
        score: { sqr20: 0, trabalho: 0, esgotamento: 0 },
        localizacao: { estado: null, municipio: null }
      },

      ageField: "",
      maxTextAgeInput: 3,

      radio: null,
      answareIndex: 0,

      botQuestion:
        "Olá seja bem vindo ao questionário, antes de começar, que tal contar um pouco sobre você?",
      userAnsware: ["Eu sou", "Eu sou do", "No momento eu", "Eu Tenho"],

      ageRule: [
        ageRules => ageRules.length < 4 || "Excedido quantidade de caracteres",
        ageRules => ageRules !== "" || "Campo Invalido",
        ageRules =>
          ageRules < 100 ||
          "Limite de idade excedido. Sua idade deve menor que 100 anos",
        ageRules => ageRules > 15 || "Sua idade deve ser maior que 15 anos"
      ],
      homeRouter: "/home",

      cardGender: [
        {
          imageSource: "avatar-men.png",
          label: "Homem",
          cardColor: "primary",
          value: 1
        },
        {
          imageSource: "avatar-women2.png",
          label: "Mulher",
          cardColor: "pink",
          value: 2
        }
      ],

      workOptions: [
        { label: "Trabalho", value: 1 },
        { label: "Não Trabalho", value: 2 }
      ],

      listaEstados: [],
      listaComUF: [],
      listaMunicipios: [],
      estado: null,
      municipio: null,
      municipioAux: false
    };
  },
  watch: {
    async estado() {
      this.listaMunicipios = [];
      try {
        const indexUF = this.listaComUF.filter(estado => {
          return estado.nome === this.estado;
        });
        const uf = indexUF[0].sigla;
        const listaMunicipios = await axios.get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`
        );
        listaMunicipios.data.forEach(municipio => {
          this.listaMunicipios.push(municipio.nome);
        });
        this.listaMunicipios.sort();
        this.municipioAux = true;
      } catch (e) {}
    }
  },
  methods: {
    confirmar(step) {
      if (this.answareIndex !== 3) {
        this.answareIndex++;
      }
      if (step === this.steps[0]) {
        this.user.gender = this.cardSelection === 2 ? "female" : "male";
        this.cardSelection = 0;
      } else if (step === this.steps[1]) {
        this.user.localizacao.estado = this.estado;
        this.user.localizacao.municipio = this.municipio;
        this.municipio = 0;
        this.estado = 0;
      } else if (step === this.steps[2]) {
        this.user.trabalhando = this.radio === 1;
        this.radio = 0;
      } else if (step === this.steps[3]) {
        if (this.$refs.ageForm.validate()) {
          this.steps = step;
          this.user.age = this.ageField;
          this.$router.push({
            name: "QuizScreen",
            params: { user: this.user }
          });
        }
      }
    }
  }, // end Methods
  async created() {
    const uf = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
    const ufData = uf.data;
    this.estado = ufData.forEach(uf => {
      this.listaEstados.push(uf.nome);
      this.listaComUF.push({ sigla: uf.sigla, nome: uf.nome });
    });
    this.listaEstados.sort();
    this.$root.$emit("spinner::hide");
    // db.questionario = await db.colecao("questionario");
    // db.questionario_ordem = await db.colecao("questionario-ordem");
  }
};
</script>

<style scoped>
.content {
  padding: 8px;
  height: 100%;
}
.content-button {
  width: 50vw;
}
</style>
