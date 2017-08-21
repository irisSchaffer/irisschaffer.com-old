import { NAME } from './constants'
import reducer from './reducer'
import saga from './sagas'
import Footer from './Footer'
import Image from './Image'
import Meta from './Meta'
import Post from './Post'
import StartPage from './StartPage'

export const contentReducer = [NAME, reducer]
export const contentSaga = saga

export const Records = { Footer, Image, Meta, Post, StartPage }
