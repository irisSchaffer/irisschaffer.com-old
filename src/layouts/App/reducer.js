import { Map } from 'immutable'

import * as constants from './constants'

const initialState = new Map({
	loaded : false,
	error  : null
})

export default function (state = initialState, { type, payload }) {
	switch (type) {
		case constants.SET_LOADED :
			return state.set('loaded', payload.loaded)

		case constants.SET_ERROR :
			return state.set('error', payload.error)

		default :
			return state
	}
}
