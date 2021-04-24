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
  questionario: null,
  questionario_ordem: null,
  colecao
}
