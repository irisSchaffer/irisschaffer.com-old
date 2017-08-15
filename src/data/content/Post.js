import { Record, List } from 'immutable'
import { truncate, stripHtml, markdown } from 'utilities/string'

const PostRecord = Record({
	id          : '',
	title       : '',
	slugs       : new List(),
	publishedAt : null,
	preamble    : '',
	body        : ''
}, 'post')

export default class Post extends PostRecord {
	constructor(data = {}) {
		const preamble = data.preamble || data.body || ''
		const preambleStripped = stripHtml(markdown(preamble))

		super({
			...data,
			preamble : truncate(preambleStripped, 400),
			body     : data.body && markdown(data.body)
		})
	}

	publishedAtDate() {
		return new Date(this.publishedAt)
	}
}
