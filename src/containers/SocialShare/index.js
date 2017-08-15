import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class SocialShare extends PureComponent {
	static propTypes = {
		className : PropTypes.string,
		url       : PropTypes.string.isRequired,
		options   : PropTypes.string,
		children  : PropTypes.node.isRequired
	}

	static defaultProps = {
		className : '',
		options   : ''
	}

	onClick = () => {
		window.open(
			this.props.url,
			'',
			`toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=300,${this.props.options}`,
		)
	}

	render() {
		return (
			<button onClick={this.onClick} className={this.props.className}>
				{this.props.children}
			</button>
		)
	}
}

export default SocialShare

export TwitterShare from './TwitterShare'
export FacebookShare from './FacebookShare'
