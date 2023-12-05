<script setup>
import choose_dough from '../modules/constructor/choose_dough.vue'
import choose_sauce from '../modules/constructor/choose_sauce.vue'
import choose_size from '../modules/constructor/choose_size.vue'
import choose_additives from '../modules/constructor/choose_additives.vue'
import choose_display from '../modules/constructor/choose|_display.vue'
import AppDrop from "../common/components/AppDrop.vue"
import { useCartStore, useDataStore } from '@/stores'
import { ref, reactive, toRaw , onMounted, computed, onUpdated, effect } from 'vue'
import { useRouter,useRoute } from 'vue-router';

const router = useRouter()
const route=useRoute()
const datastroe = useDataStore()
const cartStore = useCartStore()
datastroe.initData()

let pizza = reactive( {
    id: new Date(),
    name: '',
    sauceId: 1,
    doughId: 1,
    sizeId: 1,
    quantity: 1,
    ingredients: [],
    amount: 0
  })

const data = reactive({
  pizzaid: 0,
  name: '',
  draged: { id: 0, count: 0 },
  added:false,
  index:cartStore.pizzas.length
})
if(Object.keys(route.params).length!==0){
  if(route.params.productIndex){
    pizza =   cartStore.pizzas[route.params.productIndex]
  data.index = route.params.productIndex
  }else if(route.params.reload){
    router.go()
  }
  
  
  
}




let show = computed(() => {
  return function (cartStore,datastroe,data) {
    
    const pizzas_pro = cartStore.pizzas.filter(item => {return item.id === data.pizzaid})
    const pizzas=toRaw(pizzas_pro[0])
    if(pizzas!==undefined){
      data.open = (data.added && pizzas.name !=='')?false :true
      console.log(pizza.name);
      
    const doughPriceList = datastroe.dough.map(item => {
            if (item.id === pizzas.doughId) {
        return parseInt(item.price) 
      }
    })
    const doughPrice = doughPriceList.filter(e=>e!==undefined)
    const saucePriceList = datastroe.sauce.map(item => {
      if (item.id === pizzas.sauceId) {
        return parseInt(item.price)       
      }
    })

    const saucePrice =  saucePriceList.filter(e=>e!==undefined)
    

    const sizeList = datastroe.sizes.map(item => {
      if (item.id === pizzas.sizeId) {
        
        return parseInt(item.multiplier)
      }
    })
    const size =  sizeList.filter(e=>e!==undefined)
   

    let all = 0
    if(pizzas.ingredients){
      pizzas.ingredients.map(item => {
        datastroe.ingredients.map(val => {
          if (item.ingredientId === val.id) {
            all += val.price
          }
        })
      })
    }
    
    pizza.amount = (all + parseInt(saucePrice) + parseInt(doughPrice)) * size
    return pizza.amount
  }
  }
})

function moveTask($event, task) {

  let obj = JSON.parse($event)

  let id = obj.id
  data.draged.id = id
  data.draged.count += 1
  let quantit = cartStore.findIngredient(id,data.index)

  if (parseInt(quantit) === 0) {
    cartStore.updateIngredient(id, 1,data.index)
    console.log(cartStore.findIngredient(id,data.index));
  } else if (parseInt(quantit) < 3) {
    console.log(parseInt(quantit) + 1);

    cartStore.updateIngredient(id, parseInt(quantit) + 1,data.index)
    console.log(cartStore.findIngredient(id,data.index));

  }

}

function onchange(e) {
  pizza.name = e.target.value
  cartStore.AddPizzaName(e.target.value,data.index)
}
function check(){
  const pizzas_pro = cartStore.pizzas.filter(item => {return item.id === data.pizzaid})
    const pizzas=toRaw(pizzas_pro[0])
    
    if(pizzas){
     data.open = (pizzas.ingredients.length > 0 && pizzas.name !=='')?false :true
    }
    console.log(open);
    
}

effect(()=>{
  check
})
onMounted(() => {
  data.pizzaid = pizza.id
  console.log(Object.keys(route.params).length);
 if(Object.keys(route.params).length===0){  
  cartStore.AddPizza(pizza)
}
 
})

</script>
<!-- @drop="moveTask($event,task)" -->

<template>
  <main class="content">
    <form action="#" method="post">

      <AppDrop class="content__wrapper" @drop="moveTask">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <choose_dough v-model:doughid="pizza.doughId" :index="data.index"></choose_dough>

        <choose_size  v-model:sizeid="pizza.sizeId" :index="data.index"/>



        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

            <div class="sheet__content ingredients">

              <choose_sauce  v-model:sauceid="pizza.sauceId" :index="data.index"></choose_sauce>

              <choose_additives  :draged="data.draged" :pizzaid="pizza.id" v-model:added="data.added" :ings = "pizza.ingredients" :index="data.index"/>

            </div>
          </div>
        </div>
        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input type="text" name="pizza_name" placeholder="Введите название пиццы" v-model="data.name" 
              @blur="onchange" v-if="Object.keys(route.params).length===0">
              <input type="text" name="pizza_name" :placeholder="pizza.name" v-model="data.name" 
              disabled v-else>
          </label>

          <choose_display  :pizzaid="pizza.id"/>

          <div class="content__result">
            <p>Итого: {{ show(cartStore,datastroe,data) }} ₽</p>
            <button type="button" class="button" @click="[router.push({ path: '/cart' })]"
              :disabled= "data.open">Готовьте!</button>
          </div>
        </div>
    </AppDrop>



  </form>
</main></template>