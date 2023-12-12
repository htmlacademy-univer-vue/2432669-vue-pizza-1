<template>
  <!-- <span>Current value: {{ value }}</span> -->
  <input type="text" name="counter" class="counter__input" :value= "props.value"  placeholder="0" @blur="onchange">
</template>

<script setup>

import { reactive, ref,inject, effect, computed } from "vue";
import { useCartStore } from '@/stores'

const cartStore = useCartStore()
const props  = defineProps({
  count:{type:Number},
  ID:{type:String},
  price:{type:String},
  value:{type:Number},
  statused:{type:Boolean}
});



const emit = defineEmits(['update:value',"update:statused"])
function onchange(e){
  let amount = parseInt(props.price) * parseInt(e.target.value)
  emit('update:value',parseInt(e.target.value))
  emit('update:statused',true)

 

  // changeIn(amount,parseInt(e.target.value),parseInt(props.ID))

}
  
// effect(()=>{
//   if(cartStore.findIngredient(parseInt(props.ID))!==0 && props.value < cartStore.findIngredient(parseInt(props.ID))){
   
//     emit('update:value', computed(() => cartStore.findIngredient(parseInt(props.ID))))
//   }

// })
const changeIn = inject('changeIn')

</script>