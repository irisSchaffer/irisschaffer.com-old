import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Svg } from 'components'
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
				<Svg.Twitter />
			</SocialShare>
		)
	}
}

export default TwitterShare
