import { Map } from 'immutable'

import * as constants from './constants'

const initialSate = new Map({
	shownPosts : 3
})

export default function (state = initialSate, { type, ...payload }) {
	switch (type) {
		case constants.LOAD_MORE :
			return state.update('shownPosts', shown => shown + payload.amount)

		default :
			return state
	}
}
