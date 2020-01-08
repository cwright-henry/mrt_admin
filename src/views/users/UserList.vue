<template>
	<div class="mrt-admin--users">
		<v-text-field
			v-model="search"
			placeholder="Search Lastname"
			@keyup.enter="searchUsers"
			@click:clear="loadUsers"
			:disabled="isLoading"
			outlined
			flat
			dense
			hide-details
			clearable
		></v-text-field>
		<transition-group tag="ul" @enter="enter" :css="false">
			<template v-if="users.length > 0">
				<li v-for="user in users" :key="user._id">
					<router-link :to="`/users/${user._id}`">
						<mrt-user-summary :user="user"></mrt-user-summary>
					</router-link>
				</li>
			</template>
		</transition-group>
		<div v-if="users.length === 0" class="mrt-admin--users-no-result">No matching records found!</div>
		<mrt-new-user-dialog />
	</div>
</template>

<script>
import { mapState } from "vuex";
import mrtUserSummary from "./UserSummary";
import mrtNewUserDialog from "./NewUserDialog";

const ANIMATION_IN = "zoomIn";

export default {
	data() {
		return {
			search: null,
			dialog: false
		};
	},
	computed: {
		...mapState("users", ["users", "isLoading", "isAnimating"])
	},
	components: {
		mrtUserSummary,
		mrtNewUserDialog
	},
	mounted() {
		this.loadUsers();
	},
	methods: {
		loadUsers() {
			this.$store.commit("users/setQuery", null);
			this.$store.dispatch("users/load");
		},

		searchUsers() {
			this.$store.commit("users/setQuery", this.search);
			this.$store.dispatch("users/load");
		},

		enter(el, done) {
			el.classList.add("animated", ANIMATION_IN);
			el.style.animationDuration = "0.75s";

			const handleAnimationEnd = () => {
				el.classList.remove("animated", ANIMATION_IN);
				el.removeEventListener("animationend", handleAnimationEnd);
				done();
			};
			el.addEventListener("animationend", handleAnimationEnd);
		}
	}
};
</script>

<style lang="less" scoped>
.mrt-admin--users {
	width: 100%;
	ul {
		margin: 16px 0;
		border-radius: 4px;
		overflow-y: hidden;
		li {
			border: solid #616161;
			border-width: 1px 1px 0px 1px;
			background-color: #424242;
			&:first-child {
				border-radius: 4px 4px 0 0;
			}
			&:last-child {
				border-radius: 0 0 4px 4px;
				border-width: 1px 1px 1px 1px;
			}
		}
	}
	.mrt-admin--users-no-result {
		color: #fff;
		display: flex;
		justify-content: center;
		align-content: center;
		height: 100px;
		color: #757575;
	}
}
</style>