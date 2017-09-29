import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { Records } from 'data/content'
import { PostListing } from 'containers'
import { MetaHelmet, Svg, Arrow } from 'components'

import selector from './selectors'

import styles from './styles.css'

const TagPage = ({ tag, startPage : { meta, shownPosts } }) => (
	<div>
		<MetaHelmet meta={meta} />
		<header className={styles.header}>
			<button className={styles.arrow}>
				<Arrow direction="left" theme="dark" />
			</button>
			<h2><Svg.Tag /> {tag}</h2>
		</header>
		<main>
			<PostListing
				shownPosts={shownPosts}
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
