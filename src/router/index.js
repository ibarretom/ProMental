import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Home')
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/ds', /* dados iniciais */
    name: 'FormScreenData',
    component: () =>
      import(/* webpackChunkName: "formScreenData" */ '../views/FormScreenData')
  },
  {
    path: '/qs', /* quiz screen */
    name: 'QuizScreen',
    component: () =>
      import(/* webpackChunkName: "quizScreen" */ '../views/QuizScreen')
  }
]

const router = new VueRouter({
  routes
})

export default router
