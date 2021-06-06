import Vue from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import vuetify from '@/plugins/vuetify'
import firebase from '@/plugins/firebase'
import loadComponet from '@/components/LoadScreen.vue'
import cookies from 'vue-cookies'
import {firestorePlugin} from 'vuefire';

Vue.use (firestorePlugin);

Vue.use(cookies)
Vue.$cookies.config('5h')
Vue.component('load', loadComponet)
Vue.config.productionTip = false

Vue.use(firebase)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
