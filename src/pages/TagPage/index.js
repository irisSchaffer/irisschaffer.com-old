import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { back } from 'data/routing/actions'
import { Records } from 'data/content'
import { PostListing } from 'containers'
import { MetaHelmet, Svg, Arrow } from 'components'

import selector from './selectors'

import styles from './styles.css'

class TagPage extends Component {
	static propTypes = {
		dispatch  : PropTypes.func.isRequired,
		startPage : PropTypes.instanceOf(Records.StartPage).isRequired,
		tag       : PropTypes.string.isRequired,
	}

	onBack = () => {
		this.props.dispatch(back())
	}

	render() {
		const { tag, startPage : { meta, shownPosts } } = this.props
		return (
			<div>
				<MetaHelmet meta={meta} />
				<header className={styles.header}>
					<button className={styles.arrow} onClick={this.onBack}>
						<Arrow direction="left" theme="dark" />
					</button>
					<h1><Svg.Tag /> {tag}</h1>
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
	}
}

export default withRouter(connect(selector)(TagPage))
