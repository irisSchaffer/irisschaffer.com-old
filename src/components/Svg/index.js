import React from 'react'
import PropTypes from 'prop-types'

const Svg = ({ children, ...props }) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
		{children}
	</svg>
)

Svg.propTypes = {
	children : PropTypes.node.isRequired
}

export default Svg
export SvgFacebook from './SvgFacebook'
export SvgTwitter from './SvgTwitter'
