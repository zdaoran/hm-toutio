import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/notfound'
import Setting from '@/views/setting'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
import Fans from '@/views/fans'
import store from '@/store'
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
    component: Home,
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: Welcome
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/setting',
        name: 'setting',
        component: Setting
      },
      {
        path: '/image',
        name: 'image',
        component: Image
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      },
      {
        path: '/comment',
        name: 'comment',
        component: Comment
      },
      {
        path: '/fans',
        name: 'fans',
        component: Fans
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getUser().token) {
    return next('/login')
  }
  next()
})

export default router
