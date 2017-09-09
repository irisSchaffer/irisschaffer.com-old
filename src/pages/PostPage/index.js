import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import classnames from 'classnames'

import { Records } from 'data/content'
import { DisqusThread } from 'containers'
import { FacebookShare, TwitterShare } from 'containers/SocialShare'
import { Content, MetaHelmet, Arrow } from 'components'

import selector from './selectors'

import styles from './styles.css'

class PostPage extends PureComponent {
	static propTypes = {
		location : PropTypes.object.isRequired,
		history  : PropTypes.object.isRequired,
		post     : PropTypes.instanceOf(Records.Post)
	}

	static defaultProps = {
		post : new Records.Post()
	}

	constructor(props) {
		super(props)

		this.$ = {
			shareSection : null
		}

		this.state = {
			showFixedShare : true,
			opacity        : 1
		}
	}

	componentDidMount() {
		window.scrollTo(0, 0)

		window.addEventListener('scroll', this.onScroll)
		this.onScroll()
	}

	componentWillReceiveProps({ location }) {
		if (process.browser && location.pathname !== this.props.location.pathname) {
			window.scrollTo(0, 0)
		}
	}

	onScroll = () => {
		if (!this.$.shareSection) {
			return
		}

		const diff = this.$.shareSection.getBoundingClientRect().top - window.innerHeight
		const opacity = Math.max(Math.min((diff + 140) / 100, 1), 0)

		this.setState({
			opacity,
			showFixedShare : diff > 44
		})
	}

	onBack = () => {
		if (document.referrer.length === 0 || document.referrer.includes(process.env.HOST)) {
			this.props.history.goBack()
		} else {
			this.props.history.push('/')
		}
	}

	render() {
		const { id, title, body, publishedAt, slugs, meta } = this.props.post
		const shareProps = {
			pathname : slugs[0],
			title
		}

		return (
			<main className={styles.root}>
				<MetaHelmet meta={meta} />
				<nav className={styles.nav}>
					<button className={styles.arrow} onClick={this.onBack}>
						<Arrow direction="left" />
					</button>
				</nav>
				<section className={styles.articleSection}>
					<aside className={styles.meta}>
						<time>{moment(publishedAt).format('LL')}</time>
						<time>{moment(publishedAt).format('LT')}</time>
					</aside>
					<article className={styles.article}>
						<h1 className={styles.title}>{title}</h1>
						<Content dangerouslySetInnerHTML={{ __html : body }} />
					</article>
					<aside
						className={classnames(
							styles.fixedShare,
							{ [styles.stop] : !this.state.showFixedShare }
						)}
						style={{ opacity : this.state.opacity }}
					>
						Share article
						<div className={styles.shareLinks}>
							<FacebookShare {...shareProps} /> <TwitterShare {...shareProps} />
						</div>
					</aside>
				</section>
				<section
					className={styles.shareSection}
					ref={(node) => { this.$.shareSection = node }}
				>
					Share article <FacebookShare {...shareProps} /> <TwitterShare {...shareProps} />
				</section>
				<DisqusThread
					id={id}
					title={title}
					slug={slugs[0]}
					className={styles.commentsSection}
				/>
			</main>
		)
	}
}

export default withRouter(connect(selector)(PostPage))