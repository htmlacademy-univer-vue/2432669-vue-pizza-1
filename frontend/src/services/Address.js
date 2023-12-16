import { HttpClient } from './HttpClient'
import { getToken } from './token-manager'
import httpProvider from '@/services/providers'

const BASE_URL = '/api/address'

class AddressService extends HttpClient {
	async fetchAddress() {
		try {
			return this.get('/')
		} catch (e) {
			throw Error(e)
		}
	}
	async createAddress(comment) {
		try {
			return this.post('/', { data: comment})
		} catch (e) {
			throw Error(e)
		}
	}
    async updateAddress(address) {
		try {
			return this.put(`/${address.id}`, { address: address})
		} catch (e) {
			throw Error(e)
		}
	}
	async deleteAddress(id) {
		try {
			await this.delete(`/${id}`)
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