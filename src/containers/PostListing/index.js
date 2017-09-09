import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'

import { addReducer, removeReducer } from 'utils/reducers'
import { Button, PostPreview } from 'components'

import selector from './selectors'

import styles from './styles.css'

class PostListing extends Component {
	static propTypes = {
		className      : PropTypes.string,
		loadMoreModule : PropTypes.object.isRequired,
		posts          : PropTypes.instanceOf(List).isRequired,
		hasMorePosts   : PropTypes.bool.isRequired,
		dispatch       : PropTypes.func.isRequired,
		shownPosts     : PropTypes.number.isRequired
	}

	static defaultProps = {
		className : '',
		tags      : []
	}

	componentWillMount() {
		const { loadMoreModule } = this.props
		addReducer(loadMoreModule.constants.NAME, loadMoreModule.reducer)
	}

	componentWillUnmount() {
		removeReducer(this.props.loadMoreModule.constants.NAME)
	}

	loadMore = () => {
		this.props.dispatch(this.props.loadMoreModule.actions.loadMore(
			this.props.shownPosts
		))
	}

	render() {
		const { posts, hasMorePosts, className } = this.props

		return (
			<div className={className}>
				{posts.toArray().map(post => (
					<PostPreview
						key={post.id}
						post={post}
					/>
				))}
				{hasMorePosts && (
					<section className={styles.loadMoreSection}>
						<Button onClick={this.loadMore} size="large">
							<h2>Load More</h2>
						</Button>
					</section>
				)}
			</div>
		)
	}
}

export default connect(selector)(PostListing)
