import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Arrow from 'components/Arrow'
import Link from 'components/Link'

import styles from './styles.css'

const Footer = ({ className, title, preamble, slugs, onClick }) => (
	<article className={classnames(styles.root, className)}>
		<div className={styles.wrapper} onClick={onClick}>
			<header className={styles.title}>
				<h2><Link href={`/${slugs[0]}`}>{title}</Link></h2>
			</header>
			<main className={styles.preamble}>
				<Link href={`/${slugs[0]}`}>{preamble}</Link>
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
	preamble  : PropTypes.string.isRequired,
	slugs     : PropTypes.array.isRequired,
	onClick   : PropTypes.func.isRequired
}

Footer.defaultProps = {
	className : ''
}

export default Footer
