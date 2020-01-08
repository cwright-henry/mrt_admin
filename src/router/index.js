import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Login from '@/views/login/Login'
import App from '@/views/application/App'
import Users from '@/views/users/Router'
import UserList from '@/views/users/UserList'
import User from '@/views/users/user/User'
import TickerList from '@/views/tickers/TickerList'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior(to, from, savedPosition) {
		let position = { x: 0, y: 0 };
		if (savedPosition) {
			position = savedPosition
		}

		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(position)
			}, 300)
		})
	},
	routes: [
		{
			path: '/',
			name: 'admin',
			component: App,
			redirect: '/users',
			beforeEnter(to, from, next) {
				store.commit('login/initialize');
				if (!store.getters['login/isAuthenticated']) {
					next('/login')
				}
				else {
					next()
				}
			},
			children: [
				{
					path: 'users',
					component: Users,
					children: [
						{
							path: '',
							name: 'UserList',
							component: UserList,
							meta: {
								transitionName: 'slide'
							}
						},
						{
							path: ':id',
							name: 'UserDetails',
							component: User,
							props: (route) => ({ userId: route.params.id }),
							meta: {
								transitionName: 'slide'
							}
						},
					]
				},
				{
					path: 'tickers',
					name: 'Tickers',
					component: TickerList
				}
			]
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '*',
			redirect: '/'
		}
	]
})
