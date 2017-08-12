import { applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

export const sagaMiddleware = createSagaMiddleware()

export default () => {
	const middlewares = []

	middlewares.push(sagaMiddleware)

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
