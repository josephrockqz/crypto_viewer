import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from './views/Landing'
import Exchanges from './views/Exchanges'
import Coin from './views/Coin'
import Search from './views/Search.vue'
import NotFound from './views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing,
    props: true
  },
  {
    path: '/exchange',
    name: 'exchanges',
    component: Exchanges
  },
  {
    path: '/coin/:id',
    name: 'coin',
    component: Coin,
    props: true
  },
  {
    path: '/search/:ele',
    name: 'search',
    component: Search,
    props: true
  },
  {
    path: '/404',
    name: '404',
    component: NotFound
  },
  {
    path: '*',
    redirect: { name: '404' }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
