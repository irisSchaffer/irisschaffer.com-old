import React from 'react'
import PropTypes from 'prop-types'

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
		this.renderDisqus()
	}

	shouldComponentUpdate(nextProps) {
		return this.props.id !== nextProps.id ||
			this.props.title !== nextProps.title ||
			this.props.slug !== nextProps.slug
	}

	componentDidUpdate() {
		this.renderDisqus()
	}

	renderDisqus() {
		if (!process.browser) {
			return
		}

		if (window.DISQUS === undefined) {
			const script = document.createElement('script')
			script.async = true
			script.src = `https://${process.env.DISQUS_SHORTNAME}.disqus.com/embed.js`
			script.setAttribute('data-timestamp', +new Date())
			document.getElementsByTagName('head')[0].appendChild(script)
		} else {
			window.DISQUS.reset({ reload : true })
		}
	}

	render() {
		const { id, title, slug, ...props } = this.props

		if (process.browser) {
			window.disqus_config = function() {
				this.page.url = `${process.env.HOST}/${slug}`
				this.page.identifier = id
				this.page.title = title
			}
		}

		return <section {...props} id="disqus_thread" />
	}
}

export default DisqusThread
