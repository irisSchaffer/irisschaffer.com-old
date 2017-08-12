import { NAME } from './constants'
import reducer from './reducer'
import saga from './sagas'

export const contentReducer = [NAME, reducer]
export const contentSaga = saga
