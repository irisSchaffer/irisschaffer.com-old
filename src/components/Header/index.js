import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Records } from 'data/content'

import { Link, Svg } from 'components'

import styles from './styles.css'

const Header = ({ className, title, subtitle, image, socialLinks }) => (
	<header className={classnames(styles.root, className)}>
		<Link href={process.env.HOST}>
			<img {...image.props()} alt={image.alt} />
		</Link>
		<h1>{title}</h1>
		<h2>{subtitle}</h2>
		<div className={styles.socialLinks}>
			{socialLinks.github && (
				<Link href={socialLinks.github} target="_blank">
					<Svg.GitHub />
				</Link>
			)}
			{socialLinks.twitter && (
				<Link href={socialLinks.twitter} target="_blank">
					<Svg.Twitter />
				</Link>
			)}
			{socialLinks.facebook && (
				<Link href={socialLinks.facebook} target="_blank">
					<Svg.Facebook />
				</Link>
			)}
			{socialLinks.linkedin && (
				<Link href={socialLinks.linkedin} target="_blank">
					<Svg.Linkedin />
				</Link>
			)}
		</div>
	</header>
)


Header.propTypes = {
	className   : PropTypes.string,
	title       : PropTypes.string.isRequired,
	subtitle    : PropTypes.string.isRequired,
	image       : PropTypes.instanceOf(Records.Image).isRequired,
	socialLinks : PropTypes.instanceOf(Records.SocialLinks).isRequired
}

Header.defaultProps = {
	className : ''
}

export default Header
