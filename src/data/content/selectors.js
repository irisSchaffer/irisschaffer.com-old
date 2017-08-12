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

export const postBySlugSelector = slug => createSelector(
	postsSelector,
	posts => posts.find(post => post.get('slugs').containts(slug))
)
