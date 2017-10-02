import { Set } from 'immutable'
import { createSelector } from 'reselect'

import { NAME } from './constants'

export const contentSelector = state => state.get(NAME)

export const footerSelector = createSelector(
	contentSelector,
	content => content.get('footer')
)

export const startPageSelector = createSelector(
	contentSelector,
	content => content.get('startPage')
)

export const postsSelector = createSelector(
	contentSelector,
	content => content.get('posts')
)

export const postsByDateSelector = createSelector(
	postsSelector,
	posts => posts.toList().sort((a, b) => (
		b.publishedAtDate().valueOf() - a.publishedAtDate().valueOf()
	))
)

export const postBySlugSelector = createSelector(
	postsSelector,
	(state, slug) => slug,
	(posts, slug) => posts.find(post => post.slugs.includes(slug))
)

export const startPageSelectedPostsSelector = createSelector(
	startPageSelector,
	postsSelector,
	(startPage, posts) => startPage.selected.toList().map(id => posts.get(id))
)

export const startPagePostsSelector = createSelector(
	startPageSelectedPostsSelector,
	postsByDateSelector,
	(selectedPosts, postsByDate) => {
		const selectedIds = selectedPosts.map(post => post.id)
		return selectedPosts.concat(postsByDate.filter(
			post => !selectedIds.includes(post.id)
		)).toList()
	}
)
