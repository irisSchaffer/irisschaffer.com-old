import { Record, List } from 'immutable'

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
		super({
			...data,
			preamble : data.preamble || data.body && data.body.split('').slice(0, 300).join('')
		})
	}

	publishedAtDate() {
		return new Date(this.publishedAt)
	}
}
