<template>
  <v-container
    class="d-flex flex-column justify-space-between"
    style="height: 100vh"
  >
    <div class="">
      <v-img
        class="pic-container rounded-lg"
        :app-atribuicao="exibicao.atribuicao"
        contain
        :src="require(`@/assets/dicas/${exibicao.img}.svg`)"
      ></v-img>
      <h2 :class="`text-center ${exibicao.color}  mt-2 rounded-lg white--text`">
        {{ exibicao.titulo }}
      </h2>
      <article class="mt-4" v-html="exibicao.descricao"></article>
    </div>
    <v-container>
      <v-row class="border-chat justify-space-around pa-2 flex-wrap" no-gutters>
        <template v-for="(resposta, index) in opcoesExibidas">
          <div class="col-12 col-md-3 col-sm-3 mx-1 my-1" :key="index">
            <v-btn
              block
              class="rounded-xl"
              color="primary"
              @click="escolherOpcao(resposta)"
            >
              {{ resposta }}
            </v-btn>
          </div>
        </template>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
// import message from '@/components/Message'
import db from "@/data_center/questions.js";
export default {
  // components: { message },
  data: () => ({
    exibicao: {},
    dicas: [],
    indexDicas: 0,
    opcoesExibidas: [],
    opcoesFinalizacao: [],
    respostaDicas: ["Ok", "Já faço", "Vou tentar", "encerrar"],
    encerrar: ["dicas de saude", "encerrar"]
  }),
  watch: {
    exibicao(atual, antiga) {
      if (atual.titulo === "Agradecemos sua Participação") {
        this.opcoesExibidas = this.encerrar;
        this.indexDicas = 0;
      }
    }
  },
  methods: {
    escolherOpcao(resposta) {
      const resp1 = resposta === "Já faço";
      const resp2 = resposta === "Vou tentar";
      const resp3 = resposta === "Ok";
      if (resposta === "dicas de saúde") {
        this.opcoesExibidas = this.respostaDicas;
        this.exibicao = this.dicas[this.indexDicas];
      } else if (resposta === "encerrar") {
        this.$root.$emit("spinner::show");
        this.$router.push({ name: "Home" });
      } else if (resposta === "unidades de saúde") {
        window.open("https://www.google.com.br/maps/search/hospitais/");
      } else if (resp1 || resp2 || resp3) {
        this.indexDicas < this.dicas.length ? this.indexDicas++ : console.log();
        this.exibicao = this.dicas[this.indexDicas];
      }
    },
    verificaEstresse(diagnostico) {
      if (diagnostico == "true" || diagnostico === true) {
        this.opcoesFinalizacao = [
          "dicas de saúde",
          "unidades de saúde",
          "encerrar"
        ];
        this.exibicao = {
          titulo: "Você parece um pouco estressado(a)",
          descricao:
            "Vamos te dar umas dicas de saúde e bem estar ok? <br> Não se esqueça de consultar as unidades de saúde, caso precise.",
          color: "error",
          img: "estresse",
          atribuicao: "freepik"
        };
        this.encerrar = this.opcoesFinalizacao;
        this.$cookies.set("estressado", diagnostico);
      } else {
        this.opcoesFinalizacao = ["dicas de saúde", "encerrar"];
        this.exibicao = {
          titulo: "Você parece bem!",
          descricao:
            "Para que continue assim, não se esqueça de praticar hábitos saudáveis.",
          color: "info",
          img: "saude",
          atribuicao: "esdesignisms"
        };
        this.$cookies.set("estressado", diagnostico);
      }
    }
  },
  beforeMount() {
    this.opcoesExibidas = this.opcoesFinalizacao;

    this.$root.$emit("spinner::hide");
  },
  async created() {
    let estresse;
    try {
      const scores = this.$route.params.scores;
      estresse = scores.sqr20 || scores.trabalho || scores.esgotamento;
      this.verificaEstresse(estresse);
    } catch (e) {
      estresse = this.$cookies.get("estressado");
      if (estresse === "false" || estresse === "true") {
        this.verificaEstresse(estresse);
      } else {
        this.$router.push({ name: "Home" });
      }
    }
    localStorage.removeItem("user_progress");
    const dicas = await db.colecao("dicas-de-saude");

    dicas.forEach(dica => {
      this.dicas.push(dica);
    });
    const aboutPensu = `<strong><i> Visite nossas redes sociais!! </i></strong>  
    <br/><br/> <a href="https://youtube.com/c/Espa%C3%A7oAbertoparaSa%C3%BAdeUFF"><strong style="color: #c4302b;" > <i class="fab fa-youtube"></i> Youtube:</strong> Espaço Aberto para Saúde</a> 
    <br/><br/> <a href="https://www.facebook.com/pg/EspacoAbertoParaSaude"><strong style="color: #3b5998";> <i class="fab fa-facebook"></i> Facebook:</strong> <i>@EspacoAbertoParaSaude</i></a>
    <br/><br/> <a href="https://www.instagram.com/espacoabertosaudeuff/"><strong style="color: #3f729b";> <i class="fab fa-instagram"></i> Instagram:</strong> <i>@espacoabertosaudeuff</i></a>`;
    this.dicas.push({
      titulo: "Agradecemos sua Participação",
      descricao: aboutPensu,
      img: "pp",
      atribuicao: "PESNU UFF",
      color: "primary"
    });
  }
};
</script>
<style scoped>
@media (max-width: 600px) {
  .pic-container {
    height: 25vh;
  }
}

@media (min-width: 600px) {
  .pic-container {
    height: 35vh;
  }
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
</style>
