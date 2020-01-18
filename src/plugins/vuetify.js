import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: 'mdi'
	},
	theme: {
		dark: true,
		options: {
			cspNonce: '1234567890abc',
		},
		themes: {
			dark: {
				primary: '#2196F3',			// Blue
				secondary: '#4CAF50',		// Green
				tertiary: '#FFEB3B', 		// Yellow
				error: '#F44336',			// Red
				success: '#4CAF50'			// Green
			}
		}
	}
});
