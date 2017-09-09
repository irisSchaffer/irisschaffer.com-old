import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import moment from 'moment'

import { Records } from 'data/content'
import { Link, Svg, Arrow } from 'components'

import styles from './styles.css'

const PostPreview = ({ className, post }) => (
	<article className={classnames(styles.root, className)}>
		<Link className={styles.wrapper} href={`/${post.slugs[0]}`}>
			<header className={styles.title}>
				<h2>{post.title}</h2>
				<aside className={styles.titleMeta}>
					<time
						className={styles.publishedAt}
						dateTime={post.publishedAt}
					>
						<Svg.Watch /> {moment(post.publishedAt).format('L LT')}
					</time>
					{post.tags.size > 0 && (
						<div className={styles.tags}>
							<Svg.Tag /> {post.tags.toArray().map(tag => <span>{tag}</span>)}
						</div>
					)}
				</aside>
			</header>
			<main
				className={styles.preamble}
				dangerouslySetInnerHTML={{ __html : post.preamble }}
			/>
			<div className={styles.arrow}>
				<Arrow />
			</div>
		</Link>
	</article>
)

PostPreview.propTypes = {
	className : PropTypes.string,
	post      : PropTypes.instanceOf(Records.Post).isRequired
}

PostPreview.defaultProps = {
	className : ''
}

export default PostPreview
