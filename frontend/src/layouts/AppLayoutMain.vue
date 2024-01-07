<template>
<AppHeader  :Amount="props.Amount"></AppHeader>
<slot/>
</template>
<script setup>

import AppHeader from './AppLayoutHeader.vue';
const props = defineProps({
    
    Amount:{type:Number}
})
</script>