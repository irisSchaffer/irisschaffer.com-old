const prismic = require('prismic-javascript')
const apicache = require('apicache')
const humps = require('humps')
const bodyParser = require('body-parser')
const createGraphQL = require('./graphql')
const cache = apicache.middleware

const graphql = createGraphQL((fieldName, rootValue, args, context) =>
	rootValue && rootValue[fieldName] || context[fieldName]
)

let content = {}

const getApi = (req) => prismic.getApi(process.env.PRISMIC_API, {
	accessToken : process.env.PRISMIC_ACCESS_TOKEN,
	req
})

const getApiContent = (req) => getApi(req)
	.then((api) => api.query('', { pageSize : 100 }))
	.then((data) => {
		content = format(data.results)
	})

const expand = (field, all) => {
	if (typeof field !== 'object' && !Array.isArray(field) || !field) {
		return field
	}

	if (Array.isArray(field)) {
		return field.map((f) => expand(f, all))
	}

	if (field.linked_documents && field.linked_documents.length === 0) {
		return field
	}

	if (field.link_type) {
		const linked = all.find((entry) => entry.id === field.id)
		return expand(linked, all)
	}

	return Object.keys(field).reduce((result, key) => (
		Object.assign(result, { [key] : expand(field[key], all) })
	), {})
}

const groupByType = (data) => data.reduce((res, entry) => Object.assign(
	res,
	{
		[entry.type] : [
			...(res[entry.type] || []),
			entry
		]
	}
), {})

const format = (data) => {
	const merged = data
		.map(entry => Object.assign(entry, entry.data, { data : undefined }))

	const expanded = expand(merged, data)
	const grouped = groupByType(expanded)
	return humps.camelizeKeys(grouped)
}

module.exports = (app, path, cacheDuration = '1 day') => {
	app.use(
		`${path}/sync`,
		bodyParser.json(),
		(req, res) => {
			if (process.env.PRISMIC_WEBHOOK_SECRET && req.body.secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
				res.status(401).end()
			} else {
				getApiContent()
				apicache.clear()
				res.send('received')
			}
		}
	)

	app.use(path, cache(cacheDuration), (req, res) => {
		res.json(graphql(content, req.query.query))
	})

	getApiContent()
}
