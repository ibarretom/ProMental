<template>
  <v-container class="align-content-space-between" fill-height fluid>
    <tool-bar backTo="/home" color="white" :progressVal="progressPrint" :icon="arrowLeft" :flat="true" />

    <v-container class="px-0 py-0" fluid no-gutters>
      <v-row>
        <v-col cols="12">
          <message v-if="questionText() !== lastQuestion" :textIn="questionText()" />

          <template v-if="healthTipsActive">
            <message id="finalText" :textIn="scoreAnalysis()" :propLink="true" />
            <message-list class="mt-2" :list="healthTips" />
            <v-btn v-if="healthUnits" class="primary mt-2 mx-md-4 radius" @click="googleMapsRedirect()" depressed large> Unidades de saúde </v-btn>
          </template>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid wrap>
      <v-row v-if="!healthTipsActive" class="border-chat justify-space-around flex-row-reverse pa-2" no-gutters>
        <template v-for="(answare, index) in questionary[indexQuestionary].answare">
          <v-col :class="questionary[indexQuestionary].id === 'work' ? 'col-12 col-md-4 col-sm-5 mx-1 my-1' : 'col-4 col-md-2 mx-1'" :key="index">
            <v-btn block max-width="100%" class="wrap rounded-xl" color="primary" @click="answare === 'finalizar' ? pushHome() : answareQuestion(answare, questionary[indexQuestionary].id, index)">
              {{ answare }}
            </v-btn>
          </v-col>
        </template>
      </v-row>

      <v-row v-if="healthTipsActive" class="border-chat justify-space-around flex-row-reverse" no-gutters>
        <v-col class="col-6 col-md-3 col-sm-3 my-2">
          <v-btn block max-width="100%" class="wrap rounded-xl" color="primary" @click="pushHome()"> Finalizar </v-btn>
          <Dialog :message="dialog.conteudo" :title="dialog.titulo" :dialogActive="diagActive" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import Message from "./../components/Message.vue";
import MessageList from "./../components/MessageList.vue";
import ToolBar from "./../components/ToolBar.vue";
import questionsBank from "./../data_center/questions.js";
import Dialog from "./../components/DialogGoogleForm.vue";

export default {
  components: { ToolBar, Message, MessageList, Dialog },
  data: () => ({
    user: {
      age: null,
      gender: null,
      isWorking: null,
      score: 0,
      burnout: 0, //No fim do programa, se o usuario tem burnout, essa variavel vira um Boolean TRUE
    },

    indexQuestionary: questionsBank.questionary.part,
    questionary: questionsBank.questionary.questions,
    healthTips: questionsBank.healthTips.tips,
    healthTipsActive: questionsBank.healthTips.healthTipsActive,
    askIndex: questionsBank.questionary.askIndex,

    progress: 0,
    progressPrint: 0,
    lastQuestion: questionsBank.lastQuestion,
    cutScore: 7,
    burnoutCutScore: 29,
    faintScore: 0,

    addProgress: null,
    arrowLeft: "mdi-arrow-left",

    negative: false,
    positive: true,
    sim: "sim",
    nao: "nao",

    diagActive: false,
    dialog: {
      texto: null,
      conteudo: null,
    },
    finalMessage: "",
    healthUnits: false,
  }),

  methods: {
    answareQuestion(answare, id, answareValue) {
      //console.log(answare, id, answareValue);
      //console.log(this.healthTips)
      this.user.score += answareValue;

      //console.log('User Score:', this.user.score, 'Cut Score:', this.cutScore, 'FaintScore', this.faintScore);
      //console.log('Antes:', 'Progress:', this.progress, 'Cut Score:', this.cutScore);

      if (id === "work") {
        this.user.burnout += answareValue;
      }
      this.askIndex++;

      //console.log('Ask index:', this.askIndex);
      //Confere se o usuario esta trabalhando e checka se a ultima pergunta foi alcançada. Por fim, muda a parte(o questionario)
      if (this.user.isWorking) {
        if (this.questionary[this.indexQuestionary].ask[this.askIndex] === this.lastQuestion && this.indexQuestionary != 1) {
          //A primeira parte do questionario é base(SQR20) que leva o index 0. A secunda o g4, index 1, assim por diante.
          // Só adiciono 1 no questionario se for diferente de 2(work). Seria o mesmo que usar o tamanho do vetor questionary
          this.indexQuestionary++;
          this.askIndex = 0;
        }
      } else if (!this.user.isWorking) {
        if (this.questionary[this.indexQuestionary].ask[this.askIndex] === this.lastQuestion && this.indexQuestionary != 0) {
          this.indexQuestionary++;
          this.askIndex = 0;
        }
      }

      //ativa as dicas no fim do quesitonoario
      if (this.questionary[this.indexQuestionary].ask[this.askIndex] === this.lastQuestion) {
        this.healthTipsActive = true;
      }

      //modifica a barra de progresso
      if (this.user.score === this.cutScore && id === "base") {
        if (this.user.isWorking === this.positive) {
          this.indexQuestionary++;
          this.progress = 100 - 9 * this.addProgress;
          this.askIndex = 0;
        } else if (this.user.isWorking === this.negative) {
          this.progress = 100;
          this.askIndex = 20;
          this.healthTipsActive = true;
        }
      } else {
        this.progress += this.addProgress;
      }
      this.progressPrint = this.progress.toFixed();
      //console.log('Depois:', 'Progress:', this.progress, 'Cut Score:', this.cutScore);
    }, //answareQuestion function end

    //funcao para analisar o score do usuario
    scoreAnalysis() {
      var tipsBurnout = false;
      if (this.user.score >= this.cutScore) {
        this.healthUnits = true;
        tipsBurnout = true;
        if (this.user.burnout >= this.burnoutCutScore) {
          this.user.burnout = true;
        }
      } else {
        tipsBurnout = false;
      }

      this.healthTipsActive = true;
      var tips = tipsBurnout ? this.finalMessage.burnout : this.finalMessage.saudavel;
      return tips;
    },
    //retorna a pergunta a ser exibida
    questionText() {
      return this.questionary[this.indexQuestionary].ask[this.askIndex];
    },
    //exibe o dialogo no fim, ou puxa o usuario para a tela inicial, só descomentar o codigo.
    pushHome() {
      this.diagActive = true;
      // this.$router.push({name:'Home'});
    },

    googleMapsRedirect() {
      window.open("https://www.google.com.br/maps/search/hospitais/");
    },
  } /*End methods */,

  created() {
    this.$firebase
      .firestore()
      .collection("convite")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.dialog = doc.data();
        });
      });

    this.$firebase
      .firestore()
      .collection("mensagem-final")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.finalMessage = doc.data();
        });
      });

    this.user = this.$route.params.user;
    switch (this.user.isWorking) {
      case true:
        this.addProgress = 100 / 29; //O usuario precisa responder 29 questoes, poderia ser utilizado o tamanho do vetor questions, que se encontra no arquivo questions.js.
        break;
      case false:
        this.addProgress = 100 / 20; //Novamente poderia ser utilizado o tamanho, mais, o uso de tamanho de um vetor no js nao é tão confiavel.
        break;
      default:
        this.addProgress = null;
    }
  },
  mounted() {},
};
</script>

<style scoped>
.border-chat {
  border: 1px solid #eeeeee;
  background-color: #eeeeee;
  border-radius: 30px;
}
.radius {
  border-radius: 8px;
}
</style>
