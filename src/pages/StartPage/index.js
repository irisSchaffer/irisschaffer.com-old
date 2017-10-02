import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'

import { Records } from 'data/content'
import { startPagePostsSelector } from 'data/content/selectors'
import withLoadMore from 'hocs/withLoadMore'
import { Header, MetaHelmet, PostListing } from 'components'
import { compose } from 'utils/hoc'

import selector from './selectors'
import styles from './styles.css'

class StartPage extends PureComponent {
	static propTypes = {
		history    : PropTypes.object.isRequired,
		hasMore    : PropTypes.bool.isRequired,
		entities   : PropTypes.instanceOf(List).isRequired,
		startPage  : PropTypes.instanceOf(Records.StartPage).isRequired,
		onLoadMore : PropTypes.func.isRequired,
		resetShown : PropTypes.func.isRequired
	}

	componentWillMount() {
		if (this.props.history.action === 'PUSH') {
			this.props.resetShown()
		}
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
						posts={this.props.entities}
						hasMore={this.props.hasMore}
						onLoadMore={this.props.onLoadMore}
						className={styles.posts}
					/>
				</main>
			</div>
		)
	}
}

export default compose(
	connect(selector),
	withLoadMore({
		path             : ['pages/start', 'shownPosts'],
		amount           : props => props.startPage.shownPosts,
		entitiesSelector : startPagePostsSelector
	})
)(StartPage)
