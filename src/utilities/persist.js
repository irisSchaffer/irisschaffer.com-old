import store from 'store'
import expirePlugin from 'store/plugins/expire'

import transit from './transit'

store.addPlugin(expirePlugin)

export function save(key, data, duration) {
	store.set(key, transit.toJSON(data), new Date().getTime() + duration)
}

export function load(key) {
	const selection = store.get(key)

	return selection && transit.fromJSON(selection)
}
