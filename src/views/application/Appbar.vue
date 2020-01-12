<template>
	<v-app-bar app class="mrt-admin--appbar">
		<v-app-bar-nav-icon @click.stop="toggleNavigation"></v-app-bar-nav-icon>
		<h1>MRT Administration</h1>
		<v-spacer></v-spacer>
		<div class="user">
			<v-icon color="tertiary" size="36">mdi-account-box</v-icon>
			<div class="user-info">
				<span class="name">{{ userName }}</span>
				<span class="company">{{ companyName }}</span>
			</div>
		</div>
	</v-app-bar>
</template>

<script>
import EventBus from "@/events";

export default {
	computed: {
		userName() {
			return this.$store.state.login.user.email;
		},
		companyName() {
			return this.$store.state.login.user.companyName;
		}
	},
	methods: {
		toggleNavigation() {
			EventBus.$emit("toggleNavigation");
		}
	}
};
</script>

<style lang="less">
.mrt-admin--appbar {
	h1 {
		font-size: 22px;
		color: #fff;
		font-weight: 300;
	}
	.user {
		display: flex;
		align-items: center;
		font-size: 13px;
		.user-info {
			display: flex;
			flex-direction: column;
			margin: 0 0 0 12px;
			line-height: 1.2;
			.name {
				color: #fff;
			}
			.company {
				color: #fff176;
				font-weight: 300;
			}
		}
	}
}
@media screen and (max-width: 600px) {
	.mrt-admin--appbar {
		.user {
			display: none;
		}
	}
}
</style>