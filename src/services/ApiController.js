import axios from 'axios'
import Api from './Api'

export default {
	login(credentials) {
		return Api().post('admin/login', credentials).then(response => response.data)
	},

	users(params) {
		return Api().get('admin/users', {
			params
		}).then(response => response.data)
	},

	createUser(params) {
		return Api().post('admin/user',
			params
		).then(response => response.data)
	},

	updateUser(params) {
		return Api().put('admin/user',
			params
		).then(response => response.data)
	},

	removeUser(params) {
		return Api().delete('admin/user',
			{ data: params }
		).then(response => response.data)
	},

	updatePassword(params) {
		return Api().put('admin/user/set-password',
			params
		).then(response => response.data)
	},

	userHistory({ offset, limit, userId }) {
		return axios.all([
			Api().get('admin/user', {
				params: {
					userId
				}
			}),
			Api().get('/admin/user/history', {
				params: {
					offset,
					limit,
					userId
				}
			})
		]).then(response => {
			return { user: response[0].data, history: response[1].data }
		});
	},

	tickers() {
		return Api().get('admin/tickers').then(response => response.data)
	},

	createTicker(params) {
		return Api().post('/admin/tickers',
			params
		).then(response => response.data)
	},

	tickerTest(params) {
		return Api().get('/admin/tickers/test', {
			params
		}).then(response => response.data)
	},

	tickerRemove(params) {
		return Api().delete('admin/tickers',
			{ data: params }
		).then(response => response.data)
	}
}