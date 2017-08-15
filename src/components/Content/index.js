import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './styles.css'

const Content = ({ className, children, ...rest }) => (
	<div className={classnames(styles.root, className)} {...rest}>
		{children}
	</div>
)

Content.propTypes = {
	className : PropTypes.string,
	children  : PropTypes.node
}

Content.defaultProps = {
	className : '',
	children  : null
}

export default Content
