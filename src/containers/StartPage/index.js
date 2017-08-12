import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'
import { push } from 'react-router-redux'

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
		posts     : PropTypes.instanceOf(List).isRequired,
		dispatch  : PropTypes.func.isRequired
	}

	componentWillMount() {
		addReducer(NAME, reducer)
	}

	componentWillUnmount() {
		removeReducer(NAME)
	}

	link = (post) => () => {
		this.props.dispatch(push(post.slugs[0]))
	}

	render() {
		const { title, subtitle, image } = this.props.startPage
		return (
			<div>
				<Header title={title} subtitle={subtitle} image={image.props()} />
				<section className={styles.posts}>
					{this.props.posts.toJS().map(post => (
						<PostPreview onClick={this.link(post)} {...post} />
					))}
				</section>
			</div>
		)
	}
}

export default connect(selector)(Startpage)
