<template>
	<v-dialog v-model="dialog" width="600">
		<template v-slot:activator="{ on }">
			<v-btn bottom right fixed color="primary" v-on="on" fab>
				<v-icon>mdi-playlist-plus</v-icon>
			</v-btn>
		</template>
		<v-card class="mrt-admin--new-user">
			<v-card-title class="headline grey">
				<v-icon size="28" color="#fff">mdi-account</v-icon>New Ticker
			</v-card-title>
			<v-card-text class="mt-4">
				<div class="mrt-admin--info">
					<label>
						<sup>*</sup>Name
					</label>
					<v-text-field
						label
						outlined
						autofocus
						:error-messages="errorMessages.name"
						required
						max-length="128"
						v-model="name"
						dense
					></v-text-field>
				</div>
				<div class="mrt-admin--info">
					<label>
						<sup>*</sup>Curr Id
					</label>
					<v-text-field
						label
						outlined
						:error-messages="errorMessages.currId"
						required
						max-length="128"
						v-model="currId"
						dense
					></v-text-field>
				</div>
				<div class="mrt-admin--info">
					<label>
						<sup>*</sup>Type
					</label>
					<v-select :items="types" v-model="type" label dense outlined></v-select>
				</div>
				<div class="mrt-admin--info">
					<label>
						<sup>*</sup>Source
					</label>
					<v-text-field label readonly required outlined max-length="256" v-model="source" dense></v-text-field>
				</div>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions class="px-6 py-4">
				<v-btn
					color="primary"
					:disabled="isCreating || isValidTicker"
					:loading="isTesting"
					small
					@click="test"
				>Test Ticker</v-btn>
				<v-spacer></v-spacer>
				<v-btn
					color="primary"
					:disabled="!isValidTicker"
					:loading="isCreating"
					small
					@click="create"
				>Create Ticker</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import EventBus from "@/events";
import ApiController from "@/services/ApiController";

export default {
	data() {
		return {
			dialog: false,
			name: "",
			currId: "",
			type: "Equity",
			source: "Investing.com",
			isValidTicker: false,
			isTesting: false,
			isCreating: false,
			errorMessages: {
				name: "",
				currId: "",
				type: ""
			},
			types: [
				{
					value: "Equity",
					text: "Equity"
				},
				{
					value: "Index",
					text: "Index"
				},
				{
					value: "Cmdty",
					text: "Commodity"
				},
				{
					value: "Curncy",
					text: "Currency"
				},
				{
					value: "Crypto",
					text: "Cryptocurrency"
				}
			]
		};
	},
	watch: {
		dialog() {
			if (!this.dialog) {
				this.reset();
			}
		},
		name(val) {
			if (val) {
				this.errorMessages.name = null;
			}
		},
		currId(val) {
			if (val) {
				this.errorMessages.currId = null;
			}
		},
		type(val) {
			if (val) {
				this.errorMessages.type = null;
			}
		}
	},
	methods: {
		reset() {
			this.name = "";
			this.currId = "";
			this.isValidTicker = false;
			this.resetErrorMessages();
		},

		isFormInvalid() {
			this.resetErrorMessages();
			let isError = false;
			if (this.name.trim() === "") {
				isError = true;
				this.errorMessages.name = "Name is required";
			}
			if (this.currId.trim() === "") {
				isError = true;
				this.errorMessages.currId = "Curr Id is required";
			}

			return isError;
		},

		async create() {
			if (!this.isFormInvalid()) {
				try {
					this.isCreating = true;
					await this.$store.dispatch("tickers/create", {
						name: this.name,
						curr_id: this.currId,
						type: this.type
					});
					this.isCreating = false;
					EventBus.$emit("success", "Ticker added!");
					this.dialog = false;
				} catch (e) {
					if (e.code instanceof Array) {
						for (let i = 0; i < e.code.length; i++) {
							this.errorMessages[e.code[i]["field"]] =
								e.code[i]["msg"];
						}
					}
				} finally {
					this.isCreating = false;
				}
			}
		},

		async test() {
			if (!this.isFormInvalid()) {
				try {
					this.isTesting = true;
					await ApiController.tickerTest({
						curr_id: this.currId
					});
					EventBus.$emit("success", "Ticker is valid!");
					this.isValidTicker = true;
				} catch (e) {
					if (e.code === "DUPLICATE_NAME") {
						this.errorMessages.currId = "Ticker already exists";
					} else if (e.code == "NOT_FOUND") {
						this.errorMessages.currId =
							"Ticker does not exist in Investing.com";
					} else {
						this.errorMessages.currId = "Unknown error";
					}
				} finally {
					this.isTesting = false;
				}
			}
		},

		resetErrorMessages() {
			this.errorMessages = {
				name: null,
				type: null,
				currId: null
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