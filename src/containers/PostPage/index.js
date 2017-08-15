import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import classnames from 'classnames'

import Post from 'data/content/Post'
import DisqusThread from 'containers/DisqusThread'
import { FacebookShare, TwitterShare } from 'containers/SocialShare'
import Content from 'components/Content'
import Arrow from 'components/Arrow'
import Link from 'components/Link'

import selector from './selectors'

import styles from './styles.css'

class PostPage extends PureComponent {
	static propTypes = {
		post     : PropTypes.instanceOf(Post),
		location : PropTypes.object.isRequired
	}

	static defaultProps = {
		post : new Post()
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
		window.addEventListener('scroll', this.onScroll)
		this.onScroll()
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll)
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

	render() {
		console.log('location', this.props.location, process.env.HOST + this.props.location.pathname)
		const { id, title, body, publishedAt, slugs } = this.props.post
		const shareProps = {
			pathname : slugs[0],
			title
		}

		return (
			<main className={styles.root}>
				<nav className={styles.nav}>
					<Link className={styles.arrow} href="/">
						<Arrow direction="left" />
					</Link>
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
