import * as constants from './constants'

export const setLoaded = loaded => ({
    type    : constants.SET_LOADED,
    payload : { loaded }
})

export const setError = error => ({
    type    : constants.SET_ERROR,
    payload : { error }
})
