import { defineStore } from "pinia";

export const useProfileStore = defineStore('profile',{
    state:()=>({
        id:"",
        name:"",
        email:"",
        avatar:"",
        phone:"",
        address:[]
    }),
    getters:{

    },actions:{
        
    }
})
