import { Set } from 'immutable'
import { END } from 'redux-saga'

import { sagaMiddleware } from 'utils/middleware'

let tasks = new Set()

export const addSaga = (saga, ...args) => {
	const task = sagaMiddleware.run(saga, ...args)
	tasks = tasks.add(task)
	return task
}

export const removeSaga = saga => {
	if (!tasks.includes(saga)) return

	tasks.get(saga).cancel()
	tasks = tasks.delete(saga)
}

export default store => {
	store.dispatch(END)
	return tasks.map(saga => saga.done).toArray()
}
