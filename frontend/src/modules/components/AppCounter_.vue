<template>
    <CounterButton class="counter__button--minus" @click="decrement" @action="CounterStore.decrement" :disabled = "CounterStore.isDecrementDisabled">
    </CounterButton>
    <CounterValue  :value="CounterStore.value"  v-model:ID="props.ID" v-model:price="props.price" v-model:drop="props.data"></CounterValue>
    <CounterButton class="counter__button--plus" @click="increment"  @action="CounterStore.increment"><span class="visually-hidden">Больше</span>
    </CounterButton>
</template>

<script setup>
import { reactive, ref,inject, onUpdated, onMounted, watchEffect } from "vue";

import CounterButton from './CounterButton.vue';
import CounterValue from './CounterValue.vue';
import {useCounterStore} from '../../stores/CounterStore'
const CounterStore = useCounterStore()
const props = defineProps({
    ID:{type:String},
    data:{type:Object},
    price:{type:String},
    name:{type:String},  
    
})
const emit = defineEmits(['update:data'])
const status = reactive({
    disabled : true
})
const ingredient = inject('ingredients')


const changeIn = inject('changeIn')

const change = () => {     
   let amount =  parseInt(props.price) * parseInt(counterStore.value)
        console.log(counterStore.value);
        // emit('update:data',{amount:0-amount,count:count.value,id:props.ID})
        changeIn(amount,counterStore.value ,parseInt(props.ID),props.name)   
    
};

const increment = () => {
    count.value +=  1;
    let amount = parseInt(props.price) * count.value
    console.log((props.ID));
    // emit('update:data',{amount:0+amount,count:count.value,id:props.ID})
    changeIn(amount,count.value ,parseInt(props.ID),props.name)

};
// onMounted(()=>{
//     watchEffect(()=>{
//         if(ingredient[parseInt(props.ID)-1]!==undefined && count.value <= ingredient[parseInt(props.ID)-1].count){
//         count.value = ingredient[parseInt(props.ID)-1].count
//         console.log(count.value);
//     }
//     })
// })


</script>