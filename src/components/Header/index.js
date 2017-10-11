import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Records } from 'data/content'

import { Link, SocialLinks } from 'components'

import styles from './styles.css'

const Header = ({ className, title, subtitle, image, socialLinks, children }) => (
	<header className={classnames(styles.root, className)}>
		<Link href={process.env.HOST} aria-label="irisschaffer.com">
			<img {...image.props()} alt={image.alt} />
		</Link>
		{title && <h1>{title}</h1>}
		{subtitle && <h2>{subtitle}</h2>}
		{children}
		<SocialLinks className={styles.socialLinks} socialLinks={socialLinks} />
	</header>
)

Header.propTypes = {
	className   : PropTypes.string,
	children    : PropTypes.node,
	title       : PropTypes.string,
	subtitle    : PropTypes.string,
	image       : PropTypes.instanceOf(Records.Image).isRequired,
	socialLinks : PropTypes.instanceOf(Records.SocialLinks).isRequired
}

Header.defaultProps = {
	className : '',
	title     : '',
	subtitle  : '',
	children  : null
}

export default Header
