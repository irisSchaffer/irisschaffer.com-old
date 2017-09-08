const express = require('express')

const render = require('../build/render').default
const assets = require('../build/assets.json')
const chunks = require('../build/chunks.json')
const icons = require('../build/icons.json')

module.exports = app => {
	app.use(express.static('./build'))
	app.use('*', (req, res) => {
		const context = { status : 200 }
		render({ path : req.originalUrl, context, assets, chunks, icons })
			.then(html => {
				res.status(context.status).send(html)
			})
	})

	return app
}
