// memoize result of function, either uses first arg to memoize or hashArgs function
const memoize = (fn, hashArgs = args => JSON.stringify(args[0])) => {
	const memory = {}

	return (...args) => {
		const hash = hashArgs(args)
		if (memory[hash]) {
			return memory[hash]
		}

		memory[hash] = fn.apply(this, args)
		return memory[hash]
	}
}

export default memoize
