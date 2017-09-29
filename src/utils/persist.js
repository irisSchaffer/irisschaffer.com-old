import transit from './transit'


export function save(key, data) {
	window.sessionStorage.setItem(key, transit.toJSON(data))
}

export function load(key) {
	const data = window.sessionStorage.getItem(key)

	return data && transit.fromJSON(data) || undefined
}
