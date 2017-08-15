import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './styles.css'

const Arrow = ({ className, direction }) => (
	<span  className={classnames(styles.root, className, styles[direction] )} >
		<span className={styles.arrow} />

		<span className={styles.arrowWrapper}>
			<span className={classnames(styles.arrow, styles.overlay)} />
		</span>
	</span>
)

Arrow.propTypes = {
	className : PropTypes.string,
	direction : PropTypes.oneOf(['left', 'right'])
}

Arrow.defaultProps = {
	className : '',
	direction : 'right'
}

export default Arrow
