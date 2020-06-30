import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER_DATA (state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      /* Set axios header for our application Bearer it’s just the type of Authentication being used.
      You can read more about it https://developers.google.com/gmail/markup/actions/verifying-bearer-tokens.
      You just need to know that we’re giving Axios the JWT token so the server can use it unlock its protected endpoint. */
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        userData.token
      }`
    }
  },
  actions: {
    register ({ commit }, credentials) {
      return axios
        .post('//localhost:3000/register', credentials)
        .then(({ data }) => {
          console.log('User data are: ', data)
          commit('SET_USER_DATA', data)
        })
    }
  }
})
