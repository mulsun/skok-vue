module.exports = {
	devServer: {
		proxy: {
			'^/api|graphql': {
				target: 'http://localhost:8000',
				ws: true,
				changeOrigin: true
			},
		}
	}
}