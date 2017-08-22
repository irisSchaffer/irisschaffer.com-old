import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Records } from 'data/content'

import { SocialLinks } from 'components'

import styles from './styles.css'

const Footer = ({ className, socialLinks, children }) => (
	<footer className={classnames(styles.root, className)}>
		{children}

		<SocialLinks className={styles.socialLinks} socialLinks={socialLinks} />
	</footer>
)

Footer.propTypes = {
	className   : PropTypes.string,
	children    : PropTypes.node.isRequired,
	socialLinks : PropTypes.instanceOf(Records.SocialLinks).isRequired
}

Footer.defaultProps = {
	className : ''
}

export default Footer
