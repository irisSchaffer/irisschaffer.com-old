export default function (name, initialAmount) {
	const NAME = `${name}/loadMore`
	const LOAD_MORE = `${NAME}/LOAD_MORE`
	const constants = { NAME, LOAD_MORE }

	const loadMore = amount => ({
		type : LOAD_MORE,
		amount
	})

	const reducer = (state = initialAmount, action) => {
		switch (action.type) {
			case constants.LOAD_MORE :
				return state + action.amount

			default :
				return state
		}
	}

	const selectors = {
		shownPostsSelector : state => state.get(NAME, initialAmount)
	}

	return {
		reducer,
		actions : { loadMore },
		constants,
		selectors
	}
}
