import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import moment from 'moment'

import { Records } from 'data/content'
import { Link, Svg, Arrow, Tags } from 'components'

import styles from './styles.css'

const PostPreview = ({ className, post }) => (
	<article className={classnames(styles.root, className)}>
		<div className={styles.wrapper}>
			<header className={styles.title}>
				<Link href={`/${post.slugs[0]}`}><h2>{post.title}</h2></Link>
				<aside className={styles.titleMeta}>
					<time
						className={styles.publishedAt}
						dateTime={post.publishedAt}
					>
						<Svg.Watch /> {moment(post.publishedAt).format('L LT')}
					</time>
					<Tags tags={post.tags} className={styles.tags} />
				</aside>
			</header>
			<Link href={`/${post.slugs[0]}`} className={styles.preamble}>
				<div
					dangerouslySetInnerHTML={{ __html : post.preamble }}
				/>
			</Link>
			<Link
				href={`/${post.slugs[0]}`}
				className={styles.arrow}
				aria-label="Read more"
			>
				<Arrow />
			</Link>
		</div>
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
