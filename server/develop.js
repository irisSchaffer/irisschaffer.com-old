const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')

const serverConfig = require('../lib/config/webpack/render')(process.env.NODE_ENV)
const clientConfig = require('../lib/config/webpack/client')(process.env.NODE_ENV)

const compiler = webpack([clientConfig, serverConfig])
const clientCompiler = compiler.compilers.find(c => c.name === 'client')

module.exports = app => app
	.use(webpackDevMiddleware(compiler, {
		publicPath       : clientConfig.output.publicPath,
		contentBase      : clientConfig.output.path,
		hot              : true,
		clientLogLevel   : 'none',
		disableHostCheck : true,
		noInfo           : true,
		quiet            : true,
		stats            : 'errors-only'
	}))
	.use(webpackHotMiddleware(clientCompiler))
	.use(webpackHotServerMiddleware(compiler))
