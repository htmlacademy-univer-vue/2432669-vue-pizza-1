

import { it, afterEach, describe, beforeEach, expect } from 'vitest'
// import '@/stores/__test__/mockServices'

import { createPinia, setActivePinia } from 'pinia'
import { useCartStore } from '@/stores'

describe('cart store', () => {
	let cartStore
	beforeEach(async () => {
		// Определяем Pinia
		setActivePinia(createPinia())
		cartStore = useCartStore()
    })

    it('should have initial pizzas', async () => {
		// Количество загруженных колонок должно соответствовать количеству в нашем файле columns.json
		expect(cartStore.pizzas.length).toBe(0)
	})

    it('should have a new pizza', async () => {
        const pizza = {
            name: "best wishes",
            sauceId: 1,
            doughId: 1,
            sizeId: 1,
            quantity: 1,
            ingredients: [
                {
                    ingredientId: 1,
                    quantity: 2
                }
            ]
        }
        await cartStore.AddPizza(pizza)
		// Количество загруженных колонок должно соответствовать количеству в нашем файле columns.json
		expect(cartStore.pizzas.length).toBe(1)
	})

    it('should be a new sauce', async () => {
        const pizza = {
            name: "best wishes",
            sauceId: 1,
            doughId: 1,
            sizeId: 1,
            quantity: 1,
            ingredients: [
                {
                    ingredientId: 1,
                    quantity: 2
                }
            ]
        }
        await cartStore.AddPizza(pizza)
		// Количество загруженных колонок должно соответствовать количеству в нашем файле columns.json
		
        await cartStore.updatesuaceId(2,0)
		// Количество загруженных колонок должно соответствовать количеству в нашем файле columns.json
 
		expect(cartStore.pizzas[0].sauceId).toBe(2)
	})
    it('should be delete pizza', async () => {
        const pizza = {
            name: "best wishes",
            sauceId: 1,
            doughId: 1,
            sizeId: 1,
            quantity: 1,
            ingredients: [
                {
                    ingredientId: 1,
                    quantity: 2
                }
            ]
        }
        await cartStore.AddPizza(pizza)
		// Количество загруженных колонок должно соответствовать количеству в нашем файле columns.json
        await cartStore.deletePizza(0)
		expect(cartStore.pizzas.length).toBe(0)


	})
})