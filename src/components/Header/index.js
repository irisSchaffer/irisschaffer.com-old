import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Image from 'data/content/Image'

import { Link } from 'components'

import styles from './styles.css'

const Header = ({ className, title, subtitle, image }) => (
	<header className={classnames(styles.root, className)}>
		<Link href={process.env.HOST}>
			<img {...image.props()} alt={image.alt} />
		</Link>
		<h1>{title}</h1>
		<h2>{subtitle}</h2>
	</header>
)


Header.propTypes = {
	className : PropTypes.string,
	title     : PropTypes.string.isRequired,
	subtitle  : PropTypes.string.isRequired,
	image     : PropTypes.instanceOf(Image).isRequired
}

Header.defaultProps = {
	className : ''
}

export default Header
