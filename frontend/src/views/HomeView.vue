<script setup>
import choose_dough from '../modules/constructor/choose_dough.vue'
import choose_sauce from '../modules/constructor/choose_sauce.vue'
import choose_size from '../modules/constructor/choose_size.vue'
import choose_additives from '../modules/constructor/choose_additives.vue'
import choose_display from '../modules/constructor/choose|_display.vue'
import AppDrop from "../common/components/AppDrop.vue"
import {useCartStore} from '@/stores'
import {ref, reactive, provide, onUpdated, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const cartStore = useCartStore()
const data = reactive({
  name:'',
  dough:{
    id:2,
    // doughs:"large",
    price:300
  },
  sauce:{
    id:1,
    // sauce:"tomato",
    price:50
  },
  size:{
    id:1,
    // size:'',
    multiplier:1
  },
  ingredients:new Array(),
  DragId:0
})

let all =0
const getValue =ref()



let pizza = {}

let show = computed(()=>{
  return function(ins){
    let all =0
    ins.map((item)=>{
    
    if(item !== undefined){
      all+=parseInt(item.amount)
    }
    
  })
  return all
  }
})

function moveTask($event,task){
  
  let obj = JSON.parse($event)
  console.log(obj);
  let id = obj.id
  data.DragId = id
  let quantit = cartStore.findIngredient(id)
  if(quantit === false){
    cartStore.updateIngredient({ingredientId:id,quantity:1})
  }else{
    cartStore.updateIngredient({ingredientId:id,quantity:parseInt(quantit)+1})
  }

}

function onchange(e){
  cartStore.AddPizzaName(e.target.value)
}

onMounted(()=>{  
  pizza={
    name:'',
    sauceId:1,
    doughId:1,
    sizeId:1,
    quantity:1,
    ingredients:[]
  }
  cartStore.AddPizza(pizza)
})

</script>
<!-- @drop="moveTask($event,task)" -->

<template>    
  <main class="content">
    <form action="#" method="post">

      <AppDrop class="content__wrapper" @drop="moveTask" >
        <h1 class="title title--big">Конструктор пиццы</h1>

        <choose_dough v-model:doughType = 'data.dough'></choose_dough>

        <choose_size v-model:size = 'data.size'/>
      
     
        
        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

            <div class="sheet__content ingredients">

              <choose_sauce v-model:Sauce = 'data.sauce' ></choose_sauce>

              <choose_additives :datas = "data.ingredients" :dragId="data.DragId" @drop="moveTask($event,task)"/>

            </div>
          </div>
        </div>
          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input type="text" name="pizza_name" placeholder="Введите название пиццы" v-model="data.name" @blur="onchange">
            </label>

            <choose_display  v-model:dough= "data.dough.id" v-model:sauce ="data.sauce.id"/>

            <div class="content__result">
              <p>Итого: {{ (data.dough.price + data.sauce.price)*data.size.multiplier + show(data.ingredients)  }} ₽</p>
              <button type="button" class="button" @click="router.push({ path: '/cart' })" :disabled="cartStore.pizzas.length>0 && cartStore.pizzas[cartStore.pizzas.length-1].ingredients.length>0?false:true"  >Готовьте!</button>
            </div>
          </div>
        </AppDrop>

      

    </form>
  </main>
</template>