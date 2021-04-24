import Vue from 'vue'
import VueRouter from 'vue-router'
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
  },
  {
    path: '/rs', /* quiz screen */
    name: 'ResultScreen',
    component: () =>
      import(/* webpackChunkName: "quizScreen" */ '../views/ResultScreen')
  }
]

const router = new VueRouter({
  routes
})

export default router
