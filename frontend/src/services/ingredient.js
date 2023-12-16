import { HttpClient } from './HttpClient'
import { getToken } from './token-manager'
import httpProvider from '@/services/providers'
const BASE_URL = '/api/ingredient'

class IngredientService extends HttpClient {
	async fetchIngredient() {
		try {
			return this.get('/')
		} catch (e) {
			throw Error(e)
		}
	}
	
}

export default new IngredientService({
	httpProvider,
	baseURL: BASE_URL,
	getToken,
})