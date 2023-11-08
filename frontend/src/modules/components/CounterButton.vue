<template>
    <button class="counter__button" @click="$emit('action')" type="button">
        <span class="visually-hidden">Меньше</span>
    </button>
  </template>
  
  <script setup>
  defineEmits(['action']);
  </script>
  
 