import ApiController from '@/services/ApiController'

const PAGE_SIZE = 20;

export default {
	namespaced: true,

	state: {
		user: {},
		history: null,
		offset: 1,
		isLoading: false,
		hasMore: false,
	},
	mutations: {
		setUser(state, user) {
			state.user = user
		},

		setHistory(state, history) {
			state.history = history;
		},

		isLoading(state, isLoading) {
			state.isLoading = isLoading;
		},

		hasMore(state, hasMore) {
			state.hasMore = hasMore;
		}
	},
	actions: {
		async load({ commit, state }, userId) {
			try {
				commit('isLoading', true);
				const { user, history } = await ApiController.userHistory({
					offset: state.offset,
					limit: PAGE_SIZE,
					userId
				});
				commit('setUser', user);
				commit('setHistory', history.docs)
				commit('hasMore', history.hasNextPage);
			}
			finally {
				commit('isLoading', false);
			}
		},

		async create({ commit }, params) {
			try {
				commit('isLoading', true);
				const { user } = await ApiController.createUser({
					params
				});
				commit('setUser', user);
				commit('setHistory', null);
				commit('hasMore', false);
			}
			finally {
				commit('isLoading', false);
			}
		},

		async update({ commit, dispatch }, params) {
			const user = await ApiController.updateUser(params);
			commit('setUser', user);
			dispatch('users/load', null, { root: true })
		},

		async setPassword({ commit, dispatch }, params) {
			const user = await ApiController.updatePassword(params);
			commit('setUser', user);
			dispatch('users/load', null, { root: true })
		},

		async remove({ dispatch }, params) {
			await ApiController.removeUser(params);
			dispatch('users/load', null, { root: true })
		}
	}
}