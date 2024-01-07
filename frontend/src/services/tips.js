import { HttpClient } from './HttpClient'
import { getToken } from './token-manager'
import httpProvider from '@/services/providers'
const BASE_URL = 'http://localhost:3000'

class TipsService extends HttpClient {
	async fetchorders() {
		try {
			return this.get('/orders')
		} catch (e) {
			throw Error(e)
		}
	}
	async postorders(data) {
		try {
			return this.post('/orders',{data:data})
		} catch (e) {
			throw Error(e)
		}
	}
	async deleteorders(id) {
		try {
			return this.delete(`/orders/${id}`)
		} catch (e) {
			throw Error(e)
		}
	}
	
}

export default new TipsService({
	httpProvider,
	baseURL: BASE_URL,
	getToken,
})