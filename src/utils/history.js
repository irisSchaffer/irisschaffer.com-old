import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'

const history = process.browser ? createBrowserHistory() : createMemoryHistory()

export default history
