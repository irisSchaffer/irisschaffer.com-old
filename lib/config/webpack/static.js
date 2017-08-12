const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')

const config = require('../')

module.exports = {
	context : config.buildDir,
	entry   : './render.js',
	output  : {
		path          : config.buildDir,
		filename      : 'static.js',
		libraryTarget : 'umd'
	},
	plugins : [
		new ProgressBarPlugin(),
		new StaticSiteGeneratorPlugin({
			paths  : ['/'],
			crawl  : true,
			locals : {
				assets : require(path.join(config.buildDir, 'assets.json')),
				chunks : require(path.join(config.buildDir, 'chunks.json')),
				icons  : require(path.join(config.buildDir, 'icons.json'))
			}
		})
	],
	target : 'node'
}
