import { createStructuredSelector } from 'reselect'

import { startPageSelector } from 'data/content/selectors'

const tagSelector = (state, { match }) => match.params && match.params.tag

export default createStructuredSelector({
	startPage : startPageSelector,
	tag       : tagSelector
})
