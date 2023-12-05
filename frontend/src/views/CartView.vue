<template>
  <form  @submit.prevent="submit"  autocomplete="off" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div class="sheet cart__empty" v-if="data.pizzalist.length===0">
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul class="cart-list sheet" v-else>
          <li class="cart-list__item" v-for="(item, index) in data.pizzalist" :key=index>
            <div class="product cart-list__product">
              <img src="../assets/img/product.svg" class="product__img" width="56" height="56" alt="Капричоза">
              <div class="product__text">
                <h2>{{ item.name }}</h2>
                <ul>
                  <li>{{ datastore.sizes.find(element => element.id === item.sizeId).name + ", на тонком тесте" }}</li>
                  <li>Соус: {{ datastore.sauce.find(element => element.id === item.sauceId).name }}</li>
                  <li>Начинка:{{ test(item.ingredients)}}</li>
                  <!-- IngredientsData -->
                </ul>
              </div>
            </div>

            <div class="counter cart-list__counter">
              <Conter :page="data.page" :productId="index" :quantity="item.quantity" ></Conter>
            </div>

            <div class="cart-list__price">
              <b>{{item.amount*item.quantity}}₽</b>
            </div>

            <div class="cart-list__button">
              <button type="button" class="cart-list__edit" @click="[router.push({ name: 'HomeView',params:{productIndex:index} })]" :key="item.id">Изменить</button>
            </div>
          </li>
          
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <li class="additional-list__item sheet" v-for="(item,index) in datastore.misc" :key="item.id">
              <p class="additional-list__description">
                <img :src="`/src/assets/img/${item.image}.svg`" width="39" height="60" :alt="item.name">
                <span>{{ item.name }}</span>
              </p>

              <div class="additional-list__wrapper">
                <div class="counter additional-list__counter">
                  <Conter :page="data.pageNew" :misc="item.id"></Conter>
                </div>

                <div class="additional-list__price">
                  <b>× {{ item.price }} ₽</b>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">

            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select name="test" class="select" @change="onchang($event)">
                <option value="1">Заберу сам</option>
                <option value="2">Новый адрес</option>
                <option value="3">Дом</option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input type="text" name="tel" placeholder="+7 999-999-99-99" @change="changeInfo($event)">
            </label>

            <div class="cart-form__address" v-if="data.takeType === '2'">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input type="text" name="street" @change="changeInfo($event,name)">
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small" >
                <label class="input">
                  <span>Дом*</span>
                  <input type="text" name="house" @change="changeInfo($event)">
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input type="text" name="apartment" @change="changeInfo($event)">
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <a href="#" class="button button--border button--arrow" @click="router.push({path:'/'})">Хочу еще одну</a>
      </div>
      <p class="footer__text">Перейти к конструктору<br>чтоб собрать ещё одну пиццу</p>
      <div class="footer__price">
        <b>Итого: {{gettotle(data.pizzalist,data.mice)}} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="button" class="button" @click="showpopup" :disabled="data.totle_amount===0?true:false">Оформить заказ</button>
      </div>
    </section>
  </form>
  <Popup v-if="data.showpopup" :logined="props.logined"></Popup>
  </template>
<script setup>

import { useRouter } from 'vue-router';
import { useCartStore, useDataStore } from '@/stores'
import { computed, onMounted, reactive } from 'vue';
import Conter from '../modules/components/AppCounter.vue'
import Popup from '../modules/components/popUp.vue' 


const router = useRouter()
const cartStore = useCartStore()
const datastore = useDataStore()
datastore.initData();
const data = reactive({
  Ingredients: '',
  page:"cart",
  pageNew:'cartMisc',
  pizzalist:'',
  mice:'',
  totle_amount:0,
  takeType:'1',
  showpopup:false,
  phone:'',
  address:{
    street: "",
    building: "",
    flat: "",
    comment: ""
  }
})

const props=defineProps({
  Amount:{type:Number},
  logined:{type:Boolean}
})
const emit = defineEmits(['update:Amount'])
data.pizzalist = computed(()=>{
  let list =[]

cartStore.pizzas.map(e=>{
  

  if(e.name!=''&& e.ingredients.length!==0){
    list.push(e)
  }
})

cartStore.pizzas = list
return list 
})

data.mice = computed(()=>{
  
  return cartStore.misc
})

function gettotle(pizzalist,mice){
  let amount_pizzas = 0,amount_misc = 0
  pizzalist.map(item=>{
    amount_pizzas += item.quantity*item.amount
  })
  mice.map(item=>{
    
    let item_amount = 0
    datastore.misc.map(val=>{
      if(val.id === item.miscId){
        item_amount = val.price
      }
    })

    amount_misc += item.quantity*item_amount
    
  })
  data.totle_amount = amount_pizzas + amount_misc
  emit('update:Amount',data.totle_amount )
  return data.totle_amount

}


function test(arr) {
  let result = new Array;


  if (arr !== undefined) {
    arr.map(element => {
      let strobj = datastore.ingredients.find(e =>e.id === element.ingredientId)
      
      if (strobj !== undefined) {
        result.push(strobj.name)
      }

    })
  }
  return result.join(',')
}
function onchang(e){
  data.takeType = e.target.value
}

function showpopup(){
  if(data.totle_amount>0){
    data.showpopup = true
}
  }
  
function submit(){

return false
}
function changeInfo(event){
  switch(event.target.name){
    case "tel":
      data.phone = event.target.value
      break;
    case "street":
      data.address.street =  event.target.value
      beeak;
    case 'house':
    data.address.building=  event.target.value
      break;
    case 'apartment':
    data.address.flat=  event.target.value
      break;
    
  }
  data.phone = event.target.value
}









</script>

<style lang="scss" scoped>
@import "../assets/scss/ds-system/ds-colors.scss";
@import "../assets/scss/ds-system/ds-typography.scss";
@import "../assets/scss/app.scss";


.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;

  margin-right: auto;

  span {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}


.cart-list {
  @include clear-list;

  padding: 15px 0;
}

.cart-list__item {
  display: flex;
  align-items: flex-start;

  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;

    border-bottom: none;
  }
}

.cart-list__product {
  flex-grow: 1;

  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;

  text-align: right;

  b {
    @include b-s16-h19;
  }
}

.cart-list__edit {
  @include l-s11-h13;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    color: $green-500;
  }

  &:active {
    color: $green-600;
  }

  &:focus {
    color: $green-400;
  }
}



.cart__title {
  margin-bottom: 15px;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.cart__empty {
  padding: 20px 30px;
}


.footer {
  display: flex;
  align-items: center;

  margin-top: auto;
  padding: 25px 2.12%;

  background-color: rgba($green-500, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;

  a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__text {
  @include l-s11-h13;

  color: rgba($black, 0.5);
}

.footer__price {
  @include b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.footer__submit {
  button {
    padding: 16px 14px;
  }
}


.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include b-s16-h19;
}

.select {
  @include r-s16-h19;

  display: block;

  margin: 0;
  padding: 8px 16px;
  padding-right: 30px;

  cursor: pointer;
  transition: 0.3s;

  color: $black;
  border: 1px solid $purple-400;
  border-radius: 8px;
  outline: none;
  background-color: $silver-100;
  background-image: url("../../src/assets/img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;

  font-family: inherit;

  appearance: none;

  &:hover {
    border-color: $orange-100;
  }

  &:focus {
    border-color: $green-500;
  }
}

.layout-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>