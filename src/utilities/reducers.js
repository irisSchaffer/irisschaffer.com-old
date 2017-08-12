import { Map } from 'immutable'

import { save, load } from './persist'

let reducers = new Map()

export const addReducer = (key, reducer) => {
	reducers = reducers.set(key, reducer)
}

export const addPersistentReducer = (key, reducer, duration = 1000 * 60 * 60 * 24 * 1) => {
	const initialState = load(key)

	addReducer(key, (state = initialState, action) => {
		const newState = reducer(state, action)
		save(key, newState, duration)
		return newState
	})
}

export const removeReducer = key => {
	reducers = reducers.delete(key)
}

export default (prevState = new Map(), action) => reducers.reduce(
	(state, reducer, key) =>
		state.set(key, reducer(state.get(key), action))
	, prevState
)
