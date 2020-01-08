<template>
	<div class="mrt-admin--details-history">
		<v-timeline dense v-if="loginHistory.length > 0">
			<v-timeline-item color="tertiary" small v-for="action in loginHistory" :key="action.created">
				<span slot="opposite">{{action.created | date-long}}</span>
				<v-card class="elevation-2 pa-4">
					<h1>{{action.created | date-long}}</h1>
					<div class="mrt-admin--login-details">
						<section>
							<h2>Browser</h2>
							<ul>
								<li>
									<label>Browser</label>
									<div>
										<span>{{action.agent.browser.name}}</span>
										<span v-if="action.agent.browser.version">v{{action.agent.browser.version}}</span>
									</div>
								</li>
								<li>
									<label>Engine</label>
									<div>
										<span>{{action.agent.engine.name}}</span>
										<span v-if="action.agent.engine.version">v{{action.agent.engine.version}}</span>
									</div>
								</li>
								<li>
									<label>Language</label>
									<div>{{action.language}}</div>
								</li>
							</ul>
						</section>
						<section>
							<h2>Device</h2>
							<ul>
								<li>
									<label>OS</label>
									<div>
										<span>{{action.agent.os.name}}</span>
										<span v-if="action.agent.os.version">v{{action.agent.os.version}}</span>
									</div>
								</li>
								<li>
									<label>Vendor</label>
									<div>{{action.agent.device.vendor}}</div>
								</li>
								<li>
									<label>Model</label>
									<div>{{action.agent.device.model}}</div>
								</li>
								<li>
									<label>Type</label>
									<div>{{action.agent.device.type}}</div>
								</li>
								<li>
									<label>Cpu</label>
									<div>{{action.agent.device.architecture}}</div>
								</li>
							</ul>
						</section>
						<section>
							<h2>Location</h2>
							<ul>
								<li>
									<label>Remote IP</label>
									<div>{{action.ip}}</div>
								</li>
								<li>
									<label>Country</label>
									<div>{{action.country}}</div>
								</li>
								<li>
									<label>Timezone</label>
									<div>{{action.timezone}}</div>
								</li>
								<li>
									<label>Region</label>
									<div>{{action.region}}</div>
								</li>
								<li>
									<label>City</label>
									<div>{{action.city}}</div>
								</li>
								<li>
									<label>Lat/Lng</label>
									<div>{{action.ll}}</div>
								</li>
							</ul>
						</section>
					</div>
				</v-card>
			</v-timeline-item>
		</v-timeline>
		<div v-else class="mrt-admin--no-history">No Login History</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	data() {
		return {
			loginHistory: []
		};
	},
	computed: {
		...mapState("user", ["history", "isLoading"])
	},
	watch: {
		history: {
			handler() {
				if (this.history) {
					this.parseHistory();
				}
			},
			immediate: true
		}
	},
	methods: {
		parseHistory() {
			this.loginHistory = this.history
				.filter(item => {
					try {
						const details = JSON.parse(item.meta);
						if (details.agent) {
							return true;
						}
						return false;
					} catch (e) {
						// Do nothin if we cant parse
					}
				})
				.map(item => {
					try {
						const details = JSON.parse(item.meta);
						return {
							agent: details.agent,
							ip: details.xForwardedFor,
							language: details.acceptLanguage,
							created: item.created,
							country: details.country,
							region: details.region,
							timezone: details.timezone,
							city: details.city,
							ll:
								details.ll && details.ll.length === 2
									? details.ll
									: ""
						};
					} catch (e) {
						// Do nothin if we cant parse
					}
				});
		}
	}
};
</script>

<style lang="less" scoped>
.mrt-admin--details-history {
	padding: 0 16px 0 0;
	h1 {
		font-weight: 300;
		font-size: 18px;
		color: #ffeb3b;
		margin: 0 0 12px;
	}
	.mrt-admin--login-details {
		display: flex;
		justify-content: space-between;
		section {
			padding: 0;
			background-color: transparent;
			width: 33%;
			h2 {
				font-weight: 400;
				font-size: 14px;
				text-transform: uppercase;
				margin: 0 0 8px 0;
			}
			ul li {
				display: flex;
				margin: 0 0 4px 0;
				label {
					width: 90px;
					color: #e0e0e0;
					font-weight: 300;
				}
				> div {
					span:first-child {
						margin: 0 5px 0 0;
					}
				}
			}
		}
	}
	.mrt-admin--no-history {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100px;
		color: #757575;
	}
}
</style>