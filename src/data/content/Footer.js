import { Record } from 'immutable'
import { markdown } from 'utils/string'

const FooterRecord = new Record({
	text : ''
}, 'footer')

export function format(data) {
	return {
		...data,
		text : markdown(data.text || '')
	}
}

export default FooterRecord
