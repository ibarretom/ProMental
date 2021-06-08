<template>
  <v-container class="justify-space-between flex-column px-md-16" fill-height>
    <tool-bar
      v-if="showTb"
      :backTo="pushTo"
      color="white"
      :progressVal="progressPrint"
      :icon="arrowLeft"
      :flat="true"
    />
    <load :show="showLoadScreen" color="#1975D1" :img="false">
      <h1 v-if="true" class="white--text text-center mb-4">
        {{ questionarioAtual.msgTransicao }}
      </h1>
      <h2 class="white--text">
        Começando em <span class="red--text">{{ timer }}</span>
      </h2>
    </load>

    <v-container class="px-0 py-0" fluid no-gutters>
      <v-row>
        <v-col cols="12">
          <message :botQuestion="perguntas[indicePerg]" />
        </v-col>
      </v-row>
    </v-container>

    <v-container class="bottom">
      <v-row
        :class="
          questionarioAtual.tipo === 'trabalho-n2'
            ? 'border-chat justify-space-around pa-2'
            : 'border-chat justify-space-around flex-row-reverse pa-2'
        "
        no-gutters
      >
        <template v-for="(answare, index) in questionarioAtual.respostas">
          <v-col
            :class="
              questionarioAtual.tipo === 'esgotamento'
                ? 'col-12 col-md-4 col-sm-5 mx-1 my-1'
                : 'col-4 col-md-2 mx-1'
            "
            :key="index"
          >
            <v-btn
              block
              max-width="100%"
              class="wrap rounded-xl"
              color="primary"
              @click="answareQuestion(index, 'base')"
            >
              {{ answare }}
            </v-btn>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import Message from "@/components/Message.vue";
import ToolBar from "@/components/ToolBar.vue";
import axios from "axios";
import db from "@/data_center/questions.js";

export default {
  components: { ToolBar, Message },
  data() {
    return {
      showTb: true,
      showLoadScreen: false,
      user: {
        age: 20,
        gender: "male",
        trabalhando: true,
        score: {
          sqr20: 0,
          trabalho: 0,
          esgotamento: 0
        },
        localizacao: { estado: "RJ", municipio: "SP" }
      },

      tempScore: 0,
      indiceQuest: 0,
      indicePerg: 0,

      tamanhoQuestionario: db.questionario.length - 1,

      progress: 0,
      progressPrint: 0,
      addProgress: 2.5,

      arrowLeft: "mdi-arrow-left",

      negative: false,
      positive: true,

      pushTo: "/home",
      timer: 4
    };
  },
  computed: {
    questionarioAtual() {
      return db.questionario[this.indiceQuest];
    },
    perguntas() {
      return this.questionarioAtual.perguntas;
    },
    perguntaAtual() {
      return this.perguntas[this.indicePerg];
    },
    tamanhoQuestionarioAtual() {
      return this.questionarioAtual.tamanho;
    },
    fronteira() {
      return this.tamanhoQuestionario > this.indiceQuest;
    },
    limiteDePontos() {
      return this.tempScore >= this.questionarioAtual.scoreCorte;
    }
  },
  watch: {
    indicePerg(novo) {
      if (this.perguntas != null) this.salvarUserProgressLS();
      if (!novo && this.questionarioAtual.tipo !== "trabalho-n2") {
        this.exibirTelaTransicao(this.questionarioAtual);
      }
    },
    tempScore() {
      this.atualizaScore();

      if (this.limiteDePontos && this.fronteira) {
        if (!this.user.trabalhando) this.proximaTela();
        if (this.questionarioAtual.tipo === "trabalho-n1") {
          this.indiceQuest++;
        }
        this.indiceQuest++;
        this.indicePerg = 0;
        if (this.questionarioAtual.tipo != "trabalho-n2") {
          this.tempScore = 0;
        }
      } else if (this.limiteDePontos) {
        this.proximaTela();
      }
    },
    perguntaAtual(pergunta) {
      if (this.perguntas != null) this.salvarUserProgressLS();
      if (pergunta === "fim" && this.fronteira) {
        if (this.user.trabalhando) {
          if (
            this.questionarioAtual.tipo === "sqr20" ||
            this.questionarioAtual.tipo === "trabalho-n2"
          ) {
            this.proximaTela();
          }
        } else if (!this.user.trabalhando) {
          this.proximaTela();
        }
        this.indicePerg = 0;
        this.indiceQuest++;
        if (this.questionarioAtual.tipo != "trabalho-n2") {
          this.tempScore = 0;
        }
      } else if (pergunta === "fim") {
        this.proximaTela();
      }
    }
  },
  methods: {
    answareQuestion(value) {
      this.indicePerg++;
      this.tempScore += value;

      this.modificarProgresso();
    },
    salvarUserProgressLS() {
      const progress = {
        pergunta: this.indicePerg,
        questionario: this.indiceQuest,
        user: this.user,
        barraProgresso: this.progress
      };
      localStorage.setItem("user_progress", JSON.stringify(progress));
    },
    getUserProgress() {
      const progresso = localStorage.getItem("user_progress");
      return JSON.parse(progresso);
    },
    modificarProgresso() {
      this.progress += this.addProgress;
      if (this.limiteDePontos) {
        this.adicionarProgressoRestante();
        if (this.questionarioAtual.tipo === "trabalho-n1")
          this.adicionarProgressoQuestionarioTrabalhoN2();
      }
      this.progressPrint = this.progress.toFixed(1);
    },
    adicionarProgressoRestante() {
      const quantidadeDeVezes =
        this.questionarioAtual.tamanho - this.indicePerg;
      this.progress += quantidadeDeVezes * this.addProgress;
    },
    adicionarProgressoQuestionarioTrabalhoN2() {
      const trabalhoN2 = questionario => questionario.tipo === "trabalho-n2";
      const questionarioTrabN2 = db.questionario.filter(trabalhoN2)[0];
      this.progress += questionarioTrabN2.tamanho * this.addProgress;
    },
    atualizaScore() {
      const tipoDoQuestionario = this.questionarioAtual.tipo;
      if (tipoDoQuestionario === "sqr20") {
        this.user.score.sqr20 = this.tempScore;
      } else if (tipoDoQuestionario === "esgotamento") {
        this.user.score.esgotamento = this.tempScore;
      } else if (
        tipoDoQuestionario === "trabalho-n1" ||
        tipoDoQuestionario === "trabalho-n2"
      ) {
        this.user.score.trabalho = this.tempScore;
      }
    },
    proximaTela() {
      this.analisaScore(this.user);
      this.registraUsuario(this.user);
      this.$router.push({
        name: "ResultScreen",
        params: { scores: this.user.score }
      });
    },
    async registraUsuario(user) {
      if (!localStorage.getItem("respondeu")) {
        await db.logarEescrever(user);
        localStorage.setItem("respondeu", "true");
      } else {
      }
    },
    async analisaScore(user) {
      user.score.sqr20 >= 7
        ? (user.score.sqr20 = true)
        : (user.score.sqr20 = false);
      user.score.trabalho >= 4
        ? (user.score.trabalho = true)
        : (user.score.trabalho = false);
      user.score.esgotamento >= 26
        ? (user.score.esgotamento = true)
        : (user.score.esgotamento = false);
    },
    exibirTelaTransicao(questionarioAtual) {
      this.showTb = !this.showTb;
      this.$root.$emit("spinner::show");

      const contagemRegressiva = setInterval(() => {
        this.timer--;
        if (this.timer <= 0) {
          clearInterval(contagemRegressiva);
          this.timer = 4;
        }
      }, 1000);

      setTimeout(() => {
        this.showTb = !this.showTb;
        this.$root.$emit("spinner::hide");
      }, 4000);
    },
    definirAdicaoDeProgresso(usuarioTrabalha) {
      usuarioTrabalha
        ? (this.addProgress = 100 / 40)
        : (this.addProgress = 100 / 20);
    }
  } /* End methods */,
  mounted() {
    this.exibirTelaTransicao();
  },
  async created() {
    try {
      this.user = this.$route.params?.user; // || { score: { sqr20: 0, trabalho: 0, esgotamento: 0 }, tralhando: true }
      if (!this.user) {
        if (!this.getUserProgress()) {
          this.$router.push({ path: "cadastro" });
        }
        throw "Nao tem usuario nos parametros";
      }
    } catch (e) {
      try {
        if (this.getUserProgress()) {
          const usuarioJaFez = this.getUserProgress();
          this.user = usuarioJaFez?.user;
          this.indicePerg = parseInt(usuarioJaFez?.pergunta);
          this.indiceQuest = parseInt(usuarioJaFez?.questionario);
          this.progressPrint = parseFloat(usuarioJaFez?.barraProgresso);
          this.progress = parseFloat(usuarioJaFez?.barraProgresso);
          if (
            this.questionarioAtual.tipo == "trabalho-n1" ||
            this.questionarioAtual.tipo == "trabalho-n2"
          ) {
            this.tempScore = this.user.score.trabalho;
          } else {
            this.tempScore = this.user.score[this.questionarioAtual.tipo];
          }
        }
      } catch (e) {}
    } finally {
      this.definirAdicaoDeProgresso(this?.user?.trabalhando);
    }
  }
};
</script>

<style scoped>
.middle {
  overflow: auto;
}
.bottom {
  position: sticky;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
.border-chat {
  border: 1px solid #eeeeee;
  background-color: #eeeeee;
  border-radius: 30px;
}
.radius {
  border-radius: 8px;
}
</style>
