<template>
	<v-dialog v-model="dialog" width="600">
		<template v-slot:activator="{ on }">
			<v-btn v-show="!isAnimating" bottom right fixed color="primary" v-on="on" fab>
				<v-icon>mdi-playlist-plus</v-icon>
			</v-btn>
		</template>
		<v-card class="mrt-admin--new-user">
			<v-card-title class="headline grey">
				<v-icon size="28" color="#fff">mdi-account</v-icon>New Member
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
					<label>
						<sup>*</sup>Password
					</label>
					<v-text-field
						label
						:error-messages="errorMessages.password"
						hint="Between 8 and 32 characters"
						required
						outlined
						max-length="32"
						v-model="password"
						dense
					></v-text-field>
				</div>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions class="px-6 py-4">
				<v-spacer></v-spacer>
				<v-btn
					color="primary"
					:disabled="isCreating"
					:loading="isCreating"
					small
					@click="create"
				>Create User</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapState } from "vuex";
import EventBus from "@/events";

export default {
	data() {
		return {
			dialog: false,
			email: "",
			firstName: "",
			lastName: "",
			companyName: "",
			password: "",
			isCreating: false,
			errorMessages: {
				firstName: null,
				lastName: null,
				companyName: null,
				email: null,
				password: null
			}
		};
	},
	computed: {
		...mapState("users", ["isAnimating"])
	},
	watch: {
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
		},
		password(val) {
			if (val && val.length >= 8 && val.length <= 32) {
				this.errorMessages.password = null;
			}
		}
	},
	methods: {
		reset() {
			this.firstName = "";
			this.lastName = "";
			this.companyName = "";
			this.email = "";
			this.password = "";
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
			const pw = this.password.trim();
			if (pw.length < 8) {
				isError = true;
				this.errorMessages.password =
					"Password is required for security and must be between 8 and 32 characters";
			}

			return isError;
		},

		async create() {
			if (!this.isFormValid()) {
				try {
					this.isCreating = true;
					await this.$store.dispatch("users/create", {
						firstName: this.firstName,
						lastName: this.lastName,
						companyName: this.companyName,
						email: this.email,
						password: this.password
					});
					this.isCreating = false;
					EventBus.$emit("success", "Member created!");
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
	.mrt-admin--info {
		.v-input--selection-controls {
			margin: 0 !important;
		}
	}
}
</style>