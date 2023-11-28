<script setup>
import sauces from '../../mocks/sauces.json'
import sau from "../../common/data/sauces"
import {  reactive, onUpdated } from 'vue';
import {useCartStore} from '@/stores'
const cartStore = useCartStore()
const state = reactive({
    id:1,
    // sauce:"tomato",
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
        state.id=e.target.title
        // state.sauce = e.target.value
        state.price = parseInt(e.target.alt) 
    }
    emit('update:Sauce',state)
}

onUpdated(()=>{
  cartStore.updateId("sauce",state.id)
})
</script>

<style lang="scss" scoped></style>

<template>
    <div class="ingredients__sauce">
        <p>Основной соус:</p>
        <label class="radio ingredients__input" v-for="sauce in sauces">
            <input type="radio" name="sauce"  :alt="sauce.price" :title="sauce.id" :checked = "sauce.id == 1 ? true : false" @change="change"> 
            <span>{{ sauce.name }}</span>
        </label>
    </div>
</template>