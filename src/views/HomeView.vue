<template>
	<section class="flex flex-column small-padding">
		<div class="flex-item flex flex-row flex-wrap center-children">
			<div class="flex flex-column align-left half-width">
				<h3 class="subtext">Introducing USD Adyen (USDA)</h3>
				<span class="main-text">
					A cryptocurrency with a stable price
				</span>
			</div>
			<div class="half-width">
				<img class="center-image" :src="coinExchange" alt="my-logo" />
			</div>
		</div>
	</section>
	<div class="flex flex-row flex-bottom flex-wrap center-children">
		<div>
			<div class="small-text small-padding-bottom">Volume (24 hours)</div>
			<div class="emphasized-small-text">{{ processedVolume }}</div>
		</div>
		<div>
			<div class="small-text small-padding-bottom">
				Circulating Supply
			</div>
			<span class="emphasized-small-text">{{
				circulatingSupply + " "
			}}</span>
			<span class="emphasized-small-text bolded-text">{{
				circulatingCurrency
			}}</span>
		</div>
		<div>
			<router-link to="/purchase">
				<button class="buy-button">Get USDA Coin</button>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
// import HelloWorld from "@/components/HelloWorld.vue" // @ is an alias to /src

export default defineComponent({
	name: "HomeView",
	components: {},
	data() {
		return {
			coinExchange: require("../assets/coin-exchange.svg"),
			processedVolume: "3.6 Billion",
			circulatingSupply: "50.2B",
			circulatingCurrency: "USDA"
		}
	}
})
</script>

<style scoped>
.half-width {
	width: 50%;
}

.subtext {
	text-transform: uppercase;
	font-weight: 600;
	font-size: 14px;
	letter-spacing: 0.02em;
	color: var(--subtext-header-color);
}

.main-text {
	line-height: 1.3;
	color: rgb(250, 250, 250);
	font-size: 48px;
	font-weight: 800;
}

.flex-item {
	min-height: 400px;
	max-width: 1200px;
	justify-content: space-between;
}

.flex-bottom {
	padding: 20px 20px;
	min-height: 50px;
	min-width: 700px;
	justify-content: space-between;
	border: 1px solid white;
	box-sizing: border-box;
	box-shadow: 0 4px 8px rgba(128, 128, 128, 0.5);
	border-radius: 2px;
}

.center-image {
	padding: 40px;
	width: auto;
}

.small-text {
	color: var(--small-text);
	font-weight: 600;
	font-size: 14px;
	letter-spacing: 0.02em;
}

.emphasized-small-text {
	color: var(--maintext-color);
	letter-spacing: 0.05em;
	font-size: var(--body-font-size);
	line-height: var(--body-line-height);
	font-weight: var(--body-font-weight);
}

.bolded-text {
	font-size: var(--emphasis-font-size);
	font-weight: bold;
}

.buy-button {
	font-size: 16px;
	background-color: rgb(9, 163, 59);
	color: white;
	border: medium none;
	font-weight: bold;
	cursor: pointer;
	transition: background-color 0.2s ease 0s;
	height: 56px;
	text-align: center;
	padding: 20px 25px;
	min-width: 170px;
	border-radius: 4px;
}
</style>
