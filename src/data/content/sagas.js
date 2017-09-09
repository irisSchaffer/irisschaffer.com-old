import { put, call, select } from 'redux-saga/effects'

import api from 'utils/api'

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
					metaTitle
					metaDescription
					metaImage
					githubLink
					twitterLink
					facebookLink
					linkedinLink
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
					tags
					metaTitle
					metaDescription
					metaImage
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

	const { post, footer } = response.data
	const startPage = response.data.startPage[0]

	return {
		startPage : {
			...startPage,
			selected    : startPage.selected.map((s) => s.post.id),
			meta        : getMeta(startPage),
			socialLinks : {
				github   : startPage.githubLink,
				twitter  : startPage.twitterLink,
				facebook : startPage.facebookLink,
				linkedin : startPage.linkedinLink
			}
		},
		footer : footer[0],
		posts  : post.map(p => ({
			...p,
			meta : getMeta(p)
		}))
	}
}

const getMeta = obj => ({
	title       : obj.metaTitle,
	description : obj.metaDescription,
	image       : obj.metaImage
})

export default function* contentSaga() {
	let content = yield select(contentSelector)

	if (!content.get('fetched')) {
		content = yield call(fetchContent)

		yield put(setContent(content))
	}
}
