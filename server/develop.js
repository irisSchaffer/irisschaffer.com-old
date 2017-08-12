const path = require('path')
// const ngrok = require('ngrok')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const requireFromString = require('require-from-string')
const memwatch = require('memwatch-next')

const webpackConfigServer = require('../lib/config/webpack/render')
const webpackConfigClient = require('../lib/config/webpack/client')

memwatch.on('leak', (info) => {
	console.error('Memory leak detected:\n', info)
})

module.exports = app => {
	const context = {}
	const renderCompiler = webpack(webpackConfigServer('dev'))
	const clientCompiler = webpack(webpackConfigClient('dev'))

	app.use(webpackDevMiddleware(clientCompiler, {
		overlay : true,
		stats   : 'minimal'
	}))
	app.use(webpackHotMiddleware(clientCompiler))
	app.use(webpackDevMiddleware(renderCompiler, {
		serverSideRender : true,
		stats            : 'minimal'
	}))

	app.use('*', (req, res) => {
		const filename = res.locals.webpackStats.toJson().assetsByChunkName.render
		const filepath = path.join(renderCompiler.outputPath, filename)

		const outputFs = renderCompiler.outputFileSystem
		const render = requireFromString(outputFs.readFileSync(filepath).toString())

		render.default({ path : req.originalUrl, context }).then(html => {
			res.status(context.status).send(html)
		})
	})

	// ngrok.connect(3000, console.log)

	return app
}
