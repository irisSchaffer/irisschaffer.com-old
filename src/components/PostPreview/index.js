import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Arrow from 'components/Arrow'

import styles from './styles.css'

const Footer = ({ className, title, preamble, slugs, onClick }) => (
	<article className={classnames(styles.root, className)}>
		<div className={styles.wrapper} onClick={onClick}>
			<header className={styles.title}>
				<h2>{title}</h2>
			</header>
			<main className={styles.preamble}>
				{preamble}
			</main>
			<div className={styles.arrow}>
				<Arrow />
			</div>
		</div>
	</article>
)

Footer.propTypes = {
	className : PropTypes.string,
	title     : PropTypes.string.isRequired,
	preamble  : PropTypes.string.isRequired
}

Footer.defaultProps = {
	className : ''
}

export default Footer
