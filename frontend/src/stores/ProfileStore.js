import { defineStore } from "pinia";
import {addressService}from '../services'
export const useProfileStore = defineStore('profile',{
    state:()=>({
        user:{},
        address:[]
    }),
    getters:{

    },actions:{
        async fetchaddress(){
            this.address = await addressService.fetchAddress()
        },
        async deleteaddress(id){
            await addressService.deleteAddress(id)
            this.address = this.fetchaddress()
           
        },
        async updateAddress(address){
             await addressService.updateAddress(address)
             this.address = this.fetchaddress()
            
        },
        async addAddress(address){
            await addressService.createAddress(address)
            this.address = this.fetchaddress()
           
       }
    }
})
