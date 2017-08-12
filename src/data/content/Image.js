import { Record } from 'immutable'

const ImageRecord = Record({
	alt       : '',
	copyright : '',
	url       : '',
}, 'image')

export default class Image extends ImageRecord {
	props() {
		return {
			alt : this.alt,
			src : this.url
		}
	}
}
