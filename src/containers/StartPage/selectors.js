import { createSelector, createStructuredSelector } from 'reselect'

import { startPageSelector, postsSelector } from 'data/content/selectors'

import { NAME } from './constants'

const shownPostsSelector = state => state.getIn([NAME, 'shownPosts'], 3)

const sortedPostsSelector = createSelector(
	startPageSelector,
	postsSelector,
	(startPage, posts) => {
		const selected = startPage.selected
			.toList()
			.map(id => posts.get(id))

		const sortedPosts = posts
			.toList()
			.sort((a, b) => (
				a.publishedAtDate().valueOf() - b.publishedAtDate().valueOf()
			))
			.filter(post => !startPage.selected.includes(post.id))

		return selected.concat(sortedPosts)
	}
)

const paginatedPostsSelector = createSelector(
	sortedPostsSelector,
	shownPostsSelector,
	(posts, shown) => posts.slice(0, shown)
)

const hasMorePostsSelector = createSelector(
	sortedPostsSelector,
	shownPostsSelector,
	(posts, shown) => posts.size > shown
)

export default createStructuredSelector({
	startPage    : startPageSelector,
	posts        : paginatedPostsSelector,
	hasMorePosts : hasMorePostsSelector
})
