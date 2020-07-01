import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import Register from './views/RegisterUser.vue'
import Login from './views/LoginUser.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
/** Here we are saying if the route being navigated to matches one of our routes (record)
 * Now every time we navigate to a new route ( beforeEach ), we are checking if that route
 * requires authentication and if we have a user logged in. If it does require authentication
 * and we don’t have a user, we’ll redirect to our home route. Otherwise, we can fulfill that
 * route request. https://router.vuejs.org/guide/advanced/meta.html */
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  /** this route requires auth, check if logged in
   * if not, redirect to / page. */
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  }
  next()
})

export default router
