import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './styles.css'

const Arrow = ({ className, direction, theme }) => (
	<span
		className={classnames(
			styles.root,
			className,
			styles[direction],
			styles[theme]
		)}
	>
		<span className={styles.arrow} />

		<span className={styles.arrowWrapper}>
			<span className={classnames(styles.arrow, styles.overlay)} />
		</span>
	</span>
)

Arrow.propTypes = {
	className : PropTypes.string,
	direction : PropTypes.oneOf(['left', 'right']),
	theme     : PropTypes.oneOf(['dark', 'bright'])
}

Arrow.defaultProps = {
	className : '',
	direction : 'right',
	theme     : 'bright'
}

export default Arrow
