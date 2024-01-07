import { HttpClient } from './HttpClient'
import { getToken } from './token-manager'
import httpProvider from '@/services/providers'
const BASE_URL = 'http://localhost:3000'


class SizeService extends HttpClient {
	async fetchsize() {
		try {
			return this.get('/sizes')
		} catch (e) {
			throw Error(e)
		}
	}
	
}

export default new SizeService({
	httpProvider,
	baseURL: BASE_URL,
	getToken,
})