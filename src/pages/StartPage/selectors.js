import { createStructuredSelector } from 'reselect'

import { startPageSelector } from 'data/content/selectors'

export default createStructuredSelector({
	startPage : startPageSelector
})
