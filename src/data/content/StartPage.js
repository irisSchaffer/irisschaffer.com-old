import { Record, Set } from 'immutable'
import Image from './Image'

const StartPageRecord = Record({
	title      : '',
	subtitle   : '',
	image      : new Image(),
	shownPosts : 0,
	selected   : new Set()
}, 'startPage')

export default class StartPage extends StartPageRecord {
	constructor(data = {}) {
		super({
			...data,
			selected : new Set(data.selected),
			image    : new Image(data.image)
		})
	}
}
