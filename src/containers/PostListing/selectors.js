import { createSelector, createStructuredSelector } from 'reselect'

import { startPageSelector, postsSelector } from 'data/content/selectors'
import loadMoreModule from 'data/loadMore'

const tagsSelector = (state, props) => props.tags || []

const loadMoreModuleSelector = createSelector(
	startPageSelector,
	startPage => loadMoreModule('postListing', startPage.shownPosts)
)

const shownPostsSelector = createSelector(
	state => state,
	loadMoreModuleSelector,
	(state, module) => module.selectors.shownPostsSelector(state)
)

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
