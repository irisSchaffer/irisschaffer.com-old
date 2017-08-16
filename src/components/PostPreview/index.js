import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Arrow from 'components/Arrow'
import Link from 'components/Link'

import styles from './styles.css'

const Footer = ({ className, title, preamble, slugs }) => (
	<article className={classnames(styles.root, className)}>
		<Link className={styles.wrapper} href={`/${slugs[0]}`}>
			<header className={styles.title}>
				<h2>{title}</h2>
			</header>
			<main className={styles.preamble}>
				{preamble}
			</main>
			<div className={styles.arrow}>
				<Arrow />
			</div>
		</Link>
	</article>
)

Footer.propTypes = {
	className : PropTypes.string,
	title     : PropTypes.string.isRequired,
	preamble  : PropTypes.string.isRequired,
	slugs     : PropTypes.array.isRequired
}

Footer.defaultProps = {
	className : ''
}

export default Footer
