import { defineStore } from "pinia";

export const useCounterStore = defineStore('counter',{
    state:()=>({
        value:0
    }),
    getters:{
        isDecrementDisabled() {
            return this.value <= 0;
        },
        getVal(){
            return this.value
        }
    },
    actions:{
        increment(){
            this.value ++
        },
        decrement(){
            this.value --
        }
    }
})