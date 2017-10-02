import { createSelector, createStructuredSelector } from 'reselect'

import { startPageSelector, startPagePostsSelector } from 'data/content/selectors'
import loadMoreSelectorsFactory from 'data/loadMore/selectors'
import { NAME } from './index'

const tagSelector = (state, { match }) => match.params.tag
const reducerNameSelector = createSelector(
	tagSelector,
	tag => `${NAME}/${tag}`
)

const postsSelector = createSelector(
	startPagePostsSelector,
	tagSelector,
	(posts, tag) => posts.filter(post => post.tags.includes(tag))
)

const shownPostsSelector = createSelector(
	state => state,
	reducerNameSelector,
	(state, reducerName) => state.get(reducerName) || 0
)

const loadMoreSelectors = loadMoreSelectorsFactory(
	postsSelector,
	shownPostsSelector
)

export default createStructuredSelector({
	startPage   : startPageSelector,
	shownPosts  : shownPostsSelector,
	hasMore     : loadMoreSelectors.hasMore,
	posts       : loadMoreSelectors.paginatedEntities,
	reducerName : reducerNameSelector,
	tag         : tagSelector
})
