import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { SvgFacebook } from 'components/Svg'
import SocialShare from './'

class FacebookShare extends PureComponent {
	static propTypes = {
		pathname : PropTypes.string.isRequired,
		title    : PropTypes.string.isRequired
	}

	render() {
		const { pathname, title, ...props } = this.props
		const shareUrl = `${process.env.HOST}/${pathname}`
		const url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&t=${title}`

		return (
			<SocialShare url={url} {...props}>
				<SvgFacebook />
			</SocialShare>
		)
	}
}

export default FacebookShare
