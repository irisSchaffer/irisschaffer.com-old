import { NAME } from './constants'

export const hasHistorySelector = (state) => (
	state.getIn([NAME, 'numberChanges']) > 1
)

export const locationSelector = (state) => (
	state.getIn([NAME, 'locationBeforeTransitions'])
)

export const lastLocationSelector = (state) => (
	state.getIn([NAME, 'lastLocation'])
)
