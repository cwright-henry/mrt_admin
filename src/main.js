import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import 'animate.css/animate.css'
import EventBus from './events'

Vue.config.productionTip = false

const dateOptionsLong = {
	year: 'numeric', month: 'short', day: 'numeric',
	hour: 'numeric', minute: 'numeric', second: 'numeric',
	hour12: false,
	timeZone: 'UTC',
	timeZoneName: 'short'
};

const dateOptionsCompact = {
	year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
};

Vue.filter('number', function (value, precision) {
	if (value !== null && !isNaN(value)) {
		precision = precision !== undefined ? precision : 3;
		return new Intl.NumberFormat(navigator.language, { maximumFractionDigits: precision, minimumFractionDigits: precision }).format(value);
	}
	return ''
});

Vue.filter('date-long', function (value) {
	if (value)
		return new Intl.DateTimeFormat(navigator.language, dateOptionsLong).format(value);
	return ''
});

Vue.filter('date-short', function (value) {
	if (value && !isNaN(value))
		return new Intl.DateTimeFormat(navigator.language, dateOptionsCompact).format(value);
	return value;
});

Vue.config.errorHandler = function (err, vm, info) {
	EventBus.$emit('error', `Vue Error - ${err} - ${info}`);
}

window.onerror = function (msg, url, line, col, error) {
	EventBus.$emit('error', `Window Error - ${msg} - ${line} - ${col} - ${error}`);
}

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
