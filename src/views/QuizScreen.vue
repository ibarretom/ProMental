<template>
  <v-container class='justify-space-between flex-column px-md-16' fill-height>
    <tool-bar v-if='showTb' :backTo="pushTo" color="white" :progressVal="progressPrint" :icon="arrowLeft" :flat="true" />
    <load :show='showLoadScreen' color='#1975D1' :img='false'>
      <h1 v-if='questionarioSelecionado.msgTransicao' class='white--text text-center mb-4'> {{questionarioSelecionado.msgTransicao}}</h1>
      <h2 class='white--text'>Começando em <span class='red--text'>{{timer}}</span></h2>
    </load>

    <v-container class="px-0 py-0" fluid no-gutters>
      <v-row>
        <v-col cols="12">
          <message :botQuestion="questionText()" />
        </v-col>
      </v-row>
    </v-container>

    <v-container class='bottom'>
      <v-row :class="questionarioSelecionado.tipo === 'trabalho-n2' ? 'border-chat justify-space-around pa-2':'border-chat justify-space-around flex-row-reverse pa-2'" no-gutters>
        <template v-for="(answare, index) in questionarioSelecionado.respostas">
          <v-col :class="questionarioSelecionado.tipo === 'esgotamento' ? 'col-12 col-md-4 col-sm-5 mx-1 my-1' : 'col-4 col-md-2 mx-1'" :key="index">
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
import Message from '@/components/Message.vue'
import ToolBar from '@/components/ToolBar.vue'
import db from '@/data_center/questions.js'

export default {
  components: { ToolBar, Message },
  data: () => ({
    showTb: true,
    showLoadScreen: false,
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

    pushTo: '/home',
    timer: 4
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
      this.exibirTelaTransicao(this.questionarioSelecionado)
    },
    tempScore (scoreAtual) {
      const posicaoDoArray = this.indiceQuest + 1
      const limite = scoreAtual >= this.questionarioSelecionado.scoreCorte
      const questionario = this.ordem[this.indiceQuest]

      if (limite && posicaoDoArray <= this.ordem.length) {
        this.atualizaScore()
        this.user.trabalhando ? console.log() : this.proximaTela()
        this.indiceQuest++
        this.indicePerg = 0
        if (questionario === 'esgotamento') {
          this.proximaTela()
        } else if (questionario === 'trabalho-n1') {
          this.indiceQuest++
        }
      }
    },
    perguntaExibida (atual, anterior) {
      const posicaoDoArray = this.indiceQuest + 1

      if (atual === 'fim' && posicaoDoArray < this.ordem.length) {
        this.atualizaScore()
        this.salvaProgresso(this.questionarioSelecionado.tamanho)

        this.questionarioSelecionado.tipo === 'trabalho-n2' ? this.proximaTela() : console.log()
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
          this.salvaProgresso(this.questionarioSelecionado.tamanho)

          if (this.questionarioSelecionado.tipo === 'trabalho-n1') {
            const questionarioTrabalhoN2 = this.questionarios.filter(questionario => { return questionario.tipo === 'trabalho-n2' })
            const tamanhoTrabalhoN2 = questionarioTrabalhoN2[0].tamanho

            this.salvaProgresso(tamanhoTrabalhoN2)
          }

          this.progress = this.progressoSalvo
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
    salvaProgresso (tamanhoQuestionario) {
      this.progressoSalvo += tamanhoQuestionario * this.addProgress
    },
    atualizaScore () {
      const questionario = this.ordem[this.indiceQuest]
      if (questionario === 'sqr20') {
        this.user.score.sqr20 = this.tempScore
        this.tempScore = 0
      } else if (questionario === 'esgotamento') {
        this.user.score.esgotamento = this.tempScore
        this.tempScore = 0
      } else if (questionario === 'trabalho-n1' || questionario === 'trabalho-n2') {
        this.user.score.trabalho = this.tempScore
      }
    },
    proximaTela () {
      this.analisaScore(this.user)
      this.$router.push({ name: 'ResultScreen', params: { scores: this.user.score } })
    },
    resgistraUsuario () {
      // guarda no firebase
    },
    analisaScore (user) {
      user.score.sqr20 >= 7 ? user.score.sqr20 = true : user.score.sqr20 = false
      user.score.trabalho >= 4 ? user.score.trabalho = true : user.score.trabalho = false
      user.score.esgotamento >= 26 ? user.score.esgotamento = true : user.score.esgotamento = false
      // registraUsuario()
    },
    exibirTelaTransicao (questionarioAtual) {
      console.log(questionarioAtual)
      const exibirTelaDeCarregamento = questionarioAtual.tipo !== 'trabalho-n2'

      if (exibirTelaDeCarregamento) {
        switch (this.indicePerg) {
          case 0 : {
            this.showTb = !this.showTb
            this.$root.$emit('spinner::show')

            const contagemRegressiva = setInterval(() => {
              this.timer--
              if (this.timer <= 0) {
                clearInterval(contagemRegressiva)
                this.timer = 4
              }
            }, 1000)

            setTimeout(() => {
              this.showTb = !this.showTb
              this.$root.$emit('spinner::hide')
            }, 4000)
            break
          }

          default: {
            console.log()
          }
        }
      }
    }
  } /* End methods */,

  async created () {
    try {
      this.user = this.$route.params.user // || { score: { sqr20: 0, trabalho: 0, esgotamento: 0 }, tralhando: true }
      if (this.user.trabalhando) {
        this.addProgress = 100 / 40 // O usuario precisa responder 40 questoes, poderia ser utilizado o tamanho do vetor questions, que se encontra no arquivo questions.js.
      } else {
        this.addProgress = 100 / 20 // Novamente poderia ser utilizado o tamanho, mais, o uso de tamanho de um vetor no js nao é tão confiavel.
      }
      if (!db.questionario) {
        this.$router.push({ name: 'FormScreenData' })
      }
      this.questionarios = db.questionario
      const seq = db.questionario_ordem
      this.ordem = seq[0].ordem

      this.questionarioSelecionado = this.questionarioEmUso
      this.perguntas = this.questionarioSelecionado.perguntas
    } catch (e) {
      this.$router.push({ name: 'FormScreenData' })
    }
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
