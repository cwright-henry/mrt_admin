<template>
	<div class="mrt-admin--login">
		<mrt-toolbar></mrt-toolbar>
		<section>
			<div class="login-box">
				<div class="logo">
					<h1 id="former">MRT Administrator</h1>
					<img src="@/assets/logo.svg" height="128" />
					<h3>Bluecrowe Analytics</h3>
				</div>
				<div class="login-box__contents">
					<div class="email">
						<v-text-field
							prepend-icon="mdi-email-outline"
							v-model="email"
							type="email"
							:error-messages="errorMessages"
							@keypress.enter="login"
							placeholder="Email"
							label
							outlined
						></v-text-field>
					</div>
					<div class="password">
						<v-text-field
							prepend-icon="mdi-lock"
							v-model="password"
							:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
							:type="show ? 'text' : 'password'"
							:error-messages="errorMessages"
							@keypress.enter="login"
							hint="At least 8 characters"
							placeholder="Password"
							label
							outlined
							maxlength="32"
							@click:append="show = !show"
						></v-text-field>
					</div>
					<div class="action">
						<v-btn color="#2196F3" @click="login" :loading="loading" large>Sign In</v-btn>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import mrtToolbar from "./Toolbar";
import { mapState } from "vuex";

export default {
	components: {
		mrtToolbar
	},
	data() {
		return {
			email: "",
			password: "",
			errorMessages: null,
			show: false
		};
	},
	mounted() {
		// this.$el.querySelectorAll("input").forEach(it => {
		// 	it.setAttribute("autocomplete", "new-password");
		// });
	},
	computed: {
		...mapState("login", ["loading"])
	},
	methods: {
		async login() {
			try {
				await this.$store.dispatch("login/login", {
					email: this.email,
					password: this.password
				});
				this.$router.push({ path: "/" });
			} catch (error) {
				this.errorMessages = "Email or password is incorrect";
				setTimeout(() => {
					this.errorMessages = null;
				}, 2500);
			}
		}
	}
};
</script>

<style lang="less">
.mrt-admin--login {
	width: 100%;
	section {
		display: flex;
		flex-direction: column;
		padding-top: 80px;
		.login-box {
			max-width: 100%;
			width: 500px;
			margin: 0 auto;
			border-radius: 8px;
			.logo {
				text-align: center;
				h1 {
					margin: 0 0 16px;
					font-weight: 300;
					font-size: 32px;
				}
				h3 {
					font-style: italic;
					font-weight: 300;
					font-size: 16px;
				}
			}
			.login-box__contents {
				padding: 36px 36px;
				border-radius: 0 0 8px 8px;
				.action {
					margin: 24px 0 12px 0;
					text-align: center;
					button {
						color: #fff;
						background: #424242;
					}
				}
			}
		}
		input:-webkit-autofill,
		input:-webkit-autofill:hover,
		input:-webkit-autofill:focus,
		input:-webkit-autofill:active {
			-webkit-box-shadow: 0 0 0 30px #303030 inset !important;
		}
		input:-webkit-autofill {
			-webkit-text-fill-color: #ffeb3b !important;
		}
	}
	.mrt-login--failed {
		color: var(--error);
		text-align: center;
		border: 1px solid var(--error);
		margin: 0px 56px 12px 56px;
		padding: 8px;
	}
}
</style>