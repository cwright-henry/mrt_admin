<template>
	<div class="mrt-admin--user pt-4">
		<div class="loading" v-if="isLoading">
			<v-progress-circular :size="60" :width="2" indeterminate color="#FFEB3B"></v-progress-circular>
		</div>
		<div v-else>
			<div class="mrt-admin--nav">
				<v-icon size="28" @click="goBack" dark color="primary">mdi-arrow-left</v-icon>
			</div>
			<v-card class="mrt-admin--card">
				<v-toolbar dense flat>User Details</v-toolbar>
				<mrt-user-details />
			</v-card>
			<v-card class="mrt-admin--card">
				<v-toolbar dense flat>Login History</v-toolbar>
				<mrt-user-history />
			</v-card>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import mrtUserDetails from "./UserDetails";
import mrtUserHistory from "./UserHistory";

export default {
	components: {
		mrtUserDetails,
		mrtUserHistory
	},
	props: {
		userId: {
			type: String,
			default: null
		}
	},
	computed: {
		...mapState("user", ["user", "history", "isLoading"])
	},
	watch: {
		userId: {
			handler() {
				if (this.userId) {
					this.load();
				}
			},
			immediate: true
		}
	},
	methods: {
		load() {
			this.$store.dispatch("user/load", this.userId);
		},

		goBack() {
			this.$router.go(-1);
		}
	}
};
</script>

<style lang="less">
.mrt-admin--user {
	display: flex;
	flex-direction: column;
	width: 100%;
	.mrt-admin--nav {
		display: flex;
		justify-content: flex-start;
		margin: -8px 0 8px 0;
	}
	.mrt-admin--card {
		background-color: #212121;
		color: #ffffff;
		margin: 0 0 32px;
	}
	.loading {
		height: 250px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>