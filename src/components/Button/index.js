import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Link from 'components/Link'

import styles from './styles.css'

class Button extends Component {
	static propTypes = {
		className : PropTypes.string,
		children  : PropTypes.node,
		theme     : PropTypes.oneOf(['default']),
		size      : PropTypes.oneOf(['small', 'medium', 'large']),
		href      : PropTypes.string,
		loading   : PropTypes.bool
	}

	static defaultProps = {
		className : '',
		children  : null,
		theme     : 'default',
		size      : 'medium',
		href      : undefined,
		loading   : false
	}

	getElement() {
		return this.props.href ? Link : 'button'
	}

	getClassName() {
		return classnames(
			styles.root,
			styles[this.props.theme],
			styles[this.props.size],
			{ [styles.loading] : this.props.loading },
			this.props.className
		)
	}

	render() {
		const { children, theme, size, ...restProps } = this.props
		delete restProps.loading

		const Element = this.getElement()

		return (
			<Element {...restProps} className={this.getClassName()}>
				{children}
			</Element>
		)
	}
}

export default Button
