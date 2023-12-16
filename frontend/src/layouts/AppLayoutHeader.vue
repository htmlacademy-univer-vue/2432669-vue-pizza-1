<template>
    <header class="header" >
    <div class="header__logo">
      <a @click="router.push({path:'/'})" class="logo">
        <img src="../assets/img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40">
      </a>
    </div>
    <div class="header__cart">
      <a  @click="router.push({path:'/cart'})">{{props.Amount}}₽</a>
    </div>
    
    <div class="header__user"  v-if="authStore.user">
      <a @click="router.push({path:'/user'})">
        <picture>
          <source type="image/webp" srcset="../assets/img/users/user5.webp 1x, ../assets/img/users/user5@2x.webp 2x">
          <img :src="userImage" srcset=".userImage" :alt="authStore.user.name " width="32" height="32">
        </picture>
        <span>{{ authStore.user.name }}</span>
      </a>
      <a href="#" class="header__logout" @click="logout"><span>Выйти</span></a>
    </div>
    <div class="header__user" v-else>
      <a  class="header__login" v-if="!authStore.isAuthenticated" @click="router.push({path:'/login'})"><span>Войти</span></a>
    
    </div>

    
  </header>
</template>
<script setup>
import { useRouter } from 'vue-router';
import {  useAuthStore } from '@/stores'
import { getPublicImage } from '@/common/helper'

const authStore = useAuthStore()
const userImage = getPublicImage(authStore.user?.avatar)
const props = defineProps({
  logined:{type:Boolean},
  Amount:{type:Number}
})

function logout () {
  authStore.logout()

}
const router = useRouter()
</script>
