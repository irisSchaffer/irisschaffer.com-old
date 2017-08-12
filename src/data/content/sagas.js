import { put, call, select } from 'redux-saga/effects'

import api from 'utilities/api'

import { setContent } from './actions'
import { contentSelector } from './selectors'

export function* fetchContent() {
	const response = yield call(api, {
		params : {
			query : `{
				startPage {
					id
					title
					subtitle
					image
					shownPosts
					selected {
						post {
							id
						}
					}
				}
				post {
					id
					slugs
					publishedAt
					title
					preamble
					body
				}
				footer {
					id
					text
				}
			}`
		}
	})

	const { startPage, post, footer } = response.data
	return {
		startPage : {
			...startPage[0],
			selected : startPage[0].selected.map((s) => s.post.id)
		},
		footer : footer[0],
		posts  : post
	}
}

export default function* contentSaga() {
	let content = yield select(contentSelector)

	if (!content.get('fetched')) {
		content = yield call(fetchContent)

		yield put(setContent(content))
	}
}
