<template>
	<div class="mrt-admin--users">
		<transition
			:name="transitionName"
			@afterLeave="afterLeave"
			@beforeEnter="beforeEnter"
			@beforeLeave="beforeLeave"
			@afterEnter="afterEnter"
		>
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</transition>
	</div>
</template>

<script>
const DEFAULT_TRANSITION = "fade";
export default {
	data() {
		return {
			transitionName: null,
			prevHeight: 0
		};
	},
	created() {
		this.$router.beforeEach((to, from, next) => {
			let transitionName =
				to.meta.transitionName || from.meta.transitionName;

			if (transitionName === "slide") {
				const toDepth = to.path.split("/").length;
				const fromDepth = from.path.split("/").length;
				transitionName =
					toDepth < fromDepth ? "slide-right" : "slide-left";
			}

			this.transitionName = transitionName || DEFAULT_TRANSITION;
			next();
		});
	},
	methods: {
		beforeLeave(element) {
			element.style.position = "absolute";
			if (element.className === "mrt-admin--users") {
				this.$store.commit("users/isAnimating", true);
			}
		},
		beforeEnter(element) {
			if (element.className === "mrt-admin--users") {
				this.$store.commit("users/isAnimating", true);
			}
		},
		afterEnter(element) {
			element.style.position = "relative";
			if (element.className === "mrt-admin--users") {
				this.$store.commit("users/isAnimating", false);
			}
		},
		afterLeave(element) {
			if (element.className === "mrt-admin--users") {
				this.$store.commit("users/isAnimating", false);
			}
		}
	}
};
</script>

<style lang="less" scoped>
.mrt-admin--users {
	position: relative;
	width: 100%;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
	transition-duration: 0.475s;
	transition-property: all;
	transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
	overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
	opacity: 0;
	transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
	opacity: 0;
	transform: translate(-100%, 0);
}
</style>