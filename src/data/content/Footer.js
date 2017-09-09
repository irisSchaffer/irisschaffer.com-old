import { Record } from 'immutable'
import { markdown } from 'utils/string'

const FooterRecord = new Record({
	text : ''
}, 'footer')


export default class Footer extends FooterRecord {
	constructor(data = {}, name) {
		if (data instanceof Footer) {
			super(data, name)
		} else {
			super({
				...data,
				text : markdown(data.text || '')
			}, name)
		}
	}
}
