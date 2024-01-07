
<template>  

  <div class="layout__title">
    <h1 class="title title--big">История заказов</h1>
  </div>

  <section class="sheet order" v-for="order in orders.orders">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{order.id}}</b>

      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ 
        gettotle(order.id,total.total)}}
          ₽</span>
      </div>

      <div class="order__button">
        <button type="button" class="button button--border" :id="order.id" @click="deleteOrder($event)">Удалить</button>
      </div>
      <div class="order__button">
        <button type="button" class="button" @click="[onemoretime(order.id),router.push('/cart')]" >Повторить</button>
      </div>
    </div>

    <ul class="order__list">
      <li class="order__item" v-for="item in order.orderPizzas">
        <div class="product">
          <img src="../assets/img/product.svg" class="product__img" width="56" height="56" alt="Капричоза">
          <div class="product__text">
            <h2>{{item.name}}</h2>
            <ul>
              <li>{{ datastore.sizes[item.sizeId-1].name +",на "+ datastore.dough[item.doughId-1].name+" тесте"}}</li>
              <li>Соус: {{ datastore.sauce[item.sauceId-1].name }}</li>
              <li>
                Начинка: <span  v-for="it in item.ingredients"> {{ datastore.ingredients.map(i=>{
                  if(i.id === it.ingredientId){
                    price.addittion.push(i.price)
                    return i.name + ' '
                  }
                  
                }).join('') }}</span>
                 <!-- грибы, лук, ветчина, пармезан, ананас, бекон, блю чиз -->
              </li>
            </ul>
          </div>
        </div>

        <p class="order__price">{{ item.quantity === 1?getPizzaprice(item.sizeId, price.addittion):item.quantity + " X " +  getPizzaprice(item.sizeId, price.addittion,item.quantity) }} ₽</p>
      </li>
      
    </ul>

    <ul class="order__additional" v-if="order.orderMisc">
      <li v-for="miscorder in order.orderMisc">
        <img  :src="`${getPublicImage(datastore.misc[miscorder.miscId-1].image)}`" width="20" height="30" :alt="datastore.misc[miscorder.miscId-1].name">
        <p>
          <span>{{datastore.misc[miscorder.miscId-1].name}}</span>
          <b>{{ miscorder.quantity === 1? datastore.misc[miscorder.miscId-1].price : miscorder.quantity +'X'+datastore.misc[miscorder.miscId-1].price }} ₽</b>
          <span style="display: none;">{{
            miscorder.quantity === 1?
          price.miscs.push(datastore.misc[miscorder.miscId-1].price) :
          price.miscs.push( Number(datastore.misc[miscorder.miscId-1].price) * miscorder.quantity )
           }}</span>
        </p>
      </li>
      <!-- <li>
        <img src="../assets/img/sauce.svg" width="20" height="30" alt="Острый соус">
        <span>Острый соус <br>30 ₽</span>
      </li>
      <li>
        <img src="../assets/img/potato.svg" width="20" height="30" alt="Картошка из печи">
        <p>
          <span>Картошка из печи</span>
          <b>170 ₽</b>
        </p>
      </li> -->
    </ul>
    <span >
      {{ getAllprice(price.miscs,price.pizzas,order.id) }}
    </span>
    <p class="order__address" v-if="order.orderAddress">Адрес доставки: {{ order.orderAddress.name }}</p>
    
  </section>

  <!-- <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #11199929</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: 1 564 ₽</span>
      </div>

      <div class="order__button">
        <button type="button" class="button button--border">Удалить</button>
      </div>
      <div class="order__button">
        <button type="button" class="button">Повторить</button>
      </div>
    </div>

    <ul class="order__list">
      <li class="order__item">
        <div class="product">
          <img src="../assets/img/product.svg" class="product__img" width="56" height="56" alt="Капричоза">
          <div class="product__text">
            <h2>Капричоза</h2>
            <p>
              30 см, на тонком тесте<br>
              Соус: томатный<br>
              Начинка: грибы, лук, ветчина, пармезан, ананас
            </p>
          </div>
        </div>

        <p class="order__price">782 ₽</p>
      </li>
      <li class="order__item">
        <div class="product">
          <img src="../assets/img/product.svg" class="product__img" width="56" height="56" alt="Капричоза">
          <div class="product__text">
            <h2>Моя любимая</h2>
            <p>
              30 см, на тонком тесте<br>
              Соус: томатный<br>
              Начинка: грибы, лук, ветчина, пармезан, ананас
            </p>
          </div>
        </div>

        <p class="order__price">2х782 ₽</p>
      </li>
    </ul>

    <ul class="order__additional">
      <li>
        <img src="../assets/img/cola.svg" width="20" height="30" alt="Coca-Cola 0,5 литра">
        <p>
          <span>Coca-Cola 0,5 литра</span>
          <b>56 ₽</b>
        </p>
      </li>
      <li>
        <img src="../assets/img/sauce.svg" width="20" height="30" alt="Острый соус">
        <p>
          <span>Острый соус</span>
          <b>30 ₽</b>
        </p>
      </li>
      <li>
        <img src="../assets/img/potato.svg" width="20" height="30" alt="Картошка из печи">
        <p>
          <span>Картошка из печи</span>
          <b>170 ₽</b>
        </p>
      </li>
    </ul>

    <p class="order__address">Адрес доставки: Тест (или если адрес новый - писать целиком)</p>
  </section> -->





</template>

<script setup>

import {useCartStore,useDataStore,usePizzaStore} from '@/stores'
import { tipsService} from '../services'
import { getPublicImage } from '@/common/helper'
import { effect, onMounted, reactive } from 'vue';
import { useRouter,useRoute } from 'vue-router';

const route=useRoute()
const orders = usePizzaStore()
orders.fetchorders()
const cartStore = useCartStore()
const datastore = useDataStore()
// datastore.initData()
const router = useRouter()

let price = {
 addittion:[],
  miscs:[],
  pizzas:[],
  total:[]
}
let total = reactive({
  total:[]
})
if(Object.keys(route.query).length!==0){
  
  if(route.query.reload){
    total.total=[]
  }
  

  
}
function gettotle(id,total){
  let number = 0
  total.map(item=>{
            if(item.id===id){
              number= item.pric

            } 
          })
  return number
  
}

function getPizzaprice(iddough ,addittion,quantity=1){
  let additionamount = 0
 
  addittion.map(item=>{
    additionamount +=Number(item)
  })
  let amount =0 
  amount= (additionamount+300+50)*Number(datastore.sizes[iddough-1].multiplier)
  price.pizzas.push(amount * quantity)
  price.addittion=[]
  return amount
}
function getAllprice(miscs ,pizzas,uid){
 
  let amountMiscs = 0,pizzasamount = 0
  if(miscs){
    miscs.map(item=>{
    amountMiscs +=Number(item)
  })
  }
  
  pizzas.map(item=>{
    pizzasamount +=Number(item)
  })
  let amount =0 
  amount= pizzasamount + amountMiscs
  const data = {
    id:uid,
    pric:amount
  }
  price.total.push(data)
  price.pizzas=[]
  price.miscs =[] 
  total.total =   price.total
 
}




function deleteOrder(event){

   orders.deleteorders(event.currentTarget.id);
  

}

function onemoretime(id){
 
  orders.orders.map(item=>{
    if(item.id === id ){
     
      cartStore.pizzas = item.orderPizzas
      if(item.orderMisc){
      cartStore.misc = item.orderMisc

      }else{
        cartStore.misc = []
      }

    }
  })
}

// onMounted(()=>{
  
// })
</script>

<style lang="scss" scoped>
@import "../assets/scss/app.scss";
.order {
margin-bottom: 32px;
padding-top: 0;
}

.order__wrapper {
display: flex;
align-items: center;

padding: 6px 16px;

border-bottom: 1px solid rgba($green-500, 0.1);

b {
@include b-s14-h16;
}

span {
@include b-s14-h16;
}

button {
padding: 8px 26px;
}
}

.order__number {
margin-right: auto;
}

.order__sum {
margin-right: 16px;
}

.order__button {
margin-left: 16px;
}

.order__list {
@include clear-list;

display: flex;
align-items: flex-start;
flex-wrap: wrap;

margin-top: 24px;
padding-right: 10px;
padding-left: 10px;
}

.order__item {
display: flex;

width: 310px;
margin-right: 33px;
margin-bottom: 32px;
}

.order__price {
@include b-s16-h19;

margin: 0;

white-space: nowrap;
}

.order__additional {
@include clear-list;

display: flex;
align-items: flex-start;
flex-wrap: wrap;

margin-bottom: 5px;
padding-left: 80px;

li {
@include b-s11-h16;

width: 130px;
margin-right: 24px;
margin-bottom: 10px;
}

p {
margin: 0;
}

img {
float: left;

margin-right: 7px;
}

b {
display: block;
}
}

.order__address {
@include l-s11-h13;

margin: 0;
padding: 16px 10px;

border-top: 1px solid rgba($green-500, 0.1);
}

</style>