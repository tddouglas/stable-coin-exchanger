<template>
	<div class="small-allaround-padding extra-padding-top">
		<qrcode-vue
			v-if="qrCodeValue"
			:value="qrCodeValue"
			:size="size"
			level="H"
		/>
		<medium-spinner v-else />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import MediumSpinner from "@/components/Spinner.vue"
import QrcodeVue from "qrcode.vue"

export default defineComponent({
	name: "QRCodeGenerator",
	props: { amount: String, reference: String },
	data() {
		return {
			qrCodeValue: "",
			size: 200
		}
	},
	components: {
		QrcodeVue,
		MediumSpinner
	},
	async created() {
		let req = {
			amount: this.$props.amount,
			assets: "USDA",
			reference: this.$props.reference
		}
		await fetch("http://localhost:8081/api/textcoins", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(req)
		})
			.then((response) => response.json())
			.then((response) => {
				this.qrCodeValue = response.textcoin.url
			})
	}
})
</script>

<style scoped>
.extra-padding-top {
	padding-top: 40px;
}
</style>
