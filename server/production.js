const express = require('express')

const render = require('../build/render')
const assets = require('../build/assets.json')
const chunks = require('../build/chunks.json')
const icons = require('../build/icons.json')

module.exports = app => {
	const context = {}

	app.use(express.static('./build'))
	app.use('*', (req, res) => {
		render.default({ path : req.originalUrl, context, assets, chunks, icons }).then(html => {
			res.status(context.status).send(html)
		})
	})

	return app
}
