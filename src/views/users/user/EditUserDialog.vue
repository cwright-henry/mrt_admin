<template>
	<v-dialog v-model="dialog" width="500" :fullscreen="$vuetify.breakpoint.smAndDown">
		<template v-slot:activator="{ on }">
			<v-btn color="primary" v-on="on" small>Edit User</v-btn>
		</template>
		<v-card class="mrt-admin--new-user">
			<v-card-title class="headline grey">
				<v-icon size="28" color="#fff">mdi-account</v-icon>Edit Member
				<v-spacer></v-spacer>
				<v-btn icon @click.stop="dialog=false">
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-card-title>
			<v-card-text class="mt-4">
				<div class="mrt-admin--info">
					<label>
						<sup>*</sup>First Name
					</label>
					<v-text-field
						label
						outlined
						autofocus
						:error-messages="errorMessages.firstName"
						required
						max-length="128"
						v-model="firstName"
						dense
					></v-text-field>
				</div>
				<div class="mrt-admin--info">
					<label>
						<sup>*</sup>Last Name
					</label>
					<v-text-field
						label
						outlined
						:error-messages="errorMessages.lastName"
						required
						max-length="128"
						v-model="lastName"
						dense
					></v-text-field>
				</div>
				<div class="mrt-admin--info">
					<label>
						<sup>*</sup>Company Name
					</label>
					<v-text-field
						label
						:error-messages="errorMessages.companyName"
						required
						outlined
						max-length="128"
						v-model="companyName"
						dense
					></v-text-field>
				</div>
				<div class="mrt-admin--info">
					<label>
						<sup>*</sup>Email
					</label>
					<v-text-field
						label
						:error-messages="errorMessages.email"
						required
						outlined
						max-length="256"
						v-model="email"
						dense
					></v-text-field>
				</div>
				<div class="mrt-admin--info">
					<label>Revoke Access</label>
					<v-checkbox v-model="tokenStatus" :disabled="isAdmin" color="primary" hide-details label></v-checkbox>
				</div>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions class="px-6 py-4">
				<v-btn
					color="primary"
					:disabled="isUpdating || isAdmin"
					:loading="isUpdating"
					@click="remove"
					outlined
					small
				>Remove User</v-btn>
				<v-spacer></v-spacer>
				<v-btn
					color="primary"
					:disabled="isUpdating"
					:loading="isUpdating"
					small
					@click="create"
				>Update User</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import EventBus from "@/events";

export default {
	props: {
		user: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			dialog: false,
			email: "",
			firstName: "",
			lastName: "",
			companyName: "",
			tokenStatus: false,
			isUpdating: false,
			isAdmin: false,
			errorMessages: {
				firstName: null,
				lastName: null,
				companyName: null,
				email: null
			}
		};
	},
	watch: {
		user: {
			handler: function() {
				this.firstName = this.user.firstName;
				this.lastName = this.user.lastName;
				this.companyName = this.user.companyName;
				this.email = this.user.email;
				this.tokenStatus = this.user.tokenRevoked;
				this.isAdmin = this.user.role === "admin";
			},
			immediate: true
		},
		dialog() {
			if (!this.dialog) {
				this.reset();
			}
		},
		firstName(val) {
			if (val) {
				this.errorMessages.firstName = null;
			}
		},
		lastName(val) {
			if (val) {
				this.errorMessages.lastName = null;
			}
		},
		companyName(val) {
			if (val) {
				this.errorMessages.companyName = null;
			}
		},
		email(val) {
			if (val) {
				this.errorMessages.email = null;
			}
		}
	},
	methods: {
		reset() {
			this.resetErrorMessages();
		},

		isFormValid() {
			this.resetErrorMessages();
			let isError = false;
			if (this.firstName.trim() === "") {
				isError = true;
				this.errorMessages.firstName =
					"First Name is required for emailing";
			}
			if (this.lastName.trim() === "") {
				isError = true;
				this.errorMessages.lastName =
					"Last Name is required for emailing";
			}
			if (this.companyName.trim() === "") {
				isError = true;
				this.errorMessages.companyName =
					"Company Name is required for emailing";
			}
			if (this.email.trim() === "") {
				isError = true;
				this.errorMessages.email =
					"Email is required for security and emailing";
			}

			return isError;
		},

		async create() {
			if (!this.isFormValid()) {
				try {
					this.isUpdating = true;
					await this.$store.dispatch("user/update", {
						userId: this.user["_id"],
						firstName: this.firstName,
						lastName: this.lastName,
						companyName: this.companyName,
						email: this.email,
						status: this.tokenStatus
					});
					this.isUpdating = false;
					EventBus.$emit("success", "Member updated!");
					this.dialog = false;
				} catch (e) {
					// Vaildation errors are instance of array
					// otherwise a string - EEK!
					if (e.code instanceof Array) {
						for (let i = 0; i < e.code.length; i++) {
							this.errorMessages[e.code[i]["field"]] =
								e.code[i]["msg"];
						}
					} else {
						if (e.code === "DUPLICATE_NAME") {
							this.errorMessages.email =
								"Email address already exists";
						}
					}
				}
			}
		},

		async remove() {
			try {
				this.isUpdating = true;
				await this.$store.dispatch("user/remove", {
					userId: this.user["_id"]
				});
				EventBus.$emit("success", "Member removed!");
				this.dialog = false;
				this.$router.replace({
					path: "/users"
				});
			} finally {
				this.isUpdating = false;
			}
		},

		resetErrorMessages() {
			this.errorMessages = {
				firstName: null,
				lastName: null,
				companyName: null,
				email: null,
				password: null
			};
		}
	}
};
</script>

<style lang="less">
.mrt-admin--new-user {
	.headline {
		color: #fff !important;
		font-weight: 300 !important;
		i {
			margin: 0 4px 0 0;
		}
	}
	sup {
		color: #ffeb3b;
	}
}
</style>