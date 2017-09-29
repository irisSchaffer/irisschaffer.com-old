import { put, select, takeEvery } from 'redux-saga/effects'
import { goBack, push, replace, LOCATION_CHANGE } from 'react-router-redux'

import { reset } from './actions'
import { BACK } from './constants'
import { hasHistorySelector, lastLocationSelector } from './selectors'

export function* back() {
	const hasHistory = yield select(hasHistorySelector)

	if (hasHistory) {
		yield put(goBack())
		return
	}

	yield put(push({ pathname : '/' }))
}

function* scrollUp({ payload }) {
	console.log(payload)
	const prevLocation = yield select(lastLocationSelector)
	if (!prevLocation) {
		return
	}

	const pathChanged = prevLocation.pathname !== payload.pathname
	if (pathChanged) {
		window.scrollTo(0, 0)
	}
}

function* resetHistoryIfReferred() {
	if (document.referrer && !document.referrer.includes('localhost') && !document.referrer.includes(process.env.HOST)) {
		yield put(reset())
	}
}

function* redirectOnTrailingSlash({ payload : { pathname, ...rest } }) {
	if (pathname[pathname.length - 1] === '/' && pathname.length > 1) {
		yield put(replace({
			...rest,
			pathname : pathname.substr(0, pathname.length - 1)
		}))
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
	yield takeEvery(BACK, back)
	yield takeEvery(LOCATION_CHANGE, scrollUp)
	yield takeEvery(LOCATION_CHANGE, scrollToHash)
	yield takeEvery(LOCATION_CHANGE, redirectOnTrailingSlash)
}
