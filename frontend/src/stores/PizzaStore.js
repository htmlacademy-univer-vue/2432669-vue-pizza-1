import { defineStore } from "pinia";
import {useDataStore} from './DataStore'

export const usePizzaStore = defineStore('pizza',{
    state:()=>({
        name:"",
        sauceId:0,
        doughId:0,
        sizeId:0,
        ingredients:[]
    }),
    getters:{
        getAmount(state){
            const dataStore = useDataStore()
            dataStore.initData();
            let amount= 0
            let amountIngredients = 0
            let amountSauce = (dataStore.sauce.find(element=>{element.id === state.sauceId})).price
            let amountdough = (dataStore.dough.find(element=>{element.id === state.doughId})).price
            let size = (dataStore.sizes.find(element=>{element.id === state.sizeId})).multiplier
            state.ingredients.map(e=>{
                amountIngredients +=(dataStore.ingredients.find(element=>{element.id === e.ingredientId})).price * e.quantity
            })
            amount = amountdough*size + amountSauce + amountIngredients
            return amount
        }

    },
    actions:{
        
    }
}) 