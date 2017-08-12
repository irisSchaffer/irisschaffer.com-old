import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './styles.css'

const Header = ({ className, title, subtitle, image }) => (
	<header className={classnames(styles.root, className)}>
		<img {...image} alt={image.alt} />
		<h1>{title}</h1>
		<h2>{subtitle}</h2>
	</header>
)

Header.propTypes = {
	className : PropTypes.string,
	title     : PropTypes.string.isRequired,
	subtitle  : PropTypes.string.isRequired,
	image     : PropTypes.object.isRequired
}

Header.defaultProps = {
	className : ''
}

export default Header
