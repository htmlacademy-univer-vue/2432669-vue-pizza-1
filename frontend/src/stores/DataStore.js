import { defineStore } from "pinia";
import { normalizeTask } from '../common/helper.js'
import doughs from "../mocks/dough.json"
import ingredients from "../mocks/ingredients.json"
import misc from "../mocks/misc.json"
import sauces from "../mocks/sauces.json"
import sizes from "../mocks/sizes.json"
import dough from '../common/data/ingredients.js'
import ingredient from '../common/data/ingredients.js'
import sauce from '../common/data/sauces.js'
import size from '../common/data/sizes.js'

import { doughService,ingredientService ,sauceService,sizepizzaService,otherproductService} from '../services'
export const useDataStore = defineStore('data',{
    state:()=>({
        dough:[],
        ingredients:[],
        misc:[],
        sauce:[],
        sizes:[]
    }),
    getters:{

    },
    actions:{
        // async fetchData () {
		// 	this.dough = await columnsService.fetchColumns()
		// },
        async initData(){
            // this.dough = doughs.map(item=>normalizeTask(item,dough)) 
            // // this.sauce = sauce.map(item=>normalizeTask(item,sauce))
            // this.ingredients =ingredients.map(item=>normalizeTask(item,ingredient)) 
            // this.misc = [...misc]
            
            // this.sizes = sizes.map(item=>normalizeTask(item,size)) 
            // this.sauce = sauces.map(item=>normalizeTask(item,sauce)) 


            let dough = await doughService.fetchdough()
            let sauce =await sauceService.fetchsauces()
            let size = await sizepizzaService.fetchsize()
             let misc = await otherproductService.fetchOtherProducts()

            for(let i=0;i<2;i++){
                this.dough.push(normalizeTask(dough[i],dough))
                this.sauce.push(normalizeTask(sauce[i],sauce))
            }
            for (let i=0;i<3;i++){
                this.sizes.push(normalizeTask(size[i],size))
                this.misc.push(misc[i])
            }
            let ingredients =await ingredientService.fetchIngredient()
            for(let i =0 ;i<15;i++){
                this.ingredients.push(normalizeTask(ingredients[i],ingredient))
            }
           
        },
    }
})
