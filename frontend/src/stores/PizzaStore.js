import { defineStore } from "pinia";
import {useDataStore} from './DataStore'

export const usePizzaStore = defineStore('pizza',{
    state:()=>([{
        Id:'',
        userId:'',
        addressId:'',
        orderPizzas:[],
        orderMisc:[],
        orderAddress:{}

    }]),
    getters:{
       

    },
    actions:{
        
    }
}) 