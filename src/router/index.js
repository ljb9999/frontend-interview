import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/page/selfcenter/register'
import login from '@/page/selfcenter/login'
import secretary from '@/page/selfcenter/secretary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'secretary',
      component: secretary
    }
  ]
})
