import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    const userString = localStorage.getItem('user') // grab user data from local storage
    if (userString) { // check to see if there is indeed a user
      const userData = JSON.parse(userString) // parse user data into JSON
      this.$store.commit('SET_USER_DATA', userData) // restore user data with Vuex
    }
    /** when there is an error , we’re checking to see if it’s a 401 status code
     * ( which means the user is unauthorized to view the content they’re attempting to load),
     * and if so we use Vue Router to redirect to the homepage, and use Vuex to force a logout.
     * We’ll then return a rejection of the Promise, and pass in the error as the reason for that rejection. */
    axios.interceptors.response.use(
      response => response, // simply return the response
      error => {
        if (error.response.status === 401) { // if we catch a 401 error
          this.$store.dispatch('logout') // force a log out
        }
        return Promise.reject(error) // reject the Promise, with the error as the reason
      }
    )
  },
  render: h => h(App)
}).$mount('#app')
