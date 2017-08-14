import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

import Post from 'data/content/Post'
import { SvgFacebook, SvgTwitter } from 'components/Svg'

import selector from './selectors'

import styles from './styles.css'

class PostPage extends PureComponent {
	static propTypes = {
		post : PropTypes.instanceOf(Post),
	}

	static defaultProps = {
		post : new Post()
	}

	constructor(props) {
		super(props)

		this.$ = {
			shareSection : null
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

		// const top = this.$.shareSection.getBoundingClientRect().top
	}

	render() {
		const { title, body, publishedAt } = this.props.post
		return (
			<main>
				<section className={styles.articleSection}>
					<aside className={styles.meta}>
						<date>{moment(publishedAt).format('LL')}</date><br />
						<time>{moment(publishedAt).format('LT')}</time>
					</aside>
					<article className={styles.article}>
						<h1 className={styles.title}>{title}</h1>
						<section dangerouslySetInnerHTML={{ __html : body }} />
					</article>
				</section>
				<section
					className={styles.shareSection}
					ref={(node) => { this.shareSection = node }}
				>
					Share article <span className={styles.svg}><SvgFacebook /></span> <span className={styles.svg}><SvgTwitter /></span>
				</section>
				<section className={styles.shareWrapper}>
					<div className={styles.relativeShareWrapper}>
						<aside className={styles.fixedShare}>
							Share article on
							<div className={styles.shareLinks}>
								<SvgFacebook /> <SvgTwitter />
							</div>
						</aside>
					</div>
				</section>
			</main>
		)
	}
}

export default connect(selector)(PostPage)
