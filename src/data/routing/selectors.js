import { NAME } from './constants'

export const hasHistorySelector = (state) => (
	state.getIn([NAME, 'history']).size > 1
)

export const locationSelector = (state) => (
	state.getIn([NAME, 'locationBeforeTransitions'])
)

export const historySelector = (state) => (
	state.getIn([NAME, 'history'])
)

export const browserHistoryLengthSelector = state => (
	state.getIn([NAME, 'browserHistoryLength'])
)
