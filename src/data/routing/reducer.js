import { Map, List } from 'immutable'

import { LOCATION_CHANGE } from 'react-router-redux'
import browserHistory from 'utils/history'
import * as constants from './constants'

const initialState = new Map({
	locationBeforeTransitions : null,
	history                   : new List(),
	browserHistoryLength      : browserHistory.length
})

export default function (state = initialState, action) {
	switch (action.type) {
		// ROUTER

		case LOCATION_CHANGE:
			return state
				.set('locationBeforeTransitions', action.payload)
				.set('browserHistoryLength', browserHistory.length)
				.update('history', history => {
					const bhDiff = state.get('browserHistoryLength') - browserHistory.length
					if (
						bhDiff === 0
						|| (history.size !== 0 && history.last().pathname === action.payload.pathname)
					) {
						return history
					}

					return [...Array(Math.max(bhDiff + 1, 0))]
						.reduce((h) => h.pop(), history)
						.push(action.payload)
				})

		case constants.RESET:
			return state.set('history', initialState.get('history'))

		// DEFAULT

		default:
			return state
	}
}
