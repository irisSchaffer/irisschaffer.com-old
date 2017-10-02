import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getDisplayName } from 'utils/hoc'
import { addReducer, removeReducer } from 'utils/reducers'
import loadMore from 'data/loadMore'

import selectors from './selectors'

const withLoadMore = ({
	path = ['hocs/withLoadMore', 'shown'],
	entitiesSelector = () => [],
	amount = 0
}) => WrappedComponent => {
	class WithLoadMore extends PureComponent {
		static propTypes = {
			dispatch    : PropTypes.func.isRequired,
			entities    : PropTypes.object.isRequired,
			hasMore     : PropTypes.bool.isRequired,
			shown       : PropTypes.number.isRequired,
			amount      : PropTypes.number.isRequired,
			path        : PropTypes.array.isRequired,
			reducerName : PropTypes.string.isRequired
		}

		componentWillMount() {
			this.loadMoreModule = loadMore(this.props.reducerName, this.props.amount)
			addReducer(this.props.path, this.loadMoreModule.reducer)
		}

		componentWillUnmount() {
			removeReducer(this.props.path, this.loadMoreModule.reducer)
		}

		onLoadMore = () => this.loadMore()

		setShown = (amnt) => {
			this.props.dispatch(this.loadMoreModule.actions.setShown(amnt))
		}

		resetShown = () => {
			this.setShown(this.props.amount)
		}

		loadMore = (amnt) => {
			this.props.dispatch(this.loadMoreModule.actions.loadMore(
				amnt !== undefined ? amnt : this.props.amount
			))
		}

		render() {
			return (
				<WrappedComponent
					loadMore={this.loadMore}
					onLoadMore={this.onLoadMore}
					setShown={this.setShown}
					resetShown={this.resetShown}
					{...this.props}
				/>
			)
		}
	}

	WithLoadMore.displayName = `WithLoadMore(${getDisplayName(WrappedComponent)})`

	return connect(
		selectors({
			path,
			entitiesSelector,
			amount
		})
	)(WithLoadMore)
}

export default withLoadMore
