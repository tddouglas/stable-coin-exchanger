module.exports = {
	devServer: {
		allowedHosts: "all",
		proxy: {
			"^/api": {
				target: "http://localhost:3000",
				changeOrigin: true
			}
		}
	}
}
