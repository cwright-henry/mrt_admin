<template>
	<div class="mrt-admin--tickers">
		<v-card class="px-2">
			<v-card-title>
				<h1>{{tickers.length | number(0)}} Tickers</h1>
				<v-spacer></v-spacer>
				<div class="mrt-admin--tickers-search">
					<v-text-field
						v-model="search"
						prepend-icon="mdi-magnify"
						placeholder="Search Ticker"
						single-line
						clearable
						outlined
						dense
						hide-details
					></v-text-field>
				</div>
			</v-card-title>
			<v-data-table
				:loading="isLoading"
				loading-text="Loading... Please wait"
				:sort-by="['name']"
				hide-default-footer
				:headers="headers"
				:items-per-page="100000"
				:items="tickers"
				:search="search"
			>
				<template v-slot:item.name="{ item }">
					<v-chip pill color="#EEEEEE" outlined class="white--text">
						<v-avatar left color="secondary">
							<v-icon size="24" color="#FFF">mdi-finance</v-icon>
						</v-avatar>
						{{ item.name }}
					</v-chip>
				</template>
				<template v-slot:item.remove="{ item }">
					<v-menu
						origin="top right"
						transition="scale-transition"
						:close-on-content-click="false"
						:nudge-width="0"
						offset-y
						left
						:ref="`menu-${item._id}`"
					>
						<template v-slot:activator="{ on }">
							<v-icon v-on="on" color="primary">mdi-close-circle</v-icon>
						</template>
						<div class="mrt-admin--menu-action">
							<h1 class="text-truncate mb-2">Delete {{item.name}}</h1>
							<p>This action will permentently remove {{item.name}} from the MRT system.</p>
							<div class="text-xs-right mr-1">
								<v-btn
									color="#2196F3"
									:disabled="isDeleting"
									:loading="isDeleting"
									left
									small
									@click="remove(`menu-${item._id}`, item._id)"
								>Remove</v-btn>
							</div>
						</div>
					</v-menu>
				</template>
			</v-data-table>
			<mrt-new-ticker-dialog />
		</v-card>
	</div>
</template>

<script>
import { mapState } from "vuex";
import EventBus from "@/events";
import mrtNewTickerDialog from "./NewTickerDialog";

export default {
	data() {
		return {
			search: "",
			items_per_page: 0,
			isDeleting: false,
			headers: [
				{
					text: "Name",
					align: "left",
					sortable: true,
					value: "name"
				},
				{
					text: "Curr Id",
					align: "left",
					sortable: true,
					value: "curr_id"
				},
				{
					text: "Type",
					align: "left",
					sortable: true,
					value: "type"
				},
				{
					text: "Source",
					align: "left",
					sortable: true,
					value: "source"
				},
				{
					text: "",
					align: "right",
					sortable: false,
					value: "remove"
				}
			]
		};
	},
	components: {
		mrtNewTickerDialog
	},
	computed: {
		...mapState("tickers", ["tickers", "isLoading"])
	},
	watch: {
		tickers: {
			handler() {
				this.items_per_page = this.tickers.length;
			},
			immediate: false
		}
	},
	mounted() {
		this.load();
	},
	methods: {
		async load() {
			await this.$store.dispatch("tickers/load");
		},

		async remove(menu, tickerId) {
			try {
				this.isDeleting = true;
				await this.$store.dispatch("tickers/delete", { tickerId });
				EventBus.$emit("success", "Ticker deleted!");
			} finally {
				this.isDeleting = false;
				this.$refs[menu].isActive = false;
			}
		}
	}
};
</script>

<style lang="less" scoped>
.mrt-admin--tickers {
	position: relative;
	width: 100%;
	h1 {
		font-weight: 300;
		font-size: 22px;
		color: var(--tertiary-color);
	}
	.mrt-admin--tickers-search {
		width: 300px;
	}
}
</style>

<style lang="less">
.mrt-admin--menu-action {
	padding: 16px;
	font-weight: 300;
	background-color: #2e2e2e;
	max-width: 350px;
	h1 {
		font-size: 18px;
		font-weight: 400;
		font-weight: inherit;
	}
}
</style>