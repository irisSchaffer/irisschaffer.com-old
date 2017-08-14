import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { List } from 'immutable'

import { addReducer, removeReducer } from 'utilities/reducers'
import HeaderModule from 'components/Header'
import StartPage from 'data/content/StartPage'
import Button from 'components/Button'
import PostPreview from 'components/PostPreview'

import { NAME } from './constants'
import reducer from './reducer'
import selector from './selectors'
import { loadMore } from './actions'

import styles from './styles.css'

class Startpage extends PureComponent {
	static propTypes = {
		startPage    : PropTypes.instanceOf(StartPage).isRequired,
		posts        : PropTypes.instanceOf(List).isRequired,
		hasMorePosts : PropTypes.bool.isRequired,
		history      : PropTypes.object.isRequired,
		dispatch     : PropTypes.func.isRequired
	}

	componentWillMount() {
		addReducer(NAME, reducer)
	}

	componentWillUnmount() {
		removeReducer(NAME)
	}

	link = (post) => () => {
		this.props.history.push(post.slugs[0])
	}

	loadMore = () => {
		this.props.dispatch(loadMore(this.props.startPage.shownPosts))
	}

	render() {
		const { title, subtitle, image } = this.props.startPage

		return (
			<div>
				<HeaderModule
					title={title}
					subtitle={subtitle}
					image={image.props()}
				/>
				<main className={styles.posts}>
					{this.props.posts.toJS().map(post => (
						<PostPreview
							key={post.id}
							onClick={this.link(post)}
							{...post}
						/>
					))}
					{this.props.hasMorePosts && (
						<section className={styles.loadMoreSection}>
							<Button onClick={this.loadMore} size="large">
								Load More
							</Button>
						</section>
					)}
				</main>
			</div>
		)
	}
}

export default withRouter(connect(selector)(Startpage))
