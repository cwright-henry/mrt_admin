import axios from 'axios'
import store from '@/store'
import EventBus from '@/events'


export default () => {
	//
	// Calls should now not need pre-flight as they are proxied through server
	// Nope - pre-filght request are only CORs
	//
	const instance = axios.create({
		baseURL: process.env.BASE_URL,
		headers: {
			Authorization: `Bearer ${store.state.login.token}`
		},
		timeout: 10000
	})

	const getErrorCode = (error) => {

		// Check for timeout
		if (!error.response) {
			return { code: 'NETWORK_ERROR' };
		}

		// Handle server error codes 400+
		if (Object.prototype.hasOwnProperty.call(error, 'response') && Object.prototype.hasOwnProperty.call(error.response, 'data')) {
			if (Object.prototype.hasOwnProperty.call(error.response.data, 'code') && error.response.data.code.length > 0) {
				return {
					code: error.response.data.code,
				}
			}
		}

		// Catch all unknowns
		return { code: 'UNKNOWN_ERROR' };
	}

	instance.interceptors.response.use(
		function (response) {
			return response;
		},
		function (error) {
			const { code } = getErrorCode(error);

			switch (code) {
				case 'NETWORK_ERROR':
					EventBus.$emit('error', 'Unable to connect to the server.');
					break;

				case 'UNKNOWN_ERROR':
					EventBus.$emit('error', 'Whoops - Unknown error, contact Bluecrowe team.');
					break;

				// Server Error
				default:
					EventBus.$emit('error', "Unable to process your request");
					break
			}

			// Propagate the message down stream for UI/UX handling
			return Promise.reject({ code });
		}
	);

	return instance;
}