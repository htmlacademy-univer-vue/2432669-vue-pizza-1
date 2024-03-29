import { HttpClient } from './HttpClient'
import { getToken } from './token-manager'
import httpProvider from '@/services/providers'
const BASE_URL = 'http://localhost:3000'


class SauceService extends HttpClient {
	async fetchsauces() {
		try {
			return this.get('/sauces')
		} catch (e) {
			throw Error(e)
		}
	}
	
}

export default new SauceService({
	httpProvider,
	baseURL: BASE_URL,
	getToken,
})