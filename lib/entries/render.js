import React from 'react'
import { RedBoxError } from 'redbox-react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'

import configureStore from 'utils/store'
import resolveSagas from 'utils/sagas'
import transit from 'utils/transit'

import Html from 'layouts/Html'
import App from 'layouts/App'

export default props => async (req, res) => {
	const store = configureStore()
	const context = { status : 200 }

	try {
		const app = (
			<Provider store={store}>
				<StaticRouter location={req.path} context={context}>
					<App />
				</StaticRouter>
			</Provider>
		)

		renderToString(app)

		const tasks = resolveSagas(store)

		if (tasks) {
			await Promise.all(tasks)
		}

		if (context.status >= 300 && context.status < 400) {
			res.redirect(context.status, context.url)
		} else {
			res.status(context.status)
			res.send(`<!doctype html>${renderToStaticMarkup(
				<Html
					state={transit.toJSON(store.getState())}
					content={renderToString(app)}
					{...props}
				/>
			)}`)
		}
	} catch (error) {
		res.status(500).send(renderToStaticMarkup(
			<StaticRouter location={req.path} context={context}>
				<RedBoxError error={error} />
			</StaticRouter>
		))
	}
}
