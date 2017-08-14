import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import FooterRecord from 'data/content/Footer'
import StartPageRecord from 'data/content/StartPage'

import StartPage from 'containers/StartPage'
import PostPage from 'containers/PostPage'
import HeaderModule from 'components/Header'
import FooterModule from 'components/Footer'

import selector from './selectors'

import './styles.css'

const Site = ({ footer, startPage : { title, subtitle, image } }) => (
	<div>
		<Helmet
			defaultTitle="Blog"
			titleTemplate="%s | Blog"
		>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</Helmet>

		{/*<HeaderModule
			title={title}
			subtitle={subtitle}
			image={image.props()}
		/>*/}

		<Switch>
			<Route path="/" exact component={StartPage} />
			<Route path="/:slug" component={PostPage} />
		</Switch>

		<FooterModule>{footer.text}</FooterModule>
	</div>
)

Site.propTypes = {
	footer    : PropTypes.instanceOf(FooterRecord).isRequired,
	startPage : PropTypes.instanceOf(StartPageRecord).isRequired
}

export default connect(selector)(Site)
