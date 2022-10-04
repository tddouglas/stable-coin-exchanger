<template>
	<nav>
		<img class="center-image small-img" :src="adyenLogo" alt="my-logo" />
		<router-link to="/">Home</router-link>
		|
		<router-link to="/purchase">Purchase</router-link>
	</nav>
	<div class="flex flex-column center-children">
		<router-view />
	</div>
</template>

<script>
export default {
	data() {
		return {
			adyenLogo: require("./assets/Adyen_Corporate_Logo.svg")
		}
	}
}
</script>

<style>
:root {
	--background: rgb(20, 20, 20);
	--subtext-header-color: rgb(0, 82, 255);
	--maintext-color: rgb(241, 240, 240);
	--small-text: rgb(180, 162, 162);
	--thin-border: rgba(180, 162, 162, 0.25);
	--body-font-size: 16px;
	--emphasis-font-size: 20px;
	--body-line-height: 24px;
	--body-font-weight: 400;
}

body {
	background: var(--background);
}

#app-container {
	font-family: "CoinbaseSans", -apple-system, BlinkMacSystemFont, "Segoe UI",
		"Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
		"Helvetica Neue", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: var(--maintext-color);
}

.max-page-width {
	max-width: 1000px;
	width: 100%;
}

nav {
	padding: 30px;
}

nav a {
	font-weight: bold;
	color: #2c3e50;
}

nav a.router-link-exact-active {
	color: #42b983;
}

button {
	border: none;
	background: var(--subtext-header-color);
	color: white;
	text-align: center;
	cursor: pointer;
	border-radius: 4px;
}

.flex {
	display: flex;
}

.flex-column {
	flex-direction: column;
}

.flex-row {
	flex-direction: row;
}

.flex-wrap {
	flex-wrap: wrap;
}

.small-allaround-padding {
	padding: 20px;
}

.small-padding {
	padding: 0 20px;
}

.extra-small-margin {
	margin: 0 10px;
}

.small-margin {
	margin: 0 20px;
}

.small-padding-bottom {
	padding-bottom: 10px;
}

.padding-bottom {
	padding-bottom: 20px;
}

.center-children {
	align-items: center;
}

.half-width {
	width: 50%;
}

.align-left {
	justify-content: left;
	text-align: left;
}

.align-right {
	justify-content: right;
	text-align: right;
}

.small-img {
	width: 70px;
	float: left;
}
</style>
