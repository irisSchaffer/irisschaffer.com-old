import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import FooterRecord from 'data/content/Footer'
import StartPageRecord from 'data/content/StartPage'

import { StartPage, PostPage, TagPage } from 'pages'
import FooterModule from 'components/Footer'

import selector from './selectors'

import './styles.css'

const Site = ({ footer, startPage }) => (
	<div>
		<Helmet
			defaultTitle={startPage.meta.title}
			titleTemplate={`%s | ${startPage.meta.title}`}
		>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</Helmet>

		<Switch>
			<Route path="/" exact component={StartPage} />
			<Route path="/tags/:tag" exact component={TagPage} />
			<Route path="/:slug" component={PostPage} />
		</Switch>

		<FooterModule socialLinks={startPage.socialLinks}>
			{footer.text}
		</FooterModule>
	</div>
)

Site.propTypes = {
	footer    : PropTypes.instanceOf(FooterRecord).isRequired,
	startPage : PropTypes.instanceOf(StartPageRecord).isRequired
}

export default connect(selector)(Site)
