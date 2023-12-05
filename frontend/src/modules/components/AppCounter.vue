<template>
    <CounterButton class="counter__button--minus" @click="decrement" :disabled="disabled">
    </CounterButton>
    <CounterValue v-model:value='count' v-model:ID="props.ingredientId" v-model:price="props.price" :statused = 'status.entered'
        v-model:drop="props.data"></CounterValue>
    <CounterButton class="counter__button--plus" :class="props.page === 'cart' || props.page === 'cartMisc'  ? 'counter__button--orange' : ''"
        @click="increment"><span class="visually-hidden">Больше</span>
    </CounterButton>
</template>

<script setup>
import { reactive, ref, inject, onUpdated, onMounted, watchEffect, effect, computed } from "vue";
import { useCartStore } from '@/stores'
import CounterButton from './CounterButton.vue';
import CounterValue from './CounterValue.vue';

const cartStore = useCartStore()

const data = reactive({
    ingredientId: 0,
    quantity: 0
})

const props = defineProps({
    ingredientId: { type: String },
    ingredients: { type: Array },
    price: { type: String },
    name: { type: String },
    draged: { type: Object },
    page: { type: String },
    productId: { type: Number },
    quantity: { type: Number },
    misc: { type: Number },
    counrval:{type: Array},
    indexPizza:{type: Number}

})
const emit = defineEmits(['update:ingredients'])
const status = reactive({
    disabled: true,
    mines:false,
    entered:false
})
const ingredient = inject('ingredients')

let count =  props.page === "cart"? ref(props.quantity) : ref(0)



// if( props.page === "cart"){
//      count = ref(props.quantity)
// }else if(props.counrval!==undefined){
//     count = ref(props.counrval)
// }else{
//     count = ref(0)
// }


// const changeIn = inject('changeIn')
let key = 0
const decrement = () => {
    status.disabled = false
    status.mines=true
    if (props.page === "cart") {
        
            let pizza = cartStore.findpizza(props.productId);
            if(pizza!==0){
                
                if(pizza.quantity - 1===0){
                    cartStore.deletePizza(props.productId)
                } else{
                    count.value = pizza.quantity - 1
                    cartStore.updatePizzacount(count.value, props.productId)
                } 
            }
         } else if(props.page === "cartMisc")
    {
        // let misc = cartStore.findmisc(props.misc);
        // if(misc!==0){
        //     if(misc.quantity-1 ===0){
        //         cartStore.delteMisc(props.misc)
        //     }else{
        //         count.value = misc.quantity-1 
        //         cartStore.updatemisc(props.misc,count.value)
        //     }
        // }
         if (
            count.value >0
         ){
            count.value -= 1;
            
            cartStore.updatemisc(props.misc,count.value)
         }else{
            status.disabled = true
         }
        
    } else{
        if (count.value < 1) {
            console.log(count.value);
            status.disabled = true
        } else  {
            console.log(count.value);

            count.value -= 1;
            console.log(count.value);
            data.ingredientId = parseInt(props.ingredientId)
            data.quantity = count.value

            emit('update:ingredients', data)

        }

    }

   

    status.mines=false





};

const increment = () => {
    
    if (props.page === "cart") {
        count.value += 1;
        cartStore.updatePizzacount(count.value, props.productId)
        
    }
    if(props.page === "cartMisc"){
        count.value += 1;
        cartStore.updatemisc(props.misc,count.value)
}
    if (count.value < 3 && props.page !== "cart" && props.page !== "cartMisc") {
        count.value += 1;
        let amount = parseInt(props.price) * count.value

        data.ingredientId = parseInt(props.ingredientId)
        data.quantity = count.value

        emit('update:ingredients', data)

        // cartStore.updateIngredient({ ingredientId: parseInt(props.ingredientId), quantity: count.value })
        // emit('update:data',{amount:0+amount,count:count.value,id:props.ID})
        // changeIn(amount, count.value, parseInt(props.ingredientId), props.name)


    }
    
    




};


effect(() => {  


    if (props.draged && props.draged.id === props.ingredientId && cartStore.findIngredient(props.draged.id,props.indexPizza) !== 0 && status.mines !== true ) {
        if (count.value <= cartStore.findIngredient(props.draged.id,props.indexPizza)) {
            console.log(count.value);
            console.log(cartStore.findIngredient(props.draged.id,props.indexPizza));
            count.value = cartStore.findIngredient(parseInt(props.draged.id),props.indexPizza)
        }
    }
  
    if(count.value !== 0){
        data.ingredientId = parseInt(props.ingredientId)
        data.quantity = count.value

        emit('update:ingredients', data)
        
    }

    if(props.page === "cartMisc"&&count.value!==0){
        cartStore.updatemisc(props.misc,count.value)
       
    }
    if (props.page === "cart" && count.value!==0) {
      
    cartStore.updatePizzacount(count.value, props.productId)
    
    } 
})
 onMounted(()=>{
    if(props.counrval){
        props.counrval.map(e=>{
       if(e.ingredientId === props.ingredientId) {
        count.value = e.quantity
       }
    })
    }
   
 })

</script>