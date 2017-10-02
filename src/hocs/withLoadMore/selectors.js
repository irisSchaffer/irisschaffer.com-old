import { createSelector, createStructuredSelector } from 'reselect'
import { functionOrLiteralSelector } from 'utils/hoc'

export default function ({ path, entitiesSelector, amount }) {
	const pathSelector = functionOrLiteralSelector(path)
	const amountSelector = functionOrLiteralSelector(amount)

	const shownSelector = (state, props) => {
		const initialAmount = amountSelector(state, props)
		return state.getIn(pathSelector(state, props), initialAmount)
	}

	const hasMoreSelector = createSelector(
		entitiesSelector,
		shownSelector,
		(entities, shown) => (entities.size && entities.size || entities.length) > shown
	)

	const paginatedEntitiesSelector = createSelector(
		entitiesSelector,
		shownSelector,
		(entities, shown) => entities.slice(0, shown)
	)

	const reducerNameSelector = createSelector(
		pathSelector,
		nameParts => nameParts.join('/')
	)

	return createStructuredSelector({
		path        : pathSelector,
		reducerName : reducerNameSelector,
		amount      : amountSelector,
		hasMore     : hasMoreSelector,
		entities    : paginatedEntitiesSelector,
		shown       : shownSelector
	})
}
