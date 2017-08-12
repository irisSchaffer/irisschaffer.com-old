const variables = require('./variables')

module.exports = {
	parser  : 'postcss-scss',
	plugins : () => [
		require('postcss-strip-inline-comments'),
		require('postcss-import'),
		require('postcss-nested'),
		require('postcss-cssnext')({
			features : {
				customProperties : {
					variables : variables.customProperties
				},
				customMedia : {
					extensions : variables.customMedia
				}
			}
		})
	]
}
