import { HttpClient } from './HttpClient'
import { getToken } from './token-manager'
import httpProvider from '@/services/providers'

const BASE_URL = 'http://localhost:3000'


class OtherProductsService extends HttpClient {
	async fetchOtherProducts() {
		try {
			return this.get('/misc')
		} catch (e) {
			throw Error(e)
		}
	}
	
}

export default new OtherProductsService({
	httpProvider,
	baseURL: BASE_URL,
	getToken,
})