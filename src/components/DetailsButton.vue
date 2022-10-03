<template>
	<button
		class="third-width"
		:class="selected ? 'button-selected' : 'button-unselected'"
	>
		{{ text }}
	</button>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
	name: "DetailsButton",
	props: {
		selected: Boolean,
		text: String
	},
	data() {
		return {}
	}
})
</script>

<style scoped>
.third-width {
	width: 33%;
	height: 47px;
	background: var(--background);
	color: white;
	cursor: pointer;
	border: none;
}

.button-selected {
	border-top: solid 4px blue;
	/*border-left: solid 1px var(--thin-border);*/
	border-right: solid 1px var(--thin-border);
}

.button-unselected {
	border-bottom: solid 1px var(--thin-border);
}
</style>
