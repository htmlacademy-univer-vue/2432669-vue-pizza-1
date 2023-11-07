import { defineStore } from "pinia";
import dough from "../mocks/dough.json"
import ingredients from "../mocks/ingredients.json"
import misc from "../mocks/misc.json"
import sauce from "../mocks/sauces.json"
import size from "../mocks/sizes.json"
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
            this.dough = JSON.parse([...dough]) 
            this.ingredients =JSON.parse([...ingredients])
            this.misc = JSON.parse([...misc])
            this.sauce = JSON.parse([...sauce])
            this.sizes = JSON.parse([...this.sizes])
        },
    }
})
