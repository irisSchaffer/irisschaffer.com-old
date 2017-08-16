import React from 'react'
import PropTypes from 'prop-types'

import Helmet from 'react-helmet'

import Meta from 'data/content/Meta'

const MetaHelmet = ({ children, meta : { title, description, image } }) => (
	<Helmet>
		<title>{title}</title>
		<meta property="og:title" content={title} />
		<meta property="description" content={description} />
		<meta property="og:description" content={description} />
		{image && [
			<meta key="og:image" property="og:image" content={image.url} />,
			<meta key="og:image:width" property="og:image:width" content={image.dimensions.width} />,
			<meta key="og:image:height" property="og:image:height" content={image.dimensions.height} />
		]}
		{children}
	</Helmet>
)

MetaHelmet.propTypes = {
	meta     : PropTypes.instanceOf(Meta).isRequired,
	children : PropTypes.node
}

MetaHelmet.defaultProps = {
	children : null
}

export default MetaHelmet
