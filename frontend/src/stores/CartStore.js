import { defineStore } from "pinia";

export const useCartStore = defineStore('cart',{
    state:()=>({
        userid:'',
        phone:'',
        address:{},
        pizzzainfo:[],
        misc:[]
    }),
    getters:{

    },
    actions:{

    }
})