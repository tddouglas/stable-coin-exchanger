<template>
	<div v-if="haveIFinishedBuildingThis">
		<p>In Progress</p>
	</div>
	<div v-else>
		<div class="less-dark">
			<img class="full-width" :src="usdaOverview" alt="my-logo" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
	name: "CoinDetails",
	components: {},
	data() {
		return {
			haveIFinishedBuildingThis: false,
			usdaOverview: require("../assets/usda_overview.png"),
			chart: require("../assets/chart.svg")
		}
	}
})
</script>

<style scoped>
.less-dark {
	background: #1c1c1c;
}

.full-width {
	width: 100%;
}
</style>
