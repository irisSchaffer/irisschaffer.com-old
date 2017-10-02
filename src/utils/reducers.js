import { List } from 'immutable'
import isEqual from 'lodash/isEqual'

import { constants as routingConstants, reducer as routingReducer } from 'data/routing'
import { save, load } from './persist'

let reducers = new List()

export const persistentReducerFactory = (key, reducer) => (state = load(key), action) => {
	const newState = reducer(state, action)
	save(key, newState)
	return newState
}

export const addReducer = (path, reducer) => {
	reducers = reducers.push([path, reducer])
}

export const addPersistentReducer = (path, reducer) => {
	addReducer(path, persistentReducerFactory(JSON.stringify(path), reducer))
}

export const removeReducer = (path, reducer) => {
	const i = reducers.findIndex(([p, r]) => isEqual(p, path) && r === reducer)

	if (i >= 0) {
		reducers = reducers.delete(i)
	}
}

if (process.browser) {
	addPersistentReducer(routingConstants.NAME, routingReducer)
}

export default (prevState = new Map(), action) => reducers.reduce(
	(state, [path, reducer]) => {
		const pathArray = Array.isArray(path) && path || [path]
		return state.setIn(pathArray, reducer(state.getIn(pathArray), action))
	},
	prevState
)
