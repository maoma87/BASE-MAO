import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Edicion from './views/Edicion.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/edicion',
      name: 'edicion',
      component: Edicion
    }
  ]
})
