<template>
	<div class="mrt-admin--user-detail">
		<div class="user-icon">
			<v-icon v-if="revoked" size="56" color="error">mdi-account-remove</v-icon>
			<v-icon v-else size="56" :color="role === 'Admin' ? 'tertiary' : 'primary'">mdi-account</v-icon>
			<span v-if="revoked">Revoked</span>
			<span v-else>{{role}}</span>
		</div>
		<div class="details">
			<ul>
				<li>
					<label>Email</label>
					<div>{{user.email}}</div>
				</li>
				<li>
					<label>Name</label>
					<div>{{fullName}}</div>
				</li>
				<li>
					<label>Company Name</label>
					<div>{{user.companyName}}</div>
				</li>
				<li>
					<label>Last Update</label>
					<div>{{user.lastUpdate | date-long}}</div>
				</li>
			</ul>
		</div>
		<div class="link">
			<v-icon size="32" color="primary">mdi-chevron-right</v-icon>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		user: {
			type: Object,
			default: () => ({})
		}
	},
	computed: {
		fullName() {
			return `${this.user.firstName} ${this.user.lastName}`;
		},
		role() {
			return this.user.role === "admin" ? "Admin" : "Member";
		},
		revoked() {
			return this.user.tokenRevoked;
		}
	}
};
</script>

<style lang="less" scoped>
.mrt-admin--user-detail {
	padding: 16px;
	display: flex;
	align-items: center;
	cursor: pointer;
	color: #ffffff;
	.user-icon {
		padding: 0 32px 0 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
		span {
			font-size: 11px;
			color: #e0e0e0;
			text-transform: uppercase;
		}
	}
	.details {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		ul {
			li {
				display: flex;
				align-items: center;
				margin: 0 0 4px;
				label {
					width: 120px;
					font-weight: 300;
					font-size: 12px;
					text-transform: uppercase;
				}
				&:last-child {
					margin: 0px;
				}
			}
		}
	}
	.link {
		display: flex;
		justify-content: center;
		width: 60px;
	}
}
@media screen and (max-width: 600px) {
	.mrt-admin--user-detail {
		padding: 12px 8px;
		.user-icon {
			padding: 0 12px 0 0px;
		}
		.details {
			ul li {
				flex-direction: column;
				align-items: flex-start;
				margin: 0 0 12px;
				label {
					width: 100%;
					font-size: 11px;
				}
				div {
					word-break: break-all;
					line-height: 1.1;
				}
			}
		}
		.link {
			width: 20px;
		}
	}
}
</style>