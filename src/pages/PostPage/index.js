import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import classnames from 'classnames'

import { back } from 'data/routing/actions'
import { Records } from 'data/content'
import { DisqusThread } from 'containers'
import { FacebookShare, TwitterShare } from 'containers/SocialShare'
import { Content, MetaHelmet, Arrow, Tags } from 'components'

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
		window.addEventListener('scroll', this.onScroll)
		this.onScroll()
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
		this.props.dispatch(back())
	}

	render() {
		const { id, title, body, publishedAt, slugs, meta, tags } = this.props.post
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
						<time dateTime={publishedAt}>
							<span>{moment(publishedAt).format('LL')}</span>
							<span>{moment(publishedAt).format('LT')}</span>
						</time>
						<Tags className={styles.tags} tags={tags} />
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
