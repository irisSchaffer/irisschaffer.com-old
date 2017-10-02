import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { List } from 'immutable'

import { compose } from 'utils/hoc'
import withLoadMore from 'hocs/withLoadMore'
import { back } from 'data/routing/actions'
import { Records } from 'data/content'
import { MetaHelmet, Svg, Arrow, PostListing } from 'components'

import selector, { postsSelector } from './selectors'
import styles from './styles.css'

export const NAME = 'pages/tag'

class TagPage extends Component {
	static propTypes = {
		dispatch   : PropTypes.func.isRequired,
		history    : PropTypes.object.isRequired,
		startPage  : PropTypes.instanceOf(Records.StartPage).isRequired,
		tag        : PropTypes.string.isRequired,
		hasMore    : PropTypes.bool.isRequired,
		entities   : PropTypes.instanceOf(List).isRequired,
		onLoadMore : PropTypes.func.isRequired,
		resetShown : PropTypes.func.isRequired
	}

	componentWillMount() {
		if (this.props.history.action === 'PUSH') {
			this.props.resetShown()
		}
	}

	onBack = () => {
		this.props.dispatch(back())
	}

	render() {
		const {
			startPage : { meta },
			tag, onLoadMore, entities, hasMore
		} = this.props
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
						posts={entities}
						hasMore={hasMore}
						onLoadMore={onLoadMore}
						className={styles.posts}
					/>
				</main>
			</div>
		)
	}
}

export default compose(
	withRouter,
	connect(selector),
	withLoadMore({
		entitiesSelector : postsSelector,
		path             : props => ['pages/tag', props.tag, 'shownPosts'],
		amount           : props => props.startPage.shownPosts
	})
)(TagPage)
