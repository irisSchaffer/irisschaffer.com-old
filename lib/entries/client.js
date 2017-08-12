import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter, Route } from 'react-router-dom'

import configureStore from 'utilities/store'
import transit from 'utilities/transit'
import App from 'containers/App'

const initialState = window.__INITIAL_STATE__ ? transit.fromJSON(window.__INITIAL_STATE__) : undefined
const rootEl = document.getElementById('root')
const store = configureStore(initialState)

const render = Component => {
	ReactDOM.render((
		<AppContainer>
			<Provider store={store}>
				<BrowserRouter>
					<Route component={Component} />
				</BrowserRouter>
			</Provider>
		</AppContainer>
	), rootEl)
}

render(App)

if (module.hot) {
	module.hot.accept('containers/App', () =>
		render(App)
	)
}
