import memoize from 'utils/memoize'
import constantsFactory from './constants'

const reducerFactory = (
	prefix,
	initialState = 0
) => {
	const constants = constantsFactory(prefix)

	const reducer = (state = initialState, { type, payload }) => {
		switch (type) {
			case constants.LOAD_MORE:
				return state + payload

			case constants.SET_SHOWN:
				return payload

			default:
				return state
		}
	}

	return reducer
}

export default memoize(reducerFactory)
