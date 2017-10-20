const fs = require('fs')
const express = require('express')

const config = require('../lib/config')
const render = require('../build/render')
const assets = require('../build/assets.json')
const icons = require('../build/icons.json')

const runtime = fs.readFileSync(`${config.buildDir}/${assets.runtime.js}`, 'utf8')

const compressions = [
	{
		encoding  : 'br',
		extension : 'br'
	},
	{
		encoding  : 'gzip',
		extension : 'gz'
	}
]

const serveCompressed = contentType => (req, res, next) => {
	const acceptedEncodings = req.acceptsEncodings()
	const compression = compressions.find(
		comp => acceptedEncodings.indexOf(comp.encoding) !== -1
			&& fs.existsSync(`./build/${req.url}.${comp.extension}`)
	)
	if (compression) {
		req.url = `${req.url}.${compression.extension}`
		res.set('Content-Encoding', compression.encoding)
		res.set('Content-Type', contentType)
	}

	next()
}

module.exports = app => {
	app.get('*.js', serveCompressed('text/javascript'))
	app.get('*.css', serveCompressed('text/css'))

	app.use(express.static('./build', {
		immutable : true,
		maxAge    : '1y'
	}))

	app.use('*', render.default({ assets, runtime, icons }))

	return app
}
