import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Records } from 'data/content'

import { Link, Svg } from 'components'

import styles from './styles.css'

const SocialLinks = ({
	socialLinks : { github, twitter, facebook, linkedin },
	className
}) => (
	<div className={classnames(className, styles.root)}>
		{github && (
			<Link href={github} target="_blank">
				<Svg.GitHub />
			</Link>
		)}
		{twitter && (
			<Link href={twitter} target="_blank">
				<Svg.Twitter />
			</Link>
		)}
		{facebook && (
			<Link href={facebook} target="_blank">
				<Svg.Facebook />
			</Link>
		)}
		{linkedin && (
			<Link href={linkedin} target="_blank">
				<Svg.Linkedin />
			</Link>
		)}
	</div>
)

SocialLinks.propTypes = {
	className   : PropTypes.string,
	socialLinks : PropTypes.instanceOf(Records.SocialLinks).isRequired
}

SocialLinks.defaultProps = {
	className : ''
}

export default SocialLinks
