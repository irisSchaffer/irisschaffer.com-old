import * as constants from './constants'

export const loadMore = (amount) => ({
	type : constants.LOAD_MORE,
	amount
})
