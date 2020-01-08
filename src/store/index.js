import Vue from 'vue'
import Vuex from 'vuex'
import login from './login'
import user from './user'
import users from './users'
import tickers from './tickers'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		login,
		users,
		tickers,
		user
	}
})
