import { mount } from '@vue/test-utils'
import '@/stores/_test_/mockServices'
import { describe, beforeEach, it, expect, vi } from 'vitest'
import TestComponent from '../TestComponent.vue'
import { createTestingPinia } from '@pinia/testing'
import { useCartStore, useDataStore } from '@/stores'
import router from '@/router'

describe('TestComponent', () => {
	let wrapper,  cartstore, datastore
	beforeEach(async () => {
		// Создаём экземпляр Pinia
		const pinia = createTestingPinia({
			createSpy: vi.fn,
			stubActions: false,
		})
		// Создаём экземпляр компонента
		wrapper = mount(TestComponent, {
			global: {
				plugins: [pinia, router] // добавляем Pinia и vue-router к компоненту
			}
		})
		// Создаём экземпляры хранилищ
		
		cartstore = useCartStore()
		datastore = useDataStore()
		// Делаем изначальные запросы для заполнения хранилищ
		
	
		await datastore.initData() 
        // /**
        //  * if test wants to run successfull,need to go to file DataStore.js from /stroes and delete 
        //  * import { doughService,ingredientService ,sauceService,sizepizzaService,otherproductService} from '../services'
        //  *  */ 


	})

    it('should render', async () => {
		expect(wrapper.exists).toBeTruthy()
	})

    it('should have a title', async ()=>{
        const titleWebsite = wrapper.find('[data-test="title--big"]')
        expect(titleWebsite.text()).toBe('Конструктор пиццы')
    })
    it('should have doughlist', async ()=>{
        const listDough = wrapper.findAll('[data-test="dough-List"]')
        expect(listDough.length).toBe(2)
    })
})