import { NAME } from './constants'
import reducer from './reducer'
import saga from './sagas'
import Footer from './Footer'
import Image, { Dimensions } from './Image'
import Meta from './Meta'
import Post from './Post'
import StartPage, { SocialLinks } from './StartPage'

export const contentReducer = [NAME, reducer]
export const contentSaga = saga

export const Records = {
	Footer, Image, Dimensions, Meta, Post, StartPage, SocialLinks
}
