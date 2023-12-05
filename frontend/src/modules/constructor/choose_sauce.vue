<script setup>

import {  reactive, onUpdated } from 'vue';

import {useCartStore,useDataStore} from '@/stores'
const dataStore = useDataStore()
const cartStore = useCartStore()
const props = defineProps({
   
   sauceid:{
       type:Number,
       required:true

   }
})
const state = reactive({
    id:props.sauceid,
    
    
})

const emit = defineEmits(['update:sauceid'])
function change(e){
    if(e.target.checked){
        state.id=parseInt(e.target.title)      
    }
    emit('update:sauceid', state.id)
}


</script>

<style lang="scss" scoped></style>

<template>
    <div class="ingredients__sauce">
        <p>Основной соус:</p>
        <label class="radio ingredients__input" v-for="sauce in dataStore.sauce">
            <input type="radio" name="sauce"  :alt="sauce.price" :title="sauce.id" :checked = "sauce.id == state.id ? true : false" @change="change"> 
            <span>{{ sauce.name }}</span>
        </label>
    </div>
</template>