import { put, call, select } from 'redux-saga/effects'
import striptags from 'striptags'
import { truncate, markdown } from 'utils/string'

import { getContent } from './api'

import { setContent } from './actions'
import { contentSelector } from './selectors'

export function* fetchContent() {
	const { startPage, posts, footer } = yield call(getContent)

	return {
		startPage : formatStartPage(startPage),
		posts     : posts.map(formatPost),
		footer
	}
}

const getMeta = (data, defaults = {}) => ({
	image       : data.metaImage || defaults.image,
	title       : data.metaTitle || defaults.title,
	description : data.metaDescription || defaults.subtitle
})

const formatPost = post => {
	const preamble = post.preamble || post.body || ''
	const preambleStripped = preamble.length <= 400
		&& preamble
		|| truncate(striptags(markdown(preamble)), 400)

	return {
		...post,
		publishedAt : post.publishedAt || post.lastPublicationDate,
		preamble    : preambleStripped,
		body        : post.body && markdown(post.body),
		meta        : getMeta(post, {
			title       : post.title,
			description : preambleStripped
		})
	}
}

const formatStartPage = startPage => ({
	...startPage,
	selected    : startPage.selected.map((s) => s.post.id),
	socialLinks : {
		github   : startPage.githubLink,
		twitter  : startPage.twitterLink,
		facebook : startPage.facebookLink,
		linkedin : startPage.linkedinLink
	},
	meta : getMeta({
		title       : startPage.title,
		description : startPage.subtitle
	})
})

export default function* contentSaga() {
	let content = yield select(contentSelector)

	if (!content.get('fetched')) {
		content = yield call(fetchContent)

		yield put(setContent(content))
	}
}
