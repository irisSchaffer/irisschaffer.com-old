import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Link from 'components/Link'
import TextStagger from 'components/TextStagger'

import styles from './styles.css'

class Button extends Component {
	static propTypes = {
		className : PropTypes.string,
		children  : PropTypes.node,
		text      : PropTypes.string,
		theme     : PropTypes.oneOf(['default']),
		size      : PropTypes.oneOf(['small', 'medium', 'large'])
	}

	static defaultProps = {
		className : '',
		children  : null,
		text      : '',
		theme     : 'default',
		size      : 'medium'
	}

	getElement() {
		return this.props.href ? Link : 'button'
	}

	getClassName() {
		return classnames(
			styles.root,
			styles[this.props.theme],
			styles[this.props.size],
			{ [styles.useStagger] : this.props.text },
			this.props.className
		)
	}

	render() {
		const { children, text, theme, size, ...restProps } = this.props

		const Element = this.getElement()

		return (
			<Element {...restProps} className={this.getClassName()}>
				<span className={styles.content}>
					{text && (
						<TextStagger className={styles.stagger} text={text} />
					) || (
						children
					)}
				</span>
			</Element>
		)
	}
}

export default Button
