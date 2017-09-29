import transit from 'transit-immutable-js'

import { Records as contentRecords } from 'data/content'

export default transit.withRecords([
	...Object.values(contentRecords)
])
