const path = require('path')

module.exports = {
	rootDir   : path.join(__dirname, '..', '..'),
	sourceDir : path.join(__dirname, '..', '..', 'src'),
	buildDir  : path.join(__dirname, '..', '..', 'build'),
}

module.exports.loaders = require('./loaders')
module.exports.postcss = require('./postcss')
module.exports.images = require('./images')
