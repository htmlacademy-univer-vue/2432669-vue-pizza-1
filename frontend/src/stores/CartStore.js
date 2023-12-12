import { defineStore } from "pinia";
import { ref, toRaw } from "vue";
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
        pizzas: [],       
        misc: []
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
        Addingredients(ingredient,index){           

            this.pizzas[index].ingredients.push(ingredient)
        },
        updateIngredient(id,count,indexp){
            let length = this.pizzas.length
            const index =  this.pizzas[indexp].ingredients.findIndex(({ ingredientId }) => id === ingredientId)
            console.log(index);
            if(index!==-1){
                
                this.pizzas[indexp].ingredients[index].quantity = count           
             }else {
                this.Addingredients({ingredientId:id,quantity:count},indexp)
            }

            
        },
        updatedoughId(id,index){
            let length = this.pizzas.length
            
            this.pizzas[index].doughId = parseInt( id)
        },
        updatesuaceId(id,index){
            let length = this.pizzas.length
            
            this.pizzas[index].sauceId = parseInt( id)
        },
        deleteIngredient(ingredient,indexp){
            

            // let length = this.pizzas.[indexp]
            if(this.pizzas[indexp]!==undefined){
                const index =  this.pizzas[indexp].ingredients.findIndex(({ ingredientId }) => ingredient.ingredientId === ingredientId)
            
                if(index!==-1){
                    
                    this.pizzas[indexp].ingredients = this.pizzas[indexp].ingredients.filter(task => task.ingredientId !== ingredient.ingredientId)
                    
                } 
            }
            
        },
        updatesizeId(id,index){
            let length = this.pizzas.length
            
            this.pizzas[index].sizeId = parseInt( id)
        },
        findIngredient(ingredientId,indexp){
            let length = this.pizzas.length
            if(length>0){
                let index  = this.pizzas[indexp].ingredients.findIndex((e) => e.ingredientId === ingredientId)
                if (index ===-1){
                    return 0
                }else{
                    return this.pizzas[indexp].ingredients[index].quantity
                }
                // return  ingredient ===undefined?0:ingredient.quantity 
                         
            }else{
                return 0
            }
        },
        AddPizzaName(str,index){
            let length = this.pizzas.length
            
            this.pizzas[index].name = str
        },
        updatePizzacount(num,index){         
           
                if(this.pizzas[index]!==undefined){
                    if(num !== 0){
                        this.pizzas[index].quantity = num
                    }else{
                        this.deletePizza(index)
                    }
                }
                
            
           

        },
        deletePizza(index){
            let nums =[]
            for(let i=0;i<this.pizzas.length;i++){
                if(i!==index){
                    nums.push(this.pizzas[i])
                }
            }
            
            this.pizzas = nums
        },findpizza(id){          
                return  this.pizzas[id]         
            
        },
        addmisc(id,count){
            let misc = {miscId:id,quantity:count}
            this.misc.push(misc)
        },updatemisc(id,count){
            let len = this.misc.length
            let misc = {miscId:id,quantity:count}
            if(len>0){
                let index = this.misc.findIndex((e)=>e.miscId === id)
                if(index!==-1){
                    
                    if(count !== 0){
                        this.misc[index].quantity = count
                    }else{
                        this.delteMisc(id)
                    }
                }else{
                    this.addmisc(id,count)
                }
            }else{
                this.addmisc(id,count)
            }
            

           
        },delteMisc(id){
            
            let str=ref([])
            // console.log(str111);
            // const pizzas=toRaw(this.misc[0])
            // this.pizzas.filter(e=>{
            //     return e.miscId===id
            // })
        
            // const nums = toRaw(str)
            
            for(let i=0;i<this.misc.length;i++){
                if(this.misc[i].miscId != id){   
                    str.value.push(this.misc[i])
                }
            }
            console.log(str);
           this.misc = str.value
           console.log(this.misc);
        },findmisc(id){
            let misc = this.misc.find(e=>e.miscId===id)
            if(misc!==undefined){
                return misc
            }else{
                return 0
            }
        }

    }
})