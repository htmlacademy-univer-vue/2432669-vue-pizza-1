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
            
          ],       
        misc:[
            
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
        },
        getPizzasIngredient(state){
            if(state.pizzas.length!==0){
                return state.pizzas.ingredients
            }
        }
    },
    actions:{
        AddPizza(pizza){
            this.pizzas.push(pizza)
        },
        Addingredients(ingredient){
            let length = this.pizzas.length

            this.pizzas[length-1].ingredients.push(ingredient)
        },
        updateIngredient(ingredient){
            let length = this.pizzas.length
            const index =  this.pizzas[length-1].ingredients.findIndex(({ ingredientId }) => ingredient.ingredientId === ingredientId)
            
            if(index!==-1){
                
                this.pizzas[length-1].ingredients.splice(index, 1, ingredient)            
             }else {
                this.Addingredients(ingredient)
            }

            
        },
        updateId(str,id){
            let length = this.pizzas.length
            let varStr = str+'Id'
            this.pizzas[length-1].varStr = id
        },
        deleteIngredient(ingredient){
            

            let length = this.pizzas.length
            if(length>0){
                const index =  this.pizzas[length-1].ingredients.findIndex(({ ingredientId }) => ingredient.ingredientId === ingredientId)
            
                if(index!==-1){
                    
                    this.pizzas[length-1].ingredients = this.pizzas[length-1].ingredients.filter(task => task.ingredientId !== ingredient.ingredientId)
                    
                } 
            }
            
        },
        findIngredient(ingredientId){
            let length = this.pizzas.length
            if(length>0){
                let index  = this.pizzas[length-1].ingredients.findIndex((e) => e.ingredientId === ingredientId)
                if (index ===-1){
                    return 0
                }else{
                    return this.pizzas[length-1].ingredients[index].quantity
                }
                // return  ingredient ===undefined?0:ingredient.quantity 
                         
            }
        },
        AddPizzaName(str){
            let length = this.pizzas.length
            
            this.pizzas[length-1].name = str
        },
        updatePizzacount(num,index){
            this.pizzas[index].quantity = num

        },
        addmisc(id,count){
            this.misc.push({miscId:id,quantity:count})
        },updatemisc(id,count){


            const index =  this.misc.find((e) => e.miscId === id)
            

            if(index!==undefined){
                if(parseInt(count) === 0){
                    this.misc = this.misc.filter(e => e.miscId != id)
                }else{
                    this.misc.splice(index,1,{miscId:id,quantity:count})

                }
                       
             }else {
                this.addmisc(id,count)
            }

           
        },delteMisc(id){
            let length = this.pizzas.length
            if(length>0){
                const index =  this.misc.find((e) => e.miscId === id)
                
                if(index!==undefined){
                    console.log(index);
                    this.misc = this.misc.filter(e => e.miscId != index.miscId)

                    
                } 
            }
        }

    }
})