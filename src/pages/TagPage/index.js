import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { List } from 'immutable'

import { addReducer } from 'utils/reducers'
import { back } from 'data/routing/actions'
import { Records } from 'data/content'
import loadMore from 'data/loadMore'
import { MetaHelmet, Svg, Arrow, PostListing } from 'components'

import selector from './selectors'
import styles from './styles.css'

export const NAME = 'pages/tag'

class TagPage extends Component {
	static propTypes = {
		dispatch    : PropTypes.func.isRequired,
		history     : PropTypes.object.isRequired,
		startPage   : PropTypes.instanceOf(Records.StartPage).isRequired,
		tag         : PropTypes.string.isRequired,
		shownPosts  : PropTypes.number.isRequired,
		hasMore     : PropTypes.bool.isRequired,
		posts       : PropTypes.instanceOf(List).isRequired,
		reducerName : PropTypes.string.isRequired
	}

	componentWillMount() {
		const { reducerName, startPage, history : { action } } = this.props
		this.loadMoreModule = loadMore(reducerName, startPage.shownPosts)
		addReducer(reducerName, this.loadMoreModule.reducer)

		console.log(action, this.props.shownPosts)
		if (action === 'PUSH' || this.props.shownPosts === 0) {
			this.props.dispatch(this.loadMoreModule.actions.setShown(startPage.shownPosts))
		}
	}

	onBack = () => {
		this.props.dispatch(back())
	}

	onLoadMore = () => {
		this.props.dispatch(this.loadMoreModule.actions.loadMore(
			this.props.startPage.shownPosts
		))
	}

	render() {
		const { tag, startPage : { meta }, posts, hasMore } = this.props
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
						posts={posts}
						hasMore={hasMore}
						onLoadMore={this.onLoadMore}
						className={styles.posts}
					/>
				</main>
			</div>
		)
	}
}

export default withRouter(connect(selector)(TagPage))
