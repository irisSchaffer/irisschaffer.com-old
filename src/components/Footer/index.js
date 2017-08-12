import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './styles.css'

const Footer = ({ className, children }) => (
	<footer className={classnames(styles.root, className)}>
		{children}
	</footer>
)

Footer.propTypes = {
	className : PropTypes.string,
	children  : PropTypes.node.isRequired
}

Footer.defaultProps = {
	className : ''
}

export default Footer
