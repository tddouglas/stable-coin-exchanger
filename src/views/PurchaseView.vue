<template>
	<div class="flex flex-row">
		<div class="small-image">
			<img class="center-image" :src="stableDollar" alt="my-logo" />
		</div>
		<div class="center-children flex flex-row flex-wrap">
			<div class="baseline flex flex-row flex-wrap">
				<h1>USD Adyen</h1>
				<h1 class="subtext">USDA</h1>
			</div>
		</div>
	</div>
	<main class="flex flex-column nav-layout">
		<div class="flex nav-subheader flex-row">
			<div class="align-left">
				<button class="nav-button">Overview</button>
			</div>
			<div class="menu_highlight"></div>
		</div>
		<div class="flex flex-row">
			<div class="top-padding largerRow">
				<CoinDetails />
			</div>
			<div class="top-padding smallerRow">
				<CoinAmount v-model="amount" v-if="amount == null" />
				<Payment v-else type="dropin" :value="amount" />
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Payment from "@/components/PaymentsSidebar.vue"
import CoinDetails from "@/components/CoinDetails.vue"
import CoinAmount from "@/components/CoinAmount.vue"

export default defineComponent({
	name: "PurchaseView",
	components: { Payment, CoinDetails, CoinAmount },
	watch: {
		amount(newVal) {
			console.log("New amount is", newVal)
		}
	},
	data() {
		return {
			stableDollar: require("../assets/stable-dollar.svg"),
			amount: null
		}
	}
})
</script>

<style scoped>
.small-image {
	width: 100px;
	padding-right: 20px;
}

h1 {
	padding-right: 20px;
}

.nav-subheader {
	min-height: 40px;
	justify-content: space-between;
}

.nav-layout {
	min-width: 500px;
	padding-top: 40px;
}

.nav-button {
	border: none;
	background-color: inherit;
	width: 125px;
	color: white;
	padding: 14px 28px;
	font-size: 16px;
	font-weight: bold;
	cursor: pointer;
	display: inline-block;
}

.menu_highlight {
	transition: transform 300ms ease 0s, width 300ms ease 0s;
	height: 2px;
	width: 125px;
	transform: translateX(0px);
	background-color: white;
	position: absolute;
	top: 290px;
}

.top-padding {
	padding-top: 40px;
}

.largerRow {
	width: 60%;
}

.smallerRow {
	width: 40%;
}

.subtext {
	color: var(--small-text);
	font-size: 25px;
}

.baseline {
	align-items: baseline;
}
</style>
