import { createSelector, createStructuredSelector } from 'reselect'

import { pagesSelector } from 'data/content/selectors'

export const uriSelector = (state, { match }) => match.params.uri

export const pageSelector = createSelector(
	uriSelector,
	pagesSelector,
	(uri, pages) => pages.get(uri)
)

export default createStructuredSelector({
	page : pageSelector
})
