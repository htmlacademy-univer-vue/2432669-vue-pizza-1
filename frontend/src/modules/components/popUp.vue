<template>
    <div class="popup">
    <a href="#" class="close" @click="router.push({name:path.value,params:{reload:true}})">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a  class="button" @click="router.push({name:path.value,params:{reload:true}})" >Отлично, я жду!</a>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const props=defineProps({
  logined:{type:Boolean}
})
const path = reactive({
  value:props.logined?'orders':"HomeView"
})

</script>
<style lang="scss" scoped>
@import "../../assets/scss/ds-system/ds-colors.scss";
@import "../../assets/scss/ds-system/ds-typography.scss";
@import "../../assets/scss/app.scss";
</style>