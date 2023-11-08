<script setup>
import sauces from '../../mocks/sauces.json'
import sau from "../../common/data/sauces"
import {  reactive } from 'vue';

const state = reactive({
    sauce:"tomato",
    price:50
    
})
const props = defineProps({
    sauce:{
        type:Object,
        required:true
    }
})
const emit = defineEmits(['update:Sauce'])
function change(e){
    if(e.target.checked){
        state.sauce = e.target.value
        state.price = parseInt(e.target.alt) 
    }
    emit('update:Sauce',state)
}

</script>

<style lang="scss" scoped></style>

<template>
    <div class="ingredients__sauce">
        <p>Основной соус:</p>
        <label class="radio ingredients__input" v-for="sauce in sauces">
            <input type="radio" name="sauce" :value="sau[parseInt(sauce.id)]" :alt="sauce.price" :checked = "sauce.id == 1 ? true : false" @change="change"> 
            <span>{{ sauce.name }}</span>
        </label>
    </div>
</template>