import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from './plugins/firebase'

Vue.config.productionTip = false

Vue.use(firebase)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
