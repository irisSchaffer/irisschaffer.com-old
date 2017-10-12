import { Record, List, Set } from 'immutable'
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
			super({
				...data,
				meta : new Meta(data.meta || {}),
				tags : new Set(data.tags || [])
			}, name)
		}
	}

	publishedAtDate() {
		return new Date(this.publishedAt)
	}
}
