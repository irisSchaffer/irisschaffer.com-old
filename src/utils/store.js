import { Map } from 'immutable'
import { createStore, compose } from 'redux'

import configureMiddleware from './middleware'
import reducer from './reducers'
import { addAppSagas } from './sagas'

const composeEnhancers = process.browser ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose

export default (initialState = new Map()) => {
	const store = createStore(
		reducer,
		initialState,
		composeEnhancers(
			configureMiddleware()
		)
	)

	addAppSagas()

	if (module.hot) {
		module.hot.accept('./reducers', () => {
			System.import('./reducers').then(reducerModule => {
				store.replaceReducer(reducerModule.default)
			})
		})
	}

	return store
}
