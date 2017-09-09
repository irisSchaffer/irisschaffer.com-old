import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { Records } from 'data/content'
import { PostListing } from 'containers'
import { Header, MetaHelmet, Svg } from 'components'

import selector from './selectors'

import styles from './styles.css'

const TagPage = ({ tag, startPage }) => (
	<div>
		<MetaHelmet meta={startPage.meta} />
		<Header
			className={styles.header}
			title={startPage.title}
			image={startPage.image}
			socialLinks={startPage.socialLinks}
		>
			<h2><Svg.Tag /> {tag}</h2>
		</Header>
		<main>
			<PostListing
				shownPosts={startPage.shownPosts}
				tags={[tag]}
				className={styles.posts}
			/>
		</main>
	</div>
)

TagPage.propTypes = {
	startPage : PropTypes.instanceOf(Records.StartPage).isRequired,
	tag       : PropTypes.string.isRequired
}

export default withRouter(connect(selector)(TagPage))
