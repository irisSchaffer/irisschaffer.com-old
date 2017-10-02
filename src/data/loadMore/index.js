import memoize from 'utils/memoize'
import constantsFactory from './constants'
import actionsFactory from './actions'
import reducerFactory from './reducer'

const moduleFactory = (prefix, initialState) => ({
	constants : constantsFactory(prefix),
	actions   : actionsFactory(prefix),
	reducer   : reducerFactory(prefix, initialState)
})

export default memoize(moduleFactory)
