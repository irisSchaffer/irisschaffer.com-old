const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const requireFromString = require('require-from-string')
const memwatch = require('memwatch-next')

const webpackConfigServer = require('../lib/config/webpack/render')
const webpackConfigClient = require('../lib/config/webpack/client')

const icons = require('../build/icons.json')

memwatch.on('leak', (info) => {
	console.error('Memory leak detected:\n', info)
})

module.exports = app => {
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

	app.use(express.static('./build'))
	app.use('*', (req, res) => {
		const context = { status : 200 }
		const filename = res.locals.webpackStats.toJson().assetsByChunkName.render
		const filepath = path.join(renderCompiler.outputPath, filename)
		const content = renderCompiler.outputFileSystem.readFileSync(filepath).toString()
		const render = requireFromString(content, filepath)

		render.default({ path : req.originalUrl, context, icons, dev : true }).then(html => {
			if (context.status >= 300 && context.status < 400) {
				res.redirect(context.status, context.url)
			} else {
				res.status(context.status).send(html)
			}
		})
	})

	return app
}
