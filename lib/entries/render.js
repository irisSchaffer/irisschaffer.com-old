import React from 'react'
import { RedBoxError } from 'redbox-react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'

import configureStore from 'utilities/store'
import resolveSagas from 'utilities/sagas'
import transit from 'utilities/transit'

import { Html, App } from 'layouts'

const isDev = process.env.NODE_ENV !== 'production'

export default async ({ path, context = {}, ...rest }) => {
	const store = configureStore()
	context.status = 200

	try {
		const app = (
			<Provider store={store}>
				<StaticRouter location={path} context={context}>
					<App />
				</StaticRouter>
			</Provider>
		)

		renderToString(app)

		const tasks = resolveSagas(store)

		if (tasks) {
			await Promise.all(tasks)
		}

		return `<!doctype html>${renderToStaticMarkup(
			<Html
				state={transit.toJSON(store.getState())}
				content={renderToString(app)}
				dev={isDev}
				{...rest}
			/>
		)}`
	} catch (error) {
		console.error(error)
		return renderToStaticMarkup(
			<StaticRouter location={path} context={context}>
				<RedBoxError error={error} />
			</StaticRouter>
		)
	}
}
