import { Map } from 'immutable'

import { LOCATION_CHANGE } from 'react-router-redux'
import * as constants from './constants'

const initialState = new Map({
	numberChanges             : 0,
	locationBeforeTransitions : null,
	lastLocation              : null
})

export default function (state = initialState, action) {
	switch (action.type) {
		// ROUTER

		case LOCATION_CHANGE:
			return state
				.update('numberChanges', (val) => val + 1)
				.set('lastLocation', state.get('locationBeforeTransitions'))
				.set('locationBeforeTransitions', action.payload)

		case constants.RESET:
			return state
				.set('numberChanges', initialState.get('numberChanges'))
				.set('lastLocation', initialState.get('lastLocation'))

		// DEFAULT

		default:
			return state
	}
}
