import { defineStore } from "pinia";
import { normalizeTask } from '../common/helpers'
import dough from "../mocks/dough.json"
import ingredients from "../mocks/ingredients.json"
import misc from "../mocks/misc.json"
import sauces from "../mocks/sauces.json"
import sizes from "../mocks/sizes.json"

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
            this.dough = dough.map(item=>normalizeTask(item,dough)) 
            this.ingredients =ingredients.map(item=>normalizeTask(item,ingredients)) 
            this.misc = JSON.parse([...misc])
            this.sauce = sauces.map(item=>normalizeTask(item,sauces)) 
            this.sizes = sizes.map(item=>normalizeTask(item,sizes)) 
        },
    }
})
