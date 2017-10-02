export function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export function compose(...funcs) {
	if (funcs.length === 0) {
		return arg => arg
	}

	if (funcs.length === 1) {
		return funcs[0]
	}

	return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

export const wrapInProps = value => props => {
	if (typeof value === 'function') {
		return value(props)
	}

	return value
}

export const functionOrLiteralSelector = fn => (state, props) => (
	wrapInProps(fn)(props)
)
