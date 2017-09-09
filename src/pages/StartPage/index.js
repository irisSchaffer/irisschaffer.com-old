import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { Records } from 'data/content'
import { PostListing } from 'containers'
import { Header, MetaHelmet } from 'components'

import selector from './selectors'

import styles from './styles.css'

class Startpage extends PureComponent {
	static propTypes = {
		startPage : PropTypes.instanceOf(Records.StartPage).isRequired
	}

	render() {
		const {
			title,
			subtitle,
			image,
			meta,
			socialLinks,
			shownPosts
		} = this.props.startPage

		return (
			<div>
				<MetaHelmet meta={meta} />
				<Header
					title={title}
					subtitle={subtitle}
					image={image}
					socialLinks={socialLinks}
				/>
				<main>
					<PostListing
						shownPosts={shownPosts}
						className={styles.posts}
					/>
				</main>
			</div>
		)
	}
}

export default withRouter(connect(selector)(Startpage))
