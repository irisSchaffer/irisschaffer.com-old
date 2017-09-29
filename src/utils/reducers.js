import { Map } from 'immutable'

import { constants as routingConstants, reducer as routingReducer } from 'data/routing'
import { save, load } from './persist'

let reducers = new Map()

export const persistentReducerFactory = (key, reducer) => (state = load(key), action) => {
	const newState = reducer(state, action)
	save(key, newState)
	return newState
}

export const addReducer = (key, reducer) => {
	reducers = reducers.set(key, reducer)
}

export const addPersistentReducer = (key, reducer) => {
	addReducer(key, persistentReducerFactory(key, reducer))
}

export const removeReducer = key => {
	reducers = reducers.delete(key)
}

if (process.browser) {
	addPersistentReducer(routingConstants.NAME, routingReducer)
}

export default (prevState = new Map(), action) => reducers.reduce(
	(state, reducer, key) => state.set(key, reducer(state.get(key), action)),
	prevState
)
