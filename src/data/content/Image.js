import { Record } from 'immutable'

const Dimensions = Record({
	width  : 0,
	height : 0
}, 'dimensions')

const ImageRecord = Record({
	alt        : '',
	copyright  : '',
	url        : '',
	dimensions : new Dimensions()
}, 'image')

export default class Image extends ImageRecord {
	constructor(data = {}, name) {
		const initData = data instanceof Image
			? data
			: ({
				...data,
				dimensions : new Dimensions(data.dimensions || {})
			})

		super(initData, name)
	}

	props() {
		return {
			alt : this.alt,
			src : this.url
		}
	}
}
