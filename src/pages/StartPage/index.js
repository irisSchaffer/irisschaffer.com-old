import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { List } from 'immutable'

import { addReducer } from 'utils/reducers'
import { Records } from 'data/content'
import { Header, MetaHelmet, PostListing } from 'components'
import loadMore from 'data/loadMore'

import selector from './selectors'

import styles from './styles.css'

export const NAME = 'pages/start'
const loadMoreModule = loadMore(NAME)

class StartPage extends PureComponent {
	static propTypes = {
		dispatch   : PropTypes.func.isRequired,
		location   : PropTypes.object.isRequired,
		hasMore    : PropTypes.bool.isRequired,
		shownPosts : PropTypes.number.isRequired,
		posts      : PropTypes.instanceOf(List).isRequired,
		startPage  : PropTypes.instanceOf(Records.StartPage).isRequired
	}

	componentWillMount() {
		const { location : { state }, dispatch, shownPosts, startPage } = this.props
		addReducer(NAME, loadMoreModule.reducer)
		if (state && state.link || shownPosts === 0) {
			dispatch(loadMoreModule.actions.setShown(
				startPage.shownPosts
			))
		}
	}

	onLoadMore = () => {
		this.props.dispatch(loadMoreModule.actions.loadMore(
			this.props.startPage.shownPosts
		))
	}

	render() {
		const { title, subtitle, image, meta, socialLinks } = this.props.startPage

		return (
			<div>
				<MetaHelmet meta={meta} />
				<Header
					title={title}
					subtitle={subtitle}
					image={image}
					socialLinks={socialLinks}
				/>
				<main>
					<PostListing
						posts={this.props.posts}
						hasMore={this.props.hasMore}
						onLoadMore={this.onLoadMore}
						className={styles.posts}
					/>
				</main>
			</div>
		)
	}
}

export default withRouter(connect(selector)(StartPage))
