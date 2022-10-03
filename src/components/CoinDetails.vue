<template>
	<div class="less-dark">
		<!--		<h1>Is this rendering</h1>-->
		<!--		<img :src="chart" alt="asset-chart" />-->
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
	name: "CoinDetails",
	components: {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	mounted() {},
	data() {
		return {
			chart: require("../assets/chart.svg")
		}
	}
})
</script>

<style scoped>
.less-dark {
	background: #1c1c1c;
}
</style>
