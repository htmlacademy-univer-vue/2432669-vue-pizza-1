<template>
<AppHeader :logined = "props.logined"></AppHeader>
<slot/>
</template>
<script setup>
import {defineProps} from 'vue'
import AppHeader from './AppLayoutHeader.vue';
const props = defineProps({
    logined:{type:Boolean}
})
</script>