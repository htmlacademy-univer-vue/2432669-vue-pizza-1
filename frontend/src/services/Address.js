import { HttpClient } from './HttpClient'
import { getToken } from './token-manager'
import httpProvider from '@/services/providers'

const BASE_URL = 'http://localhost:3000'

class AddressService extends HttpClient {
	async fetchAddress() {
		try {
			return this.get('/addresses')
		} catch (e) {
			throw Error(e)
		}
	}
	async createAddress(address) {
		try {
			return this.post('/addresses', { data:address})
		} catch (e) {
			throw Error(e)
		}
	}
    async updateAddress(address) {
		try {
			return this.put(`/addresses/${address.id}`, { data:address})
		} catch (e) {
			throw Error(e)
		}
	}
	async deleteAddress(id) {
		try {
			await this.delete(`/addresses/${id}`)
		} catch (e) {
			throw Error(e)
		}
	}
}

export default new AddressService({
	httpProvider,
	baseURL: BASE_URL,
	getToken,
})