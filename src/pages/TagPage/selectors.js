import { createSelector, createStructuredSelector } from 'reselect'

import { startPageSelector, startPagePostsSelector } from 'data/content/selectors'

const tagSelector = (state, { match }) => match.params.tag

export const postsSelector = createSelector(
	startPagePostsSelector,
	tagSelector,
	(posts, tag) => posts.filter(post => post.tags.includes(tag))
)

export default createStructuredSelector({
	startPage : startPageSelector,
	tag       : tagSelector
})
