import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link as ReactRouterLink } from 'react-router-dom'

class Link extends Component {
	static propTypes = {
		children : PropTypes.node.isRequired,
		href     : PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		]).isRequired
	}

	static defaultProps = {
		href : ''
	}

	getElement() {
		return typeof this.props.href === 'string' && this.props.href.includes('://') ? 'a' : ReactRouterLink
	}

	render() {
		const { children, href, ...restProps } = this.props

		const Element = this.getElement()

		return (
			<Element
				{...restProps}
				{...{ [Element === 'a' ? 'href' : 'to'] : href }}
			>
				{children}
			</Element>
		)
	}
}

export default Link
