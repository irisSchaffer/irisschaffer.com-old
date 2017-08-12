import { createStructuredSelector } from 'reselect'

import { NAME } from './constants'

export const loadedSelector = state => state.getIn([NAME, 'loaded'])
export const errorSelector = state => state.getIn([NAME, 'error'])

export default createStructuredSelector({
    loaded : loadedSelector,
    error  : errorSelector
})
