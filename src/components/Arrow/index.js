import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './styles.css'

const Arrow = ({ className }) => (
	<span  className={classnames(styles.root, className)} >
		<span className={classnames(styles.arrow)} />
	</span>
)

Arrow.propTypes = {
	className : PropTypes.string
}

Arrow.defaultProps = {
	className : ''
}

export default Arrow
