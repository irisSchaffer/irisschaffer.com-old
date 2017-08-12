import { fromJS, Map } from 'immutable'

import * as constants from './constants'
import StartPage from './StartPage'
import Footer from './Footer'
import Post from './Post'

const initialSate = {
	startPage : new StartPage(),
	posts     : new Map(),
	footer    : new Footer(),
	fetched   : false
}

export default function (state = fromJS(initialSate), { type, content }) {
	switch (type) {
		case constants.SET_CONTENT:
			return state
				.set('fetched', true)
				.set('startPage', new StartPage(content.startPage))
				.set('footer', new Footer(content.footer))
				.set('posts', content.posts.reduce((res, post) => (
					res.set(post.id, new Post(post))
				), new Map()))

		default:
			return state
	}
}
