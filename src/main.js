import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';
import './../public/registerServiceWorker'
import firebase from "./plugins/firebase.js"

Vue.use(VueRouter);
Vue.use(firebase)
const router = new VueRouter({
	routes: [
		{
			path: '/home',
			name: 'Home',
			component: () => 
					import(/* webpackChunkName: "home" */ './screens/Home')
		},
		{
			path: '/',
			redirect: '/home'
		},
		{
			path: '/ds', /*dados iniciais*/
			name: 'FormScreenData',
			component: () => 
					import(/* webpackChunkName: "formScreenData" */ './screens/FormScreenData')
		},
		{
			path: '/qs', /*quiz screen*/
			name: 'QuizScreen',
			component: () => 
					import(/* webpackChunkName: "quizScreen" */ './screens/QuizScreen')
		},
	]
})

Vue.config.productionTip = false

new Vue({
	router,
	vuetify,
	render: h => h(App)
}).$mount('#app')
