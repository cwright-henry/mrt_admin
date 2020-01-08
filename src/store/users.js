import ApiController from '@/services/ApiController'

const PAGE_SIZE = 200;

export default {
	namespaced: true,

	state: {
		users: [],
		query: null,
		offset: 1,
		isLoading: false,
		hasMore: false,
		isAnimating: false
	},
	mutations: {
		setUsers(state, users) {
			state.users = users
		},

		setQuery(state, query) {
			state.query = query;
		},

		setOffset(state, offset) {
			state.offset = offset;
		},

		isLoading(state, isLoading) {
			state.isLoading = isLoading;
		},

		hasMore(state, hasMore) {
			state.hasMore = hasMore;
		},

		isAnimating(state, isAnimating) {
			state.isAnimating = isAnimating;
		}
	},
	actions: {
		async load({ commit, state }) {
			try {
				commit('isLoading', true);
				const data = await ApiController.users({
					offset: state.offset,
					limit: PAGE_SIZE,
					search: state.query
				});
				commit('setUsers', Object.freeze(data.docs));
				commit('hasMore', data.hasNextPage);
			}
			finally {
				commit('isLoading', false);
			}
		},

		async create({ commit, dispatch }, params) {
			try {
				commit('isLoading', true);
				await ApiController.createUser(params);
				commit('setQuery', null)
				commit('setOffset', 1)
				dispatch('load')
			}
			finally {
				commit('isLoading', false);
			}
		}
	}
}