import { createStructuredSelector } from 'reselect'

import { startPageSelector, startPagePostsSelector } from 'data/content/selectors'
import loadMoreSelectorsFactory from 'data/loadMore/selectors'
import { NAME } from './index'

const shownPostsSelector = state => state.get(NAME) || 0

const loadMoreSelectors = loadMoreSelectorsFactory(
	startPagePostsSelector,
	shownPostsSelector
)

export default createStructuredSelector({
	startPage  : startPageSelector,
	shownPosts : shownPostsSelector,
	hasMore    : loadMoreSelectors.hasMore,
	posts      : loadMoreSelectors.paginatedEntities,
})
