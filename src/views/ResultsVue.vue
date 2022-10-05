<template>
	<div class="status-container">
		<div class="status">
			<img
				v-if="type === 'error' || type === 'failed'"
				src="../assets/failed.svg"
				class="status-image"
				alt
			/>
			<div v-else>
				<img
					src="../assets/success.svg"
					class="status-image small-padding"
					alt
				/>
				<img src="../assets/thank-you.svg" class="status-image" alt />
			</div>
			<div class="status-message small-allaround-padding">
				<div v-if="type === 'success'">
					<div>
						Your order has been successfully placed. <br />Please
						scan below QR Code to collect your coins.
					</div>
					<QRCodeGenerator :amount="amount" :reference="reference" />
				</div>
				<div v-else-if="type === 'failed'">
					The payment was refused. Please try a different payment
					method or card.
				</div>
				<div v-else-if="type === 'pending'">
					Your order has been received! Payment completion pending.
				</div>
				<div v-else>
					Your order has been successfully placed.
					<a
						href="https://docs.adyen.com/development-resources/response-handling"
						>Response handling.</a
					>
				</div>
			</div>
			<router-link to="/">
				<button class="button button-size">Return Home</button>
			</router-link>
		</div>
	</div>
</template>

<script>
import QRCodeGenerator from "@/components/QRCodeGenerator.vue"

export default {
	head: {
		title: "Result"
	},
	data() {
		return {
			type: this.$route.params.type,
			amount: this.$route.query.amount,
			reference: this.$route.query.reference
		}
	},
	components: {
		QRCodeGenerator
	}
}
</script>

<style scoped>
.button-size {
	width: 200px;
	height: 40px;
}
</style>
