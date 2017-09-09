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
		if (data instanceof Post) {
			super(data, name)
		} else {
			const preamble = data.preamble || data.body || ''
			const preambleStripped = preamble.length <= 400
				&& preamble
				|| truncate(striptags(markdown(preamble)), 400)

			super({
				...data,
				preamble : preambleStripped,
				body     : data.body && markdown(data.body),
				meta     : new Meta({
					...(data.meta || {}),
					title       : data.meta.title || data.title,
					description : data.meta.description || preambleStripped,
				}),
				tags : new Set(data.tags || [])
			}, name)
		}
	}

	publishedAtDate() {
		return new Date(this.publishedAt)
	}
}
