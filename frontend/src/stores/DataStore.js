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
        async initData(){
            this.dough = doughs.map(item=>normalizeTask(item,dough)) 
            this.ingredients =ingredients.map(item=>normalizeTask(item,ingredient)) 
            this.misc = [...misc]
            this.sauce = sauces.map(item=>normalizeTask(item,sauce)) 
            this.sizes = sizes.map(item=>normalizeTask(item,size)) 
        },
    }
})
