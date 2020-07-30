import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Cinemas from '@/components/Cinemas'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Repertoire from '@/components/Repertoire'
import Details from '@/components/Details'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/cinemas',
      name: 'Cinemas',
      component: Cinemas
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }, {
      path: '/repertoire',
      name: 'Repertoire',
      component: Repertoire
    }, {
      path: '/:name',
      name: 'Details',
      component: Details
    }
  ]
})
