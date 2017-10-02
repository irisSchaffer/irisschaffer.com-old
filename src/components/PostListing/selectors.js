import { createSelector, createStructuredSelector } from 'reselect'

import { startPageSelector, postsSelector } from 'data/content/selectors'

const tagsSelector = (state, props) => props.tags || []

const shownPostsSelector = (state, props) => props.shownPosts

const sortedPostsSelector = createSelector(
	startPageSelector,
	postsSelector,
	tagsSelector,
	(startPage, posts, tags) => {
		const selected = startPage.selected
			.toList()
			.map(id => posts.get(id))

		const sortedPosts = posts
			.toList()
			.sort((a, b) => (
				b.publishedAtDate().valueOf() - a.publishedAtDate().valueOf()
			))
			.filter(post => !startPage.selected.includes(post.id))

		const all = selected.concat(sortedPosts)

		if (tags.length > 0) {
			return all.filter(post => tags.some(tag => post.tags.includes(tag)))
		}

		return all
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
	loadMoreModule : loadMoreModuleSelector,
	posts          : paginatedPostsSelector,
	hasMorePosts   : hasMorePostsSelector
})
