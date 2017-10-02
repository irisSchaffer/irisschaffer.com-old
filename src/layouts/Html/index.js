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
		!dev && `<link rel="stylesheet" type="text/css" href=${assets.client.css} />` || '',
		!dev && `
			<!-- Google Tag Manager -->
			<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
			new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
			j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
			'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			})(window,document,'script','dataLayer','GTM-TSXXZH6');</script>
			<!-- End Google Tag Manager -->
		`
	]
	const htmlAttrs = head.htmlAttributes.toComponent()
	const bodyAttrs = head.bodyAttributes.toComponent()

	return (
		<html lang="en">
			<head dangerouslySetInnerHTML={{ __html : headHtml.join(' ') }} {...htmlAttrs} />
			<body {...bodyAttrs}>
				{!dev && `
					<!-- Google Tag Manager (noscript) -->
					<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TSXXZH6"
					height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
					<!-- End Google Tag Manager (noscript) -->
				`}

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
