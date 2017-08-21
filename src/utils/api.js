import axios from 'axios'

const content = axios.create({
	baseURL : `http://localhost:${process.env.PORT}/api/`,
	timeout : 10000
})

export default content
