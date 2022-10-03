<template>
	<div class="small-margin thin-border padding-bottom">
		<div>
			<DetailsButton :selected="true" text="Buy"></DetailsButton>
			<DetailsButton :selected="false" text="Sell"></DetailsButton>
			<DetailsButton :selected="false" text="Convert"></DetailsButton>
		</div>
		<div class="small-padding">
			<div class="small-allaround-padding">
				<span class="input-placeholder">$</span>
				<input
					class="amount-input"
					placeholder="0"
					:style="{
						width: inputWidth + 'px',
						fontSize: inputFontSize + 'px'
					}"
					v-model="purchaseAmount"
					@input="adjustSize"
				/>
			</div>
			<div class="padding-bottom">
				<button
					class="extra-small-margin small-button"
					@click="setPurchaseAmount(5)"
				>
					$5
				</button>
				<button
					class="extra-small-margin small-button"
					@click="setPurchaseAmount(10)"
				>
					$10
				</button>
				<button
					class="extra-small-margin small-button"
					@click="setPurchaseAmount(20)"
				>
					$20
				</button>
			</div>
			<div>
				<button
					class="buy-button"
					@click="initPurchase(purchaseAmount)"
				>
					Preview Buy
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import DetailsButton from "@/components/DetailsButton.vue"

export default defineComponent({
	name: "CoinAmount",
	components: { DetailsButton },
	methods: {
		initPurchase(value: number) {
			this.$emit("update:modelValue", value)
		},
		setPurchaseAmount(value: number) {
			this.purchaseAmount = value
			this.inputWidth = 70
			this.inputFontSize = 62
		},
		adjustSize(el: Event) {
			let target = el.target as HTMLInputElement
			let targetSize = target.value.length
			if (targetSize > 0) {
				let newSize = targetSize * 35
				if (newSize <= 140) {
					this.inputWidth = newSize
				} else {
					this.inputFontSize = 40
				}
			} else {
				//targetSize = 0, resetting values
				this.inputWidth = 35
				this.inputFontSize = 62
			}
		}
	},
	props: { modelValue: Number },
	data() {
		return {
			purchaseAmount: this.modelValue,
			inputWidth: 35,
			inputFontSize: 62
		}
	}
})
</script>

<style scoped>
.thin-border {
	border: solid 1px var(--thin-border);
	border-radius: 3px;
}

.amount-input {
	font-family: "CoinbaseSans", -apple-system, BlinkMacSystemFont, "Segoe UI",
		"Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
		"Helvetica Neue", sans-serif;
	text-align: left;
	color: var(--small-text);
	font-weight: 400;
	max-width: 150px;
	padding: 0px;
	margin: 0px;
	box-shadow: none;
	border: medium none;
	overflow: hidden;
	outline: currentcolor none medium;
	background: var(--background);
	cursor: inherit;
}

.input-placeholder {
	font-family: "CoinbaseSans", -apple-system, BlinkMacSystemFont, "Segoe UI",
		"Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
		"Helvetica Neue", sans-serif;
	font-weight: 500;
	color: var(--small-text);
	font-size: 31px;
	line-height: 1.5;
	align-self: flex-start;
	margin-top: 8px;
}

.buy-button {
	cursor: pointer;
	text-align: center;
	min-width: 100px;
	text-transform: none;
	height: 40px;
	outline: 0;
	justify-content: center;
	align-items: center;
	margin: 0;
	position: relative;
	overflow: visible;
	width: 100%;
	max-width: 100%;
	border-radius: 15px;
	border: none;
	font-size: 16px;
	line-height: 24px;
	font-weight: 600;
	background: blue;
	--interactable-height: 56px;
	--interactable-border-radius: 56px;
	--interactable-background: blue;
	--interactable-hovered-background: rgb(71, 126, 246);
	--interactable-hovered-opacity: 0.92;
	--interactable-pressed-background: rgb(83, 135, 246);
	--interactable-pressed-opacity: 0.86;
	--interactable-disabled-background: rgb(27, 51, 101);
}

.small-button {
	cursor: pointer;
	border: none;
	border-radius: 4px;
	background: var(--thin-border);
	color: white;
	height: 20px;
	width: 40px;
	text-align: center;
}
</style>
