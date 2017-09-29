import { Set } from 'immutable'
import { END } from 'redux-saga'

import { sagaMiddleware } from 'utils/middleware'
import { sagas as routingSaga } from 'data/routing'

let tasks = new Set()
const appSagas = [
	routingSaga
]

export const addSaga = (saga, ...args) => {
	const task = sagaMiddleware.run(saga, ...args)
	tasks = tasks.add(task)
	task.done.then(() => tasks.delete(saga))
	return task
}

export const removeSaga = saga => {
	if (!tasks.includes(saga)) return

	tasks.get(saga).cancel()
	tasks = tasks.delete(saga)
}

export const addAppSagas = () => appSagas.map(saga => addSaga(saga))

export const endSagas = store => {
	store.dispatch(END)
}

export const getTaskPromises = () => tasks.map(saga => saga.done).toArray()
