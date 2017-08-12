import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Footer from 'data/content/Footer'

import StartPage from 'containers/StartPage'
import FooterModule from 'components/Footer'

import selector from './selectors'

import './styles.css'

const Site = ({ footer }) => (
	<div>
		<Helmet
			defaultTitle="Blog"
			titleTemplate="%s | Blog"
		>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</Helmet>

		<Switch>
			<Route path="/" exact component={StartPage} />
			{/*<Route path="/:slug" component={ContentPage} />*/}
		</Switch>

		<FooterModule>{footer.text}</FooterModule>
	</div>
)

Site.propTypes = {
	footer : PropTypes.instanceOf(Footer).isRequired
}

export default connect(selector)(Site)
