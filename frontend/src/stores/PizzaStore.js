import { defineStore } from "pinia";
import {useDataStore} from './DataStore'
import {tipsService}from '../services'

export const usePizzaStore = defineStore('pizza',{
    state:()=>({
        orders:[]
    }),
    getters:{       
       

    },
    actions:{
        async fetchorders(){
            this.orders = await tipsService.fetchorders() 
        },
        async deleteorders(id){
            this.orders = await tipsService.deleteorders(id) 
        }
    }
}) 