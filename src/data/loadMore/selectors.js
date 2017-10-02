import { createSelector } from 'reselect'

export const hasMoreSelectorFactory = (entitiesSelector, shownSelector) => createSelector(
	entitiesSelector,
	shownSelector,
	(entities, shown) => (entities.size !== undefined && entities.size || entities.length) > shown
)

export const paginatedEntitiesSelectorFactory = (entitiesSelector, shownSelector) => createSelector(
	entitiesSelector,
	shownSelector,
	(entities, shown) => entities.slice(0, shown)
)

export default (entitiesSelector, shownSelector) => ({
	hasMore           : hasMoreSelectorFactory(entitiesSelector, shownSelector),
	paginatedEntities : paginatedEntitiesSelectorFactory(entitiesSelector, shownSelector)
})
