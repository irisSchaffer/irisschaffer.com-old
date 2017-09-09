import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { List } from 'immutable'

import { addReducer, removeReducer } from 'utils/reducers'
import { Records } from 'data/content'
import { Header, Button, PostPreview, MetaHelmet } from 'components'

import selector from './selectors'

import styles from './styles.css'

class Startpage extends PureComponent {
	static propTypes = {
		loadMoreModule : PropTypes.object.isRequired,
		startPage      : PropTypes.instanceOf(Records.StartPage).isRequired,
		posts          : PropTypes.instanceOf(List).isRequired,
		hasMorePosts   : PropTypes.bool.isRequired,
		dispatch       : PropTypes.func.isRequired
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
				<main className={styles.posts}>
					{this.props.posts.toArray().map(post => (
						<PostPreview
							key={post.id}
							post={post}
						/>
					))}
					{this.props.hasMorePosts && (
						<section className={styles.loadMoreSection}>
							<Button onClick={this.loadMore} size="large">
								<h2>Load More</h2>
							</Button>
						</section>
					)}
				</main>
			</div>
		)
	}
}

export default withRouter(connect(selector)(Startpage))
