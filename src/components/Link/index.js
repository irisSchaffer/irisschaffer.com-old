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

	getElement = href => typeof href === 'string' && href.includes('://') && 'a' || ReactRouterLink

	getLocationObject = href => {
		const state = { link : true }
		if (typeof href === 'string') {
			return {
				pathname : href,
				state
			}
		}

		return {
			...href,
			state : {
				...state,
				...href.state
			}
		}
	}

	render() {
		const { children, href, ...restProps } = this.props

		const Element = this.getElement(href)

		const to = Element === 'a' && href || this.getLocationObject(href)

		return (
			<Element
				{...restProps}
				{...{ [Element === 'a' ? 'href' : 'to'] : to }}
			>
				{children}
			</Element>
		)
	}
}

export default Link
