<template>
  <v-container class='justify-space-between flex-column px-md-16' fluid fill-height>
    <tool-bar :backTo="pushTo" color="white" :progressVal="progressPrint" :icon="arrowLeft" :flat="true" />

    <v-container class="px-0 py-0" fluid no-gutters>
      <v-row>
        <v-col cols="12">
          <message :botQuestion="questionText()" />
        </v-col>
      </v-row>
    </v-container>

    <v-container class='bottom'>
      <v-row class="border-chat justify-space-around flex-row-reverse pa-2" no-gutters>
        <template v-for="(answare, index) in questionarioSelecionado.respostas">
          <v-col :class="questionarioSelecionado.tipo === 'trabalho' ? 'col-12 col-md-4 col-sm-5 mx-1 my-1' : 'col-4 col-md-2 mx-1'" :key="index">
            <v-btn block max-width="100%" class="wrap rounded-xl" color="primary" @click="answareQuestion(index, 'base')">
              {{ answare }}
            </v-btn>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import Message from '../components/Message.vue'
import ToolBar from '../components/ToolBar.vue'
import db from './../data_center/questions.js'

export default {
  components: { ToolBar, Message },
  data: () => ({
    user: {
      age: null,
      gender: null,
      trabalhando: null,
      score: {
        sqr20: 0,
        trabalho: 0,
        esgotamento: 0
      },
      localizacao: { estado: null, municipio: null }
    },

    tempScore: 0,
    indiceQuest: 0,
    indicePerg: 0,

    questionarios: [],
    questionarioSelecionado: '',
    ordem: '',

    perguntas: [],
    perguntaExibida: '',

    progress: 0,
    progressoSalvo: 0,
    progressPrint: 0,
    addProgress: null,

    arrowLeft: 'mdi-arrow-left',

    negative: false,
    positive: true,

    pushTo: '/home'
  }),
  computed: {
    questionarioEmUso () {
      const { questionarios, ordem } = this
      const selecionar = questionarios.filter(quest => { return quest.tipo === ordem[this.indiceQuest] })
      return selecionar[0]
    }
  },
  watch: {
    indiceQuest () {
      this.questionarioSelecionado = this.questionarioEmUso
      this.perguntas = this.questionarioSelecionado.perguntas
    },
    tempScore (scoreAtual) {
      const posicaoDoArray = this.indiceQuest + 1
      const limite = scoreAtual >= this.questionarioSelecionado.scoreCorte
      const questionario = this.ordem[this.indiceQuest]

      if (limite && posicaoDoArray <= this.ordem.length) {
        this.atualizaScore()
        this.user.trabalhando ? console.log() : this.proximaTela()
        if (questionario === 'esgotamento-n1') {
          this.progressPrint = 100
          this.proximaTela()
        } else if (questionario !== 'esgotamento-n2') {
          this.indiceQuest++
          this.indicePerg = 0
        }
      }
    },
    perguntaExibida (atual, anterior) {
      const posicaoDoArray = this.indiceQuest + 1

      if (atual === 'fim' && posicaoDoArray < this.ordem.length) {
        this.indiceQuest++
        this.indicePerg = 0
        this.user.trabalhando ? console.log() : this.proximaTela()
      } else if (atual === 'fim' && posicaoDoArray === this.ordem.length) {
        // puxa para proxima tela
        this.proximaTela()
      }
    }
  },
  methods: {
    answareQuestion (value) {
      this.tempScore += value
      this.indicePerg++
      this.modificarProgresso()
    }, // answareQuestion function end

    modificarProgresso () {
      const { positive, negative } = this

      if (this.tempScore >= this.questionarioSelecionado.scoreCorte) {
        if (this.user.trabalhando === positive) {
          this.progressoSalvo += this.questionarioSelecionado.tamanho * this.addProgress
          this.progress = this.progressoSalvo // 9 questoes do questionario de trabalho mais 11 do esgotamento
        } else if (this.user.trabalhando === negative) {
          this.progress = 100
          this.indicePerg = 20
        }
      } else {
        this.progress += this.addProgress
      }

      this.progressPrint = this.progress.toFixed(1)
    },
    // retorna a pergunta a ser exibida
    questionText () {
      this.perguntaExibida = this.perguntas[this.indicePerg]
      return this.perguntaExibida
    },
    atualizaScore () {
      const questionario = this.ordem[this.indiceQuest]
      if (questionario === 'sqr20') {
        this.user.score.sqr20 = this.tempScore
        this.tempScore = 0
      } else if (questionario === 'trabalho') {
        this.user.score.trabalho = this.tempScore
        this.tempScore = 0
      } else if (questionario === 'esgotamento-n1' || questionario === 'esgotamento-n2') {
        this.user.score.esgotamento = this.tempScore
      }
    },
    proximaTela () {
      this.$router.params = this.user
      this.$router.push({ name: 'ResultScreen' })
    },
    analisaScore () {
      // grava o score do usuario e analisa as condições de stress.
    }
  } /* End methods */,

  async created () {
    try {
      this.user = this.$route.params.user // || { score: { sqr20: 0, trabalho: 0, esgotamento: 0 }, tralhando: true }
      console.log('console', this.user.trabalhando)
      if (this.user.trabalhando) {
        this.addProgress = 100 / 40 // O usuario precisa responder 40 questoes, poderia ser utilizado o tamanho do vetor questions, que se encontra no arquivo questions.js.
      } else {
        console.log('else')
        this.addProgress = 100 / 20 // Novamente poderia ser utilizado o tamanho, mais, o uso de tamanho de um vetor no js nao é tão confiavel.
      }
      if (!db.questionario) {
        this.$router.push({ name: 'FormScreenData' })
      }
    } catch (e) {
      this.$router.push({ name: 'FormScreenData' })
    }

    this.questionarios = db.questionario
    const seq = db.questionario_ordem
    this.ordem = seq[0].ordem

    this.questionarioSelecionado = this.questionarioEmUso
    this.perguntas = this.questionarioSelecionado.perguntas
  },
  mounted () {
    this.$root.$emit('spinner::hide')
  }
}
</script>

<style scoped>
.middle{
  overflow: auto;
}
.bottom{
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
