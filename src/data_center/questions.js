const { firebaseApp } = require('./../plugins/firebase')
async function colecao (colecao) {
  const snapshot = await firebaseApp.firestore().collection(colecao).get()
  const arrayRetorno = []
  snapshot.docs.forEach((doc) => {
    arrayRetorno.push(doc.data())
  })
  return arrayRetorno
}

export default {
  questionario: colecao('questionario'),
  questionary: {
    part: 0,
    askIndex: 0,
    questions: null
  },

  healthTips: {
    active: false,
    tips: []
  },

  lastQuestion: 'fim',
  colecao
}
