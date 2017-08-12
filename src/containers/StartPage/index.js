import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'

import { addReducer, removeReducer } from 'utilities/reducers'
import StartPage from 'data/content/StartPage'
import Header from 'components/Header'
import PostPreview from 'components/PostPreview'

import { NAME } from './constants'
import reducer from './reducer'
import selector from './selectors'

import styles from './styles.css'

class Startpage extends PureComponent {
	static propTypes = {
		startPage : PropTypes.instanceOf(StartPage).isRequired,
		posts     : PropTypes.instanceOf(List).isRequired
	}

	componentWillMount() {
		addReducer(NAME, reducer)
	}

	componentWillUnmount() {
		removeReducer(NAME)
	}

	render() {
		const { title, subtitle, image } = this.props.startPage
		return (
			<div>
				<Header title={title} subtitle={subtitle} image={image.props()} />
				<section className={styles.posts}>
					{this.props.posts.toJS().map(post => (
						<PostPreview {...post} />
					))}
				</section>
			</div>
		)
	}
}

export default connect(selector)(Startpage)
