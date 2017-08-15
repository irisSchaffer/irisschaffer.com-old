import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { SvgTwitter } from 'components/Svg'
import SocialShare from './'

class TwitterShare extends PureComponent {
	static propTypes = {
		pathname : PropTypes.string.isRequired,
		title    : PropTypes.string.isRequired
	}

	render() {
		const shareUrl = `${process.env.HOST}/${this.props.pathname}`
		const url = `https://twitter.com/share?url=${shareUrl}&text=${this.props.title}`

		return (
			<SocialShare url={url}>
				<SvgTwitter />
			</SocialShare>
		)
	}
}

export default TwitterShare
