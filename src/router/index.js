import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Welcome from '@/views/home'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: Welcome
      }
    ]
  }
  ]
})

export default router
