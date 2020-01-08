import ApiController from '@/services/ApiController'

export default {
	namespaced: true,

	state: {
		tickers: [],
		isLoading: false
	},
	mutations: {
		setTickers(state, tickers) {
			state.tickers = tickers
		},

		isLoading(state, isLoading) {
			state.isLoading = isLoading;
		}
	},
	actions: {
		async load({ commit }) {
			try {
				commit('isLoading', true);
				const data = await ApiController.tickers();
				commit('setTickers', Object.freeze(data.data));
			}
			finally {
				commit('isLoading', false);
			}
		},

		async create({ dispatch }, params) {
			await ApiController.createTicker(params);
			dispatch('load')
		},

		async delete({ dispatch }, params) {
			await ApiController.tickerRemove(params);
			dispatch('load')
		}
	}
}