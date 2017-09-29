import { applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import history from './history'

export const sagaMiddleware = createSagaMiddleware()

export default () => {
	const middlewares = []

	middlewares.push(sagaMiddleware)
	middlewares.push(routerMiddleware(history))

	if (process.browser) {
		middlewares.push(
			createLogger({
				collapsed        : true,
				stateTransformer : state => state.toJS()
			})
		)
	}

	return applyMiddleware(...middlewares)
}
