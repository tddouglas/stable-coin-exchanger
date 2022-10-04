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
		await fetch("", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ a: 1, b: "Textual content" })
		}).then((response) => {
			this.qrCodeValue = String(response.body)
		})
	}
})
</script>

<style scoped>
.extra-padding-top {
	padding-top: 40px;
}
</style>
