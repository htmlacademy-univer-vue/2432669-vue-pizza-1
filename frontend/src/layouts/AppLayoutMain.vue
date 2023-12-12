<template>
<AppHeader :logined = "props.logined" :Amount="props.Amount"></AppHeader>
<slot/>
</template>
<script setup>

import AppHeader from './AppLayoutHeader.vue';
const props = defineProps({
    logined:{type:Boolean},
    Amount:{type:Number}
})
</script>