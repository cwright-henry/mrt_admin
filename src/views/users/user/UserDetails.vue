<template>
	<div class="mrt-admin--details">
		<div class="mrt-admin--details-user">
			<div class="mrt-admin--info">
				<label>Email</label>
				<v-text-field readonly label hide-details outlined v-model="email" dense></v-text-field>
			</div>
			<div class="mrt-admin--info">
				<label>First Name</label>
				<v-text-field readonly label hide-details outlined v-model="firstName" dense></v-text-field>
			</div>
			<div class="mrt-admin--info">
				<label>Last Name</label>
				<v-text-field readonly label hide-details outlined v-model="lastName" dense></v-text-field>
			</div>
			<div class="mrt-admin--info">
				<label>Company Name</label>
				<v-text-field readonly label hide-details outlined v-model="companyName" dense></v-text-field>
			</div>
			<div class="mrt-admin--info">
				<label>Password</label>
				<div>*******************************</div>
			</div>
			<div class="mrt-admin--info">
				<label>Access Revoked</label>
				<div>{{tokenStatus ? 'Yes' : 'No'}}</div>
			</div>
			<div class="mrt-admin--info">
				<label>Is Adminstrator</label>
				<div>{{isAdmin ? 'Yes' : 'No'}}</div>
			</div>
			<div class="mrt-admin--info">
				<label>Last Updated</label>
				<div>{{lastUpdate | date-long}}</div>
			</div>
			<div class="mrt-admin--info">
				<label>Created</label>
				<div>{{created | date-long}}</div>
			</div>
		</div>
		<div class="mrt-admin--actions">
			<mrt-edit-password-dialog :user="user.details" />
			<mrt-edit-user-dialog :user="user.details" />
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import mrtEditUserDialog from "./EditUserDialog";
import mrtEditPasswordDialog from "./EditPasswordDialog";

export default {
	data() {
		return {
			firstName: null,
			lastName: null,
			companyName: null,
			email: null,
			tokenStatus: false,
			isAdmin: null,
			created: null,
			lastUpdate: null
		};
	},
	components: {
		mrtEditUserDialog,
		mrtEditPasswordDialog
	},
	computed: {
		...mapState("user", ["user", "isLoading"])
	},
	watch: {
		user: {
			handler() {
				if (this.user.details) {
					this.parseUser();
				}
			},
			immediate: true
		}
	},
	methods: {
		parseUser() {
			this.firstName = this.user.details.firstName;
			this.lastName = this.user.details.lastName;
			this.email = this.user.details.email;
			this.companyName = this.user.details.companyName;
			this.created = this.user.details.created;
			this.lastUpdate = this.user.details.lastUpdate;
			this.tokenStatus = this.user.details.tokenRevoked;
			this.isAdmin = this.user.details.role === "admin";
		}
	}
};
</script>

<style lang="less" scoped>
.mrt-admin--details {
	h1 {
		font-weight: 300;
	}
	padding: 0 16px;
	.mrt-admin--actions {
		display: flex;
		justify-content: space-between;
		border-top: 1px solid #616161;
		padding: 16px 0;
		margin: 12px 0 0 0;
	}
	.mrt-admin--info {
		display: flex;
		align-items: center;
		margin: 24px 0;
		label {
			width: 160px;
			color: #e0e0e0;
			font-weight: 300;
			text-transform: uppercase;
			font-size: 14px;
		}
		.v-input--selection-controls {
			margin: 0 !important;
		}
	}
}
@media screen and (max-width: 600px) {
	.mrt-admin--details {
		.mrt-admin--details-user {
			width: 100%;
			.mrt-admin--info {
				flex-direction: column;
				align-items: flex-start;
				label {
					margin: 0 0 4px;
					font-size: 13px;
				}
				.v-input {
					width: 100%;
				}
			}
		}
	}
}
</style>