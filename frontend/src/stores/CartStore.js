import { defineStore } from "pinia";

export const useCartStore = defineStore('cart',{
    state:()=>({
        userid:'',
        phone:'',
        address:{
            street:'',
            building:'',
            flat:'',
            comment:'',
        },
        pizzas: [
            {
              name: '',
              sauceId: 0,
              doughId: 0,
              sizeId: 0,
              quantity: 0,
              ingredients: [
                {
                  ingredientId: 0,
                  quantity: 0
                }
              ]
            }
          ],       
        misc:[
            {
                miscId: 0,
                quantity: 0
            }
        ]
    }),
    getters:{
        getPizzasAmount(state){
            const dataStore = useDataStore()
            dataStore.initData();
            let amount= 0
            state.pizzas.map(pizza=>{                
                
                let amountIngredients = 0
                let amountSauce = (dataStore.sauce.find(element=>{element.id === pizza.sauceId})).price
                let amountdough = (dataStore.dough.find(element=>{element.id === pizza.doughId})).price
                let size = (dataStore.sizes.find(element=>{element.id === pizza.sizeId})).multiplier
                pizza.ingredients.map(e=>{
                    amountIngredients +=(dataStore.ingredients.find(element=>{element.id === e.ingredientId})).price * e.quantity
                })
                amount += (amountdough*size + amountSauce + amountIngredients)*pizza.quantity
            })
            
            
            return amount
        },
        getMiceAmount(state){
            const dataStore = useDataStore()
            dataStore.initData();
            let amount= 0;
            state.misc.map(m=>{
                let amountmice = dataStore.misc.find(element=>{element.id === m.miscId})
                amount += amountmice * m.quantity
            })
            return amount
        }
    },
    actions:{

    }
})