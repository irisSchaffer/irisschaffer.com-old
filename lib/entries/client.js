import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { Route } from 'react-router-dom'

import { ConnectedRouter } from 'react-router-redux'

import configureStore from 'utils/store'
import transit from 'utils/transit'
import history from 'utils/history'
import App from 'layouts/App'

const initialState = window.__INITIAL_STATE__ ? transit.fromJSON(window.__INITIAL_STATE__) : undefined
const rootEl = document.getElementById('root')
const store = configureStore(initialState)

const render = Component => {
	ReactDOM.render((
		<AppContainer>
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<Route component={Component} />
				</ConnectedRouter>
			</Provider>
		</AppContainer>
	), rootEl)
}

render(App)

if (module.hot) {
	module.hot.accept('layouts/App', () => { render(App) })
}
