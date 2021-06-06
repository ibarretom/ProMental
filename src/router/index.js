import Vue from 'vue'
import VueRouter from 'vue-router'

import ResultScreen from '../views/ResultScreen'

Vue.use(VueRouter)

const routes = [
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
    path: '/cadastro', /* dados iniciais */
    name: 'FormScreenData',
    component: () =>
      import(/* webpackChunkName: "formScreenData" */ '../views/FormScreenData')
  },
  {
    path: '/questionario', /* quiz screen */
    name: 'QuizScreen',
    component: () =>
      import(/* webpackChunkName: "quizScreen" */ '../views/QuizScreen')
  },
  {
    path: '/resultado', /* quiz screen */
    name: 'ResultScreen',
    component: ResultScreen
  },
  {
    path: "*",
    redirect: "/"
  }
]

const router = new VueRouter({
  routes
})

export default router
