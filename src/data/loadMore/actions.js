import memoize from 'utils/memoize'
import constantsFactory from './constants'

const actionsFactory = prefix => {
	const constants = constantsFactory(prefix)

	const loadMore = amount => ({
		type    : constants.LOAD_MORE,
		payload : amount
	})

	const setShown = amount => ({
		type    : constants.SET_SHOWN,
		payload : amount
	})

	return { loadMore, setShown }
}

export default memoize(actionsFactory)
