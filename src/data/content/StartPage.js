import { Record, Set } from 'immutable'
import Image from './Image'
import Meta from './Meta'

export const SocialLinks = Record({
	github   : '',
	twitter  : '',
	facebook : '',
	linkedin : ''
}, 'socialLinks')

const StartPageRecord = Record({
	title       : '',
	subtitle    : '',
	image       : new Image(),
	meta        : new Meta(),
	shownPosts  : 0,
	socialLinks : new SocialLinks(),
	selected    : new Set()
}, 'startPage')

export default class StartPage extends StartPageRecord {
	constructor(data = { meta : {} }, name) {
		const initData = data instanceof StartPage
			? data
			: {
				...data,
				selected    : new Set(data.selected),
				image       : new Image(data.image),
				meta        : new Meta(data.meta),
				socialLinks : new SocialLinks(data.socialLinks)
			}

		super(initData, name)
	}
}
