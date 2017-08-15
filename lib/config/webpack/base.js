const webpack = require('webpack')
const path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = require('../')

module.exports = env => ({
	context : path.resolve(__dirname, '..', '..', 'entries'),
	devtool : env === 'dev' && 'inline-source-map',
	output  : {
		path       : config.buildDir,
		filename   : '[name].js',
		publicPath : '/'
	},
	plugins : [
		new webpack.EnvironmentPlugin([
			'NODE_ENV',
			'PRISMIC_API',
			'PRISMIC_ACCESS_TOKEN',
			'DISQUS_SHORTNAME',
			'DISQUS_WEBSITE_URL',
			'HOST'
		]),
		...(env !== 'dev' ? [
			// new BundleAnalyzerPlugin(),
			new ProgressBarPlugin(),
			new AssetsPlugin({
				path     : config.buildDir,
				filename : 'assets.json',
				update   : true
			})
		] : []),
	],
	module : {
		rules : [
			config.loaders(env).js,
			config.loaders(env).svg,
			config.loaders(env).files,
			// config.loaders(env).images
		]
	},
	resolve : {
		modules : [config.sourceDir, 'node_modules'],
		alias   : {
			variables : path.resolve(__dirname, '..', 'variables')
		}
	},
	resolveLoader : {
		moduleExtensions : ['-loader']
	},
	devServer : {
		hot                : true,
		publicPath         : '/',
		stats              : 'minimal',
		historyApiFallback : true,
		contentBase        : config.buildDir
	},
	target : 'web'
})
