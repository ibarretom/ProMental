const { firebaseApp } = require('./../plugins/firebase')

async function logarEescrever(resposta) {
  firebaseApp
    .auth()
    .signInAnonymously()
    .then(() => {
      escreverResposta(resposta)
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}
async function escreverResposta(resposta) {
  firebaseApp.firestore().collection("resposta").add(resposta)
    .then(() => {
    })
    .catch((error) => {
      console.error(error)
    });
}

async function colecao(colecao) {
  const snapshot = await firebaseApp.firestore().collection(colecao).get()
  const arrayRetorno = []
  snapshot.docs.forEach((doc) => {
    arrayRetorno.push(doc.data())
  })
  return arrayRetorno
}

let questionario = [
  {
    tipo: 'sqr20',
    scoreCorte: 7,
    tamanho: 20,
    msgTransicao: 'Vamos falar um pouco sobre a sua rotina, ok?',
    respostas: ['nao', 'sim'],
    perguntas: ['Sente-se nervoso(a), tenso(a) ou preocupado(a)?', 'Assusta-se com facilidade?', 'Tem se sentido triste ultimamente?',
      'Tem chorado mais do que de costume?', 'Tem dores de cabeça frequentes?', 'Dorme mal?', "Tem sensações desagradáveis no estômago?",
      'Tem má-digestão?', 'Tem falta de apetite?', 'Tem tremores nas mãos?', 'Cansa-se com facilidade?', 'Tem dificuldade em tomar decisões?',
      'Tem dificuldades para realizar com satisfação suas atividades diárias?', 'Tem dificuldades no serviço (o trabalho é penoso e causa sofrimento)?',
      'Sente-se cansado o tempo todo?', 'Tem dificuldade de pensar com clareza?', 'Sente que é incapaz de desempenhar um papel útil em sua vida?',
      'Você tem perdido o interesse pelas coisas?', 'Tem tido a ideia de acabar com a vida? ', 'Sente que é uma pessoa inútil, sem préstimo?', 'fim']
  },
  {
    tipo: 'trabalho-n1',
    scoreCorte: 4,
    tamanho: 6,
    msgTransicao: 'Vamos falar sobre a dinâmica do seu trabalho, ok?',
    respostas: ['não', 'sim'],
    perguntas: [
      'Você acha que tem de fazer suas tarefas de trabalho com muita rapidez?', 'Você acha que tem de  produzir muito, em pouco tempo?',
      'Você acha que seu trabalho exige demais de você?', 'Você tem pouco tempo para cumprir todas as tarefas? ',
      'O seu trabalho costuma apresentar exigências contraditórias ou discordantes?', 'No seu trabalho, você tem que repetir muitas vezes as mesmas tarefas? ',
      'fim'
    ]
  },
  {
    tipo: 'trabalho-n2',
    scoreCorte: 4,
    tamanho: 5,
    msgTransicao: 'Vamos falar sobre a dinâmica do seu trabalho, ok?',
    respostas: ['sim', 'nao'],
    perguntas: [
      'Você tem possibilidade de aprender coisas novas em seu trabalho?', 'Seu trabalho exige muita habilidade ou conhecimentos especializados?',
      'Seu trabalho exige que você tome iniciativas?', 'Você pode escolher COMO fazer o seu trabalho? ',
      'Você pode escolher O QUE fazer no seu trabalho? ', 'fim'
    ]
  },
  {
    tipo: 'esgotamento',
    scoreCorte: 26,
    tamanho: 9,
    msgTransicao: 'Vamos falar um pouco sobre a sua organização de trabalho, ok?',
    respostas: ['Nunca', 'Poucas vezes', 'Poucas vezes ao mês', '1 x por semana', 'Poucas vezes por semana', 'Sempre'],
    perguntas: ['Sente que o trabalho está te desgastando?', 'Quando termina a jornada de trabalho sinte-se esgotado(a)?',
      'Quando se levanta pela manhã e depara com outra jornada de trabalho, já se sente esgotado?', 'Sinte que esta trabalhando demais?',
      'Sente-se frustrado(a) com o trabalho?', 'Sinte-se como se estivesse no limite das suas possibilidades?',
      'Sente-se emocionalmente decepcionado(a) com o trabalho?', 'Sinte que trabalhar todo o dia com pessoas te cansa?',
      'Sente-se que trabalhar em contato direto com pessoas, todo o dia, te estressa?', 'fim']
  },
]
export default {
  colecao,
  questionario,
  questionario_ordem: null,
  dicas: null,
  logarEescrever
}
