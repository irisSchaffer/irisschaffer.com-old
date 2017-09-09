import { Record, List, Set } from 'immutable'
import striptags from 'striptags'
import { truncate, markdown } from 'utils/string'
import Meta from './Meta'

const PostRecord = Record({
	id          : '',
	title       : '',
	meta        : new Meta(),
	slugs       : new List(),
	publishedAt : null,
	preamble    : '',
	body        : '',
	tags        : new Set()
}, 'post')

export default class Post extends PostRecord {
	constructor(data = { meta : {} }, name) {
		const preamble = data.preamble || data.body || ''
		const preambleStripped = truncate(striptags(markdown(preamble)), 400)

		const initData = data instanceof Post
			? data
			: {
				...data,
				preamble : preambleStripped,
				body     : data.body && markdown(data.body),
				meta     : new Meta({
					...(data.meta || {}),
					title       : data.meta.title || data.title,
					description : data.meta.description || preambleStripped,
				}),
				tags : new Set(data.tags || [])
			}

		super(initData, name)
	}

	publishedAtDate() {
		return new Date(this.publishedAt)
	}
}
