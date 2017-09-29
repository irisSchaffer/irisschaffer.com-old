const express = require('express')

const render = require('../build/render')
const assets = require('../build/assets.json')
const chunks = require('../build/chunks.json')
const icons = require('../build/icons.json')

module.exports = app => {
	app.use(express.static('./build'))
	app.use('*', render.default({ assets, chunks, icons }))

	return app
}
