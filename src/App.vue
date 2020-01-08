<template>
	<div id="app" v-cloak>
		<v-app>
			<router-view></router-view>
			<v-snackbar v-model="errormsg" :top="true" :timeout="timeout" color="#F44336">
				{{ text }}
				<v-btn text @click="error = false">Close</v-btn>
			</v-snackbar>
			<v-snackbar v-model="successmsg" :top="true" :timeout="timeout" color="#4CAF50">
				{{ text }}
				<v-btn text @click="error = false">Close</v-btn>
			</v-snackbar>
		</v-app>
	</div>
</template>

<script>
import EventBus from "@/events";
export default {
	name: "MrtAdmin",
	data() {
		return {
			errormsg: false,
			successmsg: false,
			timeout: 10000, // Allow 10 seconds to read error message
			text: ""
		};
	},
	mounted() {
		EventBus.$on("error", reason => {
			this.errormsg = true;
			this.text = reason;
			this.timeout = 10000;
		});
		EventBus.$on("success", reason => {
			this.successmsg = true;
			this.text = reason;
			this.timeout = 5000;
		});
	}
};
</script>

<style lang="less">
html,
body {
	min-height: 100%;
	background-color: #303030;
}
ul {
	padding: 0 !important;
	margin: 0;
	list-style: none;
}
:root {
	--link-color: #2196f3;
	--primary-color: #2196f3;
	--secondary-color: #4caf50;
	--tertiary-color: #ffeb3b;
}

a {
	text-decoration: none;
	color: var(--link-color) !important;
	i {
		color: var(--link-color) !important;
	}
}
.container--fluid {
	position: relative;
}
.container {
	max-width: 1785px !important;
}
.fade-enter-active,
.fade-leave-active {
	transition-duration: 0.475s;
	transition-property: opacity;
	transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
	position: absolute !important;
	width: calc(100% - 24px) !important;
}
</style>

