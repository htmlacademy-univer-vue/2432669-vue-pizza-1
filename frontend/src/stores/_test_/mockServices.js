import saucesJSON from '../../mocks/sauces.json';
import sizesJson from '../../mocks/sizes.json';
import doughJSON from '../../mocks/dough.json';
import ingredientsJSON from '../../mocks/ingredients.json';
import miscJSON from '../../mocks/misc.json';


import { vi } from 'vitest';

vi.mock('@/services',()=>{
    return{
        sauceService:{
            fetchsauces:vi.fn(async () => {
				return await JSON.parse(JSON.stringify(saucesJSON))
			})
        },
        sizepizzaService:{
            fetchsize:vi.fn(async () => {
				return await JSON.parse(JSON.stringify(sizesJson))
			})
        },
        doughService:{
            fetchdough:vi.fn(async () => {
				return await JSON.parse(JSON.stringify(doughJSON))
			})
        }
        ,
        ingredientService:{
            fetchIngredient:vi.fn(async () => {
				return await JSON.parse(JSON.stringify(ingredientsJSON))
			})
        }
        ,
        otherproductService:{
            fetchOtherProducts:vi.fn(async () => {
				return await JSON.parse(JSON.stringify(miscJSON))
			})
        }
    }
})