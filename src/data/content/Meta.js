import { Record } from 'immutable'
import Image from './Image'

const MetaRecord = Record({
	title       : '',
	description : '',
	image       : null,
}, 'meta')

export default class Meta extends MetaRecord {
	constructor(data = {}, name) {
		super(data instanceof Meta && data || {
			...data,
			image : data.image && new Image(data.image) || null
		}, name)
	}
}
