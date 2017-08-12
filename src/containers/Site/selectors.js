import { createStructuredSelector } from 'reselect'

import { footerSelector } from 'data/content/selectors'

export default createStructuredSelector({
	footer : footerSelector
})
