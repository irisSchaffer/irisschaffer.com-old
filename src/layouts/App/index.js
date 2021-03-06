import React, { PureComponent } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addReducer } from 'utils/reducers'
import { addSaga } from 'utils/sagas'
import { Site } from 'layouts'
import { Error as ErrorModule, Loading } from 'components'

import { NAME } from './constants'
import selector from './selectors'
import reducer from './reducer'
import loadData from './sagas'

class App extends PureComponent {
	static propTypes = {
		loaded : PropTypes.bool.isRequired,
		error  : PropTypes.object
	}

	static defaultProps = {
		error : null
	}

	componentWillMount() {
		addReducer(NAME, reducer)
		addSaga(loadData)
	}

	render() {
		const { loaded, error } = this.props

		if (error) {
			return <ErrorModule {...error} />
		}

		if (!loaded) {
			return <Loading />
		}

		return <Route component={Site} />
	}
}

export default connect(selector)(App)
