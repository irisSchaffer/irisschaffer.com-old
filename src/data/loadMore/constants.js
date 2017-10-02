import memoize from 'utils/memoize'

const constantsFactory = prefix => {
	const NAME = `${prefix}`
	const LOAD_MORE = `${NAME}/LOAD_MORE`
	const SET_SHOWN = `${NAME}/SET_SHOWN`

	return { NAME, LOAD_MORE, SET_SHOWN }
}

export default memoize(constantsFactory)
