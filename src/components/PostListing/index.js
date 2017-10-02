import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'immutable'

import { Button, PostPreview } from 'components'

import styles from './styles.css'

const PostListing = ({ posts, hasMore, onLoadMore, className }) => (
	<div className={className}>
		{posts.toArray().map(post => (
			<PostPreview
				key={post.id}
				post={post}
			/>
		))}
		{hasMore && (
			<section className={styles.loadMoreSection}>
				<Button onClick={onLoadMore} size="large">
					<h2>Load More</h2>
				</Button>
			</section>
		)}
	</div>
)

PostListing.propTypes = {
	className  : PropTypes.string,
	posts      : PropTypes.instanceOf(List).isRequired,
	hasMore    : PropTypes.bool.isRequired,
	onLoadMore : PropTypes.func.isRequired
}

PostListing.defaultProps = {
	className : ''
}

export default PostListing
