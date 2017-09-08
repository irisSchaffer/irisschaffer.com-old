const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')

const baseConfig = require('./base')
const config = require('../')

module.exports = env => merge.smart(baseConfig(env), {
	name  : 'client',
	entry : {
		client : [
			...(env === 'dev' ? [
				'react-hot-loader/patch',
				'webpack-hot-middleware/client'
			] : []),
			'./client'
		]
	},
	output : {
		filename      : env === 'dev' && '[name].js?[hash]' || '[name].[chunkhash].js',
		chunkFilename : env === 'dev' && '[name].js?[hash]' || '[name].[chunkhash].js'
	},
	plugins : [
		new ExtractTextPlugin({
			filename  : env === 'dev' && 'styles.css' || 'styles.[hash].css',
			allChunks : true,
			disable   : env === 'dev'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names     : 'vendor',
			minChunks : module => /node_modules/.test(module.resource)
		}),
		...((env === 'dev' && [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin(),
			new webpack.NoEmitOnErrorsPlugin()
		]) || [
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
			})
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
