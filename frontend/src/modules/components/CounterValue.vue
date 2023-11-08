<template>
  <!-- <span>Current value: {{ value }}</span> -->
  <input type="text" name="counter" class="counter__input" :value= "value"  placeholder="0" @blur="onchange">
</template>

<script setup>

import { reactive, ref,inject } from "vue";

const props  = defineProps({
  count:{type:Number},
  ID:{type:String},
  price:{type:String},
});



const emit = defineEmits(['update:value'])
function onchange(e){
  let amount = parseInt(props.price) * parseInt(e.target.value)
  emit('update:value',parseInt(e.target.value))
  changeIn(amount,parseInt(e.target.value),parseInt(props.ID))
}
  

const changeIn = inject('changeIn')

</script>