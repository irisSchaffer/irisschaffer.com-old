import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

const dev = process.env.NODE_ENV !== 'production'

const Html = ({ content, state, assets, chunks, icons }) => {
	const head = Helmet.renderStatic()
	const headHtml = [
		head.title.toString(),
		head.meta.toString(),
		head.link.toString(),
		...(icons && icons.html || []),
		'<link href="https://fonts.googleapis.com/css?family=Lato:300,900" rel="stylesheet">',
		'<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css">',
		!dev && `<link rel="stylesheet" type="text/css" href=${assets.client.css} />` || ''
	]
	const htmlAttrs = head.htmlAttributes.toComponent()
	const bodyAttrs = head.bodyAttributes.toComponent()

	return (
		<html lang="en">
			<head dangerouslySetInnerHTML={{ __html : headHtml.join(' ') }} {...htmlAttrs} />
			<body {...bodyAttrs}>
				<div id="root" dangerouslySetInnerHTML={{ __html : content }} />

				<script
					dangerouslySetInnerHTML={{
						__html : `
							window.__CHUNK_MANIFEST__ = ${JSON.stringify(chunks)};
							window.__INITIAL_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')};
						`
					}}
				/>

				<script src={dev ? '/vendor.js' : assets.vendor.js}></script>
				<script src={dev ? '/client.js' : assets.client.js}></script>
			</body>
		</html>
	)
}

Html.propTypes = {
	content : PropTypes.string.isRequired,
	state   : PropTypes.string.isRequired,
	assets  : PropTypes.object,
	chunks  : PropTypes.object,
	icons   : PropTypes.object
}

Html.defaultProps = {
	assets : {},
	chunks : {},
	icons  : {}
}

export default Html
