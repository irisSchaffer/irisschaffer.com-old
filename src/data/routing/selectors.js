import { createSelector } from 'reselect'
import history from 'utils/history'
import { NAME } from './constants'

export const locationSelector = state => (
	state.getIn([NAME, 'locationBeforeTransitions'])
)

export const initialHistoryLengthSelector = state => (
	state.getIn([NAME, 'initialHistoryLength'])
)

export const hasHistorySelector = createSelector(
	initialHistoryLengthSelector,
	() => history.length,
	(initialLength, length) => length > initialLength
)
