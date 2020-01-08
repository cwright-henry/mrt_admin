<template>
	<v-app>
		<mrt-navigation></mrt-navigation>

		<mrt-appbar></mrt-appbar>

		<!-- Sizes your content based upon application components -->
		<v-content>
			<!-- Provides the application the proper gutter -->
			<v-container fluid>
				<transition name="fade">
					<keep-alive>
						<router-view></router-view>
					</keep-alive>
				</transition>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
import mrtNavigation from "./Navigation";
import mrtAppbar from "./Appbar";

export default {
	components: {
		mrtNavigation,
		mrtAppbar
	}
};
</script>