import { put, select, takeEvery } from 'redux-saga/effects'
import { goBack, push, LOCATION_CHANGE } from 'react-router-redux'

import { BACK } from './constants'
import { hasHistorySelector } from './selectors'

export function* back() {
	const hasHistory = yield select(hasHistorySelector)

	if (hasHistory) {
		yield put(goBack())
	}

	yield put(push({ pathname : '/' }))
}

function* scrollUpIfNecessary({ payload : { state } }) {
	if (!state || !state.link) {
		return
	}

	window.scroll(0, 0)
}

function scrollToHash({ payload }) {
	if (payload.hash) {
		hashLinkScroll(payload.hash.replace('#', ''))
	}
}

function hashLinkScroll(hash, retryCount = 0, retryLimit = 300) {
	window.requestAnimationFrame(() => {
		const element = document.getElementById(hash)
		if (element) {
			element.scrollIntoView()
		} else if (retryCount < retryLimit) {
			setTimeout(hashLinkScroll(hash, retryCount + 1), 100)
		}
	})
}

export default function* () {
	yield takeEvery(BACK, back)
	yield takeEvery(LOCATION_CHANGE, scrollUpIfNecessary)
	yield takeEvery(LOCATION_CHANGE, scrollToHash)
}
