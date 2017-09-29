import { put, select, takeEvery, take, fork } from 'redux-saga/effects'
import { goBack, push, LOCATION_CHANGE } from 'react-router-redux'

import { BACK } from './constants'
import { hasHistorySelector, browserHistoryLengthSelector } from './selectors'

export function* back() {
	const hasHistory = yield select(hasHistorySelector)

	if (hasHistory) {
		yield put(goBack())
	}

	yield put(push({ pathname : '/' }))
}

function* scrollUp() {
	let historyBefore = yield select(browserHistoryLengthSelector)
	while (true) {
		yield take(LOCATION_CHANGE)
		const historyAfter = yield select(browserHistoryLengthSelector)

		if (historyBefore !== historyAfter) {
			window.scroll(0, 0)
		}

		historyBefore = historyAfter
	}
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
	yield fork(scrollUp)
	yield takeEvery(BACK, back)
	yield takeEvery(LOCATION_CHANGE, scrollToHash)
}
