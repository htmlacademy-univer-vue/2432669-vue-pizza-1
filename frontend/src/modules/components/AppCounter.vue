<template>
    <CounterButton class="counter__button--minus" @click="decrement" :disabled="disabled">
    </CounterButton>
    <CounterValue v-model:value='count' v-model:ID="props.ingredientId" v-model:price="props.price"
        v-model:drop="props.data"></CounterValue>
    <CounterButton class="counter__button--plus" :class="props.page === 'cart' || props.page === 'cartMisc'  ? 'counter__button--orange' : ''"
        @click="increment"><span class="visually-hidden">Больше</span>
    </CounterButton>
</template>

<script setup>
import { reactive, ref, inject, onUpdated, onMounted, watchEffect, effect } from "vue";
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
    dragId: { type: Number },
    page: { type: String },
    productId: { type: Number },
    quantity: { type: Number },
    misc: { type: Number }

})
const emit = defineEmits(['update:ingredients'])
const status = reactive({
    disabled: true
})
const ingredient = inject('ingredients')

let count = props.page === "cart" ? ref(props.quantity) : ref(0)


// const changeIn = inject('changeIn')
let key = 0
const decrement = () => {
    status.disabled = false

    if (props.page === "cart") {
        if (count.value > 1) {
            count.value -= 1;
            cartStore.updatePizzacount(count.value, props.productId)
        } else if (count.value < 2) {
            status.disabled = true
        }

    } else if(props.page === "cartMisc")
    {
        if (
            count.value >0
        ){
            count.value -= 1;
            cartStore.updatemisc(props.misc,count.value)
        }
        
    } else{
        if (count.value < 1) {

            status.disabled = true
        } else if ((count.value > 0 && props.page !== "cart")) {
            count.value -= 1;
            data.ingredientId = parseInt(props.ingredientId)
            data.quantity = count.value

            emit('update:ingredients', data)

        }

    }

   







};

const increment = () => {
    count.value += 1;
    if (props.page === "cart") {
        
        cartStore.updatePizzacount(count.value, props.productId)
        
    }
//     if(props.page === "cartMisc"){
//         
//         cartStore.updatemisc(props.misc,count.value)
// }
    if (count.value < 3 && props.page !== "cart" && props.page !== "cartMisc") {
       
        let amount = parseInt(props.price) * count.value

        data.ingredientId = parseInt(props.ingredientId)
        data.quantity = count.value

        emit('update:ingredients', data)

        // cartStore.updateIngredient({ ingredientId: parseInt(props.ingredientId), quantity: count.value })
        // emit('update:data',{amount:0+amount,count:count.value,id:props.ID})
        // changeIn(amount, count.value, parseInt(props.ingredientId), props.name)


    }
    
    




};
// onUpdated(()=>{
//     if (count.value <= data.quantity){
//             count.value = data.quantity
//     }
// })
onMounted(() => {

    watchEffect(() => {
        // if (ingredient[parseInt(props.ingredientId) - 1] !== undefined && count.value <= ingredient[parseInt(props.ingredientId) - 1].count) {

        //     count.value = ingredient[parseInt(props.ingredientId) - 1].count
        //     console.log(count.value);
        // }
        if (props.page === "cart") {

            cartStore.updatePizzacount(count.value, props.productId)
        } 
        else {
            data.ingredientId = parseInt(props.ingredientId)
            data.quantity = count.value
            emit('update:ingredients', data)
        }





    })
})


onUpdated(() => {
    if (props.dragId === props.ingredientId && cartStore.findIngredient(props.dragId) !== 0) {
        if (count.value <= cartStore.findIngredient(props.dragId)) {

            count.value = cartStore.findIngredient(parseInt(props.dragId))
        }



    }

    if(props.page === "cartMisc"){
        cartStore.updatemisc(props.misc,count.value)
       
    }

})


</script>