const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
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
			filename  : env === 'development' && 'styles.css' || 'styles.[hash].css',
			allChunks : true,
			disable   : env === 'development'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names     : 'vendor',
			minChunks : module => /node_modules/.test(module.resource)
		}),
		...((env === 'development' && [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin(),
			new webpack.NoEmitOnErrorsPlugin(),
		]) || [
			// new Visualizer(),
			new CleanWebpackPlugin([
				`${config.buildDir}/styles.*.css`,
				`${config.buildDir}/client.*.js`,
				`${config.buildDir}/vendor.*.js`
			], {
				root    : config.rootDir,
				verbose : false
			}),
			new ChunkManifestPlugin({
				filename         : 'chunks.json',
				manifestVariable : '__CHUNK_MANIFEST__'
			}),
			new CompressionPlugin()
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
