import React from 'react'
import PropTypes from 'prop-types'

function renderDisqus() {
	if (!process.browser) {
		return
	}

	if (window.DISQUS === undefined) {
		const script = document.createElement('script')
		script.async = true
		script.src = `https://${process.env.DISQUS_SHORTNAME}.disqus.com/embed.js`
		document.getElementsByTagName('head')[0].appendChild(script)
	} else {
		window.DISQUS.reset({ reload : true })
	}
}

class DisqusThread extends React.Component {
	static propTypes = {
		className : PropTypes.string,
		id        : PropTypes.string.isRequired,
		title     : PropTypes.string.isRequired,
		slug      : PropTypes.string.isRequired
	}

	static defaultProps = {
		className : ''
	}

	componentDidMount() {
		renderDisqus()
	}

	shouldComponentUpdate(nextProps) {
		return this.props.id !== nextProps.id ||
			this.props.title !== nextProps.title ||
			this.props.slug !== nextProps.slug
	}

	componentDidUpdate() {
		renderDisqus()
	}

	render() {
		const { id, title, slug, ...props } = this.props

		if (process.browser) {
			window.disqus_shortname = process.env.DISQUS_SHORTNAME
			window.disqus_identifier = id
			window.disqus_title = title
			window.disqus_url = process.env.DISQUS_WEBSITE_URL + slug
		}

		return <section {...props} id="disqus_thread" />
	}
}

export default DisqusThread
