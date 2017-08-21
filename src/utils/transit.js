import transit from 'transit-immutable-js'

import StartPage from 'data/content/StartPage'
import Footer from 'data/content/Footer'
import Post from 'data/content/Post'
import Image from 'data/content/Image'
import Meta from 'data/content/Meta'

export default transit.withRecords([
	Footer,
	StartPage,
	Post,
	Image,
	Meta
])
