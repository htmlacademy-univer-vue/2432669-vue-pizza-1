import { HttpClient } from './HttpClient'
import { getToken } from './token-manager'
import httpProvider from '@/services/providers'
const BASE_URL = 'http://localhost:3000'

class doughService extends HttpClient {
	async fetchdough() {
		try {
			return this.get('/dough')
		} catch (e) {
			throw Error(e)
		}
	}
	
}

export default new doughService({
	httpProvider,
	baseURL: BASE_URL,
	getToken,
})
