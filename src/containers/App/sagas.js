import { delay } from 'redux-saga'
import { put, call, race } from 'redux-saga/effects'
import { RequestTimeout } from 'http-errors'

import { addReducer } from 'utilities/reducers'
import { contentReducer, contentSaga } from 'data/content'

import { setLoaded, setError } from './actions'

export function* init() {
	addReducer(...contentReducer)

	yield put({ type : 'INIT' })

	yield call(contentSaga)
}

export default function* (timeout = 10000) {
	try {
		const results = yield race({
			done    : call(init),
			timeout : call(delay, timeout)
		})

		if (results.timeout) {
			throw new RequestTimeout()
		}
	} catch (err) {
		yield put(setError({
			message : err.message || 'Undefined Error',
			status  : err.status || 400
		}))
	}

	yield put(setLoaded(true))
}
