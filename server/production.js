const express = require('express')

const render = require('../build/render')
const assets = require('../build/assets.json')
const chunks = require('../build/chunks.json')
const icons = require('../build/icons.json')

const serveGzipped = contentType => (req, res, next) => {
	const acceptedEncodings = req.acceptsEncodings()
	if (!acceptedEncodings || acceptedEncodings.indexOf('gzip') === -1) {
		next()
		return
	}

	req.url = `${req.url}.gz`
	res.set('Content-Encoding', 'gzip')
	res.set('Content-Type', contentType)
	next()
}

module.exports = app => {
	app.get('*.js', serveGzipped('text/javascript'))
	app.get('*.css', serveGzipped('text/css'))

	app.use(express.static('./build', {
		immutable : true,
		maxAge    : '1y'
	}))

	app.use('*', render.default({ assets, chunks, icons }))

	return app
}
