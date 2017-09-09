import { Collection } from 'immutable'
import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Svg, Link } from 'components'

import styles from './styles.css'

const Tags = ({ tags, className }) => {
	if (tags.size === 0) {
		return null
	}

	return (
		<div className={classnames(styles.root, className)}>
			<Svg.Tag />
			{tags.toArray().map(tag => [
				<Link href={`/tags/${tag}`} key={tag}>{tag}</Link>,
				<span> </span>
			])}
		</div>
	)
}

Tags.propTypes = {
	tags      : PropTypes.instanceOf(Collection).isRequired,
	className : PropTypes.string
}

Tags.defaultProps = {
	className : ''
}

export default Tags
