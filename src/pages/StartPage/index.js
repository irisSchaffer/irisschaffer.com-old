import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'

import { addReducer, removeReducer } from 'utils/reducers'
import { Records } from 'data/content'
import { Header, Button, PostPreview, MetaHelmet } from 'components'

import { NAME } from './constants'
import reducer from './reducer'
import selector from './selectors'
import { loadMore } from './actions'

import styles from './styles.css'

class Startpage extends PureComponent {
	static propTypes = {
		startPage    : PropTypes.instanceOf(Records.StartPage).isRequired,
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
				<Header
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
