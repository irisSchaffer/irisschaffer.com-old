import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'

import { addReducer, removeReducer } from 'utilities/reducers'
import StartPage from 'data/content/StartPage'
import HeaderModule from 'components/Header'
import Button from 'components/Button'
import PostPreview from 'components/PostPreview'
import MetaHelmet from 'components/MetaHelmet'

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
		dispatch     : PropTypes.func.isRequired
	}

	componentWillMount() {
		addReducer(NAME, reducer)
	}

	componentWillUnmount() {
		removeReducer(NAME)
	}

	loadMore = () => {
		this.props.dispatch(loadMore(this.props.startPage.shownPosts))
	}

	render() {
		const { title, subtitle, image, meta } = this.props.startPage

		return (
			<div>
				<MetaHelmet meta={meta} />
				<HeaderModule
					title={title}
					subtitle={subtitle}
					image={image}
				/>
				<main className={styles.posts}>
					{this.props.posts.toJS().map(post => (
						<PostPreview
							key={post.id}
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

export default connect(selector)(Startpage)
