const path = require('path')
const imagesConfig = require('./images')
const postcssConfig = require('./postcss')

module.exports = env => ({
	js : {
		test    : /\.js$/,
		loader  : 'babel',
		exclude : /node_modules/
	},
	css : {
		test : /\.css$/,
		use  : [
			{
				loader : 'css',
				query  : {
					importLoaders   : 1,
					modules         : true,
					discardComments : { removeAll : true },
					localIdentName  : env === 'development' && '[path][name]-[local]-[hash:base64:3]' || '[hash:base64:5]'
				}
			},
			{
				loader  : 'postcss',
				options : postcssConfig
			}
		]
	},
	svg : {
		test    : /\.svg$/,
		exclude : /fonts/,
		loader  : 'svg-inline'
	},
	images : {
		test : /\.(jpe?g|png)$/,
		use  : [
			{
				loader : 'cached',
				query  : {
					cacheDirectory  : path.resolve(__dirname, 'cache'),
					cacheIdentifier : JSON.stringify(imagesConfig)
				},
			},
			{
				loader : 'responsive',
				query  : imagesConfig
			}
		]
	},
	files : {
		test   : /\.(ico|eot|otf|webp|ttf|woff|woff2|svg|mp4|gif|png)(\?.*)?$/,
		loader : 'file',
		query  : {
			name : env === 'development' ? 'assets/[name].[ext]?[hash:8]' : 'assets/[name].[hash:8].[ext]'
		}
	}
})
