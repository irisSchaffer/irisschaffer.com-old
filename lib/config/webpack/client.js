const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')
const NameAllModulesPlugin = require('name-all-modules-plugin')
// const Visualizer = require('webpack-visualizer-plugin')

const baseConfig = require('./base')
const config = require('../')

module.exports = env => merge.smart(baseConfig(env), {
	name  : 'client',
	entry : {
		client : [
			'babel-polyfill',
			...(env === 'development' ? [
				'react-hot-loader/patch',
				'webpack-hot-middleware/client'
			] : []),
			'./client'
		]
	},
	output : {
		filename      : env === 'development' && '[name].js?[hash]' || '[name].[chunkhash].js',
		chunkFilename : env === 'development' && '[name].js?[hash]' || '[name].[chunkhash].js'
	},
	plugins : [
		new ExtractTextPlugin({
			filename  : env === 'development' && 'styles.css' || 'styles.[contenthash].css',
			allChunks : true,
			disable   : env === 'development'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names     : 'vendor',
			minChunks : module => /node_modules/.test(module.resource)
		}),
		new webpack.NamedModulesPlugin(),
		...((env === 'development' && [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoEmitOnErrorsPlugin(),
		]) || [
			// new Visualizer(),
			new CleanWebpackPlugin([
				`${config.buildDir}/styles.*.css*`,
				`${config.buildDir}/client.*.js*`,
				`${config.buildDir}/vendor.*.js*`,
				`${config.buildDir}/runtime.*.js*`
			], {
				root    : config.rootDir,
				verbose : false
			}),

			// stuff necessary for long-term caching
			// see https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
			new webpack.NamedChunksPlugin(),
			new NameAllModulesPlugin(),
			// extracts webpack runtime into own chunk, enabling caching
			new webpack.optimize.CommonsChunkPlugin({
				name : 'runtime'
			}),

			// compression
			new CompressionPlugin(), // gzip
			new BrotliPlugin() // brotli
		]),
	],
	module : {
		rules : [
			Object.assign({}, config.loaders(env).js, {
				options : {
					plugins : [
						require.resolve('react-hot-loader/babel')
					]
				}
			}),
			{
				test : config.loaders(env).css.test,
				use  : ExtractTextPlugin.extract({
					fallback : 'style',
					use      : config.loaders(env).css.use
				})
			}
		]
	},
	target : 'web'
})
