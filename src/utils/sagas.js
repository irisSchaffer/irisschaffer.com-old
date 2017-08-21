import { Map } from 'immutable'
import { END } from 'redux-saga'

import { sagaMiddleware } from 'utils/middleware'

let tasks = new Map()

export const addSaga = (key, saga, ...args) => {
	const task = sagaMiddleware.run(saga, ...args)
	tasks = tasks.set(key, task)
	return task
}

export const removeSaga = key => {
	if (!tasks.get(key)) return

	tasks.get(key).cancel()
	tasks = tasks.delete(key)
}

export default store => {
	store.dispatch(END)
	return tasks.map(saga => saga.done).toArray()
}
