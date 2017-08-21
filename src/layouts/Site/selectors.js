import { createStructuredSelector } from 'reselect'

import { footerSelector, startPageSelector } from 'data/content/selectors'

export default createStructuredSelector({
	footer    : footerSelector,
	startPage : startPageSelector
})
