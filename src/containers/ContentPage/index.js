import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'

import PageRecord from 'data/content/Page'

import Page from 'layouts/Page'
import Wrapper from 'layouts/Wrapper'
import Section from 'layouts/Section'
import Content from 'layouts/Content'

import selector from './selectors'

const ContentPage = ({ page }) => (
	<Page title={page.get('title')}>
		<Section>
			<Wrapper style={{ maxWidth : '600px' }}>
				<Content>
					<h1>{page.get('title')}</h1>
					<ReactMarkdown source={page.get('content')} />
				</Content>
			</Wrapper>
		</Section>
	</Page>
)

ContentPage.propTypes = {
	page : PropTypes.instanceOf(PageRecord).isRequired
}

export default connect(selector)(ContentPage)
