<template>
    <CounterButton class="counter__button--minus" @click="decrement" :disabled="disabled">
    </CounterButton>
    <CounterValue :value="count" v-model:value='count' v-model:ID="props.ID" v-model:price="props.price"
        v-model:drop="props.data"></CounterValue>
    <CounterButton class="counter__button--plus" @click="increment"><span class="visually-hidden">Больше</span>
    </CounterButton>
</template>

<script setup>
import { reactive, ref, inject, onUpdated, onMounted, watchEffect } from "vue";

import CounterButton from './CounterButton.vue';
import CounterValue from './CounterValue.vue';
const props = defineProps({
    ID: { type: String },
    data: { type: Object },
    price: { type: String },
    name: { type: String },


})
const emit = defineEmits(['update:data'])
const status = reactive({
    disabled: true
})
const ingredient = inject('ingredients')

let count = ref(0);
const changeIn = inject('changeIn')
let key = 0
const decrement = () => {

    status.disabled = false
    if (count.value < 1) {

        status.disabled = true
    } else  {
        count.value -= 1;
        let amount = parseInt(props.price) * parseInt(count.value)
        console.log((count.value));
        // emit('update:data',{amount:0-amount,count:count.value,id:props.ID})
        changeIn(amount, count.value, parseInt(props.ID), props.name)
    }

};

const increment = () => {
    if (count.value < 3) {
        count.value += 1;
        let amount = parseInt(props.price) * count.value
        console.log((props.ID));
        // emit('update:data',{amount:0+amount,count:count.value,id:props.ID})
        changeIn(amount, count.value, parseInt(props.ID), props.name)
    }


};
onMounted(() => {
    watchEffect(() => {
        if (ingredient[parseInt(props.ID) - 1] !== undefined && count.value <= ingredient[parseInt(props.ID) - 1].count) {
            count.value = ingredient[parseInt(props.ID) - 1].count
            console.log(count.value);
        }
    })
})


</script>