import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

const Html = ({ content, state, assets = {}, chunks = {}, icons = {}, dev }) => {
	const head = Helmet.renderStatic()
	const headHtml = [
		head.title.toString(),
		head.meta.toString(),
		head.link.toString(),
		...(icons && icons.html || []),
		'<link href="https://fonts.googleapis.com/css?family=Lato:400,900" rel="stylesheet">',
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
	icons   : PropTypes.object,
	dev     : PropTypes.bool.isRequired
}

export default Html
