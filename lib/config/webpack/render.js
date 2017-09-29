const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const baseConfig = require('./base')
const config = require('../')

module.exports = env => merge.smart(baseConfig(env), {
	name  : 'server',
	entry : [
		'babel-polyfill',
		'./render'
	],
	output : {
		filename      : 'render.js',
		libraryTarget : 'umd'
	},
	externals : [
		nodeExternals({ whitelist : [] })
	],
	plugins : [
		new webpack.optimize.LimitChunkCountPlugin({ maxChunks : 1 }),
		...(env !== 'development' ? [
			new FaviconsWebpackPlugin({
				logo          : path.join(config.sourceDir, 'assets', 'favicon.png'),
				emitStats     : true,
				statsFilename : 'icons.json'
			})
		] : [])
	],
	module : {
		rules : [
			{
				test : config.loaders(env).css.test,
				use  : [
					Object.assign({}, config.loaders(env).css.use[0], {
						loader : 'css-loader/locals'
					}),
					...config.loaders(env).css.use.slice(1, config.loaders(env).css.use.length - 1)
				]
			}
		]
	},
	target : 'node'
})
