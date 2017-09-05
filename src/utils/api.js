import axios from 'axios'

const content = axios.create({
	baseURL : process.env.API_HOST,
	timeout : 10000
})

export default content
