const webpack = require('webpack');

module.exports = {
	"transpileDependencies": [
		"vuetify"
	],
	devServer: {
		proxy: {
			"/admin": {
				target: `http://${process.env.MRT_HOST}:${process.env.MRT_PORT}/`
			}
		}
	},
	configureWebpack: {
		plugins: [
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		]
	},
}