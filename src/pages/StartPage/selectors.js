import { createSelector, createStructuredSelector } from 'reselect'

import { startPageSelector, postsSelector } from 'data/content/selectors'
import loadMoreModule from 'data/loadMore'

import { NAME } from './constants'

const tagSelector = (state, { match }) => match.params && match.params.tag

const loadMoreModuleSelector = createSelector(
	startPageSelector,
	startPage => loadMoreModule(NAME, startPage.shownPosts)
)

const shownPostsSelector = createSelector(
	state => state,
	loadMoreModuleSelector,
	(state, module) => module.selectors.shownPostsSelector(state)
)

const sortedPostsSelector = createSelector(
	startPageSelector,
	postsSelector,
	tagSelector,
	(startPage, posts, tag) => {
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

		if (tag) {
			return all.filter(post => post.tags.includes(tag))
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
	startPage      : startPageSelector,
	posts          : paginatedPostsSelector,
	hasMorePosts   : hasMorePostsSelector
})
