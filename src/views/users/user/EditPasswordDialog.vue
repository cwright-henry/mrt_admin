<template>
	<v-dialog v-model="dialog" width="550" :fullscreen="$vuetify.breakpoint.smAndDown">
		<template v-slot:activator="{ on }">
			<v-btn color="primary" v-on="on" small>Set Password</v-btn>
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
						<sup>*</sup>Email
					</label>
					<v-text-field label required outlined readonly v-model="email" dense></v-text-field>
				</div>
				<div class="mrt-admin--info">
					<label>
						<sup>*</sup>New Password
					</label>
					<v-text-field
						label
						:error-messages="errorMessages.password"
						hint="Between 8 and 32 characters"
						required
						outlined
						autofocus
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
					:disabled="isUpdating"
					:loading="isUpdating"
					small
					@click="create"
				>Update Password</v-btn>
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
			password: "",
			isUpdating: false,
			errorMessages: {
				password: null
			}
		};
	},
	watch: {
		user: {
			handler: function() {
				this.email = this.user.email;
			},
			immediate: true
		},
		dialog() {
			if (!this.dialog) {
				this.reset();
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
			this.password = null;
			this.resetErrorMessages();
		},

		isFormValid() {
			this.resetErrorMessages();
			let isError = false;
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
					this.isUpdating = true;
					await this.$store.dispatch("user/setPassword", {
						userId: this.user["_id"],
						newPassword: this.password
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
					}
				}
			}
		},

		resetErrorMessages() {
			this.errorMessages = {
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