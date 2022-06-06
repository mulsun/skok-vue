export default {
	devServer: {
		proxy: {
			'^/api|graphql': {
				target: 'http://localhost:3000',
				ws: true,
				changeOrigin: true
			},
		}
	}
}