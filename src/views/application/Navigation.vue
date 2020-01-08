<template>
	<v-navigation-drawer permanent app class="mrt-admin--navigation">
		<v-list dense>
			<div class="logo">
				<img src="@/assets/logo.svg" height="98" />
				<em>Bluecrowe Analytics</em>
			</div>
			<router-link to="/users">
				<div class="menu-item">
					<v-icon>mdi-account-multiple</v-icon>
					<div>Members</div>
				</div>
			</router-link>
			<router-link to="/tickers">
				<div class="menu-item">
					<v-icon>mdi-finance</v-icon>
					<div>Tickers</div>
				</div>
			</router-link>
			<div class="menu-item" @click="logout">
				<v-icon>mdi-logout</v-icon>
				<div>Logout</div>
			</div>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	data() {
		return {
			items: [
				{ title: "Users", icon: "mdi-view-dashboard" },
				{ title: "Dictionary", icon: "mdi-image" }
			],
			right: null
		};
	},
	methods: {
		async logout() {
			await this.$store.dispatch("login/logout");
			this.$router.push("/login");
		}
	}
};
</script>

<style lang="less">
.mrt-admin--navigation {
	.router-link-active {
		.menu-item {
			color: #fff;
			font-weight: 500;
			background-color: #757575 !important;
			i {
				color: #fff !important;
			}
		}
	}
	.logo {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-bottom: 1px solid #616161;
		padding: 12px 0;
		em {
			font-size: 14px;
			font-weight: 400;
			color: #fff;
		}
	}
	.menu-item {
		display: flex;
		padding: 16px 0 16px 12px;
		align-items: center;
		cursor: pointer;
		font-size: 16px;
		font-weight: 300;
		border-bottom: 1px solid #616161;
		color: var(--link-color);
		i {
			color: var(--light-gray);
			margin: 0 8px 0 0;
		}
	}
}
</style>