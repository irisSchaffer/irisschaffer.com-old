import { createSelector, createStructuredSelector } from 'reselect'

import { postBySlugSelector } from 'data/content/selectors'

const slugSelector = (state, { match }) => match.params.slug

const postSelector = (state, props) => createSelector(
	slugSelector,
	(slug) => postBySlugSelector(state, slug)
)(state, props)

export default createStructuredSelector({
	post : postSelector
})
