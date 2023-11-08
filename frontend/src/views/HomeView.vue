<script setup>
import choose_dough from '../modules/constructor/choose_dough.vue'
import choose_sauce from '../modules/constructor/choose_sauce.vue'
import choose_size from '../modules/constructor/choose_size.vue'
import choose_additives from '../modules/constructor/choose_additives.vue'
import choose_display from '../modules/constructor/choose|_display.vue'
import AppDrop from "../common/components/AppDrop.vue"
import {ref, reactive, provide, onUpdated, onMounted, computed } from 'vue'
const data = reactive({
  dough:{
    doughs:"large",
    price:300
  },
  sauce:{
    sauce:"tomato",
    price:50
  },
  size:{
    size:'',
    multiplier:1
  },
  ingredients:new Array()
})

let all =0

provide('ingredients',data.ingredients)

provide('changeIn',(amount,count,id,key)=>{
  
  if( data.ingredients[id-1] != undefined){
    data.ingredients[id-1].count=count
    data.ingredients[id-1].amount=amount
  }else{
    data.ingredients[id-1] = {amount:amount,count:count,id:id,name:key}
  }
  
})



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
  let id = obj.id
  if(data.ingredients[id-1]!== undefined){
     data.ingredients[id-1].count = parseInt(data.ingredients[id-1].count) + 1
     data.ingredients[id-1].amount += parseInt( data.ingredients[id-1].amount)+ obj.price
    
  }else{
    data.ingredients[id-1]= {amount:obj.price,count:1,id:id,name:obj.name}

  }
console.log(data.ingredients);
}

</script>
<!-- @drop="moveTask($event,task)" -->

<template>    
  <main class="content">
    <form action="#" method="post">

      <AppDrop class="content__wrapper" @drop="moveTask($event,task)" >
        <h1 class="title title--big">Конструктор пиццы</h1>

        <choose_dough v-model:doughType = 'data.dough'></choose_dough>

        <choose_size v-model:size = 'data.size'/>
      
     
        
        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

            <div class="sheet__content ingredients">

              <choose_sauce v-model:Sauce = 'data.sauce' ></choose_sauce>

              <choose_additives :datas = "data.ingredients"/>

            </div>
          </div>
        </div>
          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input type="text" name="pizza_name" placeholder="Введите название пиццы">
            </label>

            <choose_display  v-model:dough= "data.dough.doughs" v-model:sauce ="data.sauce.sauce"/>

            <div class="content__result">
              <p>Итого: {{ (data.dough.price + data.sauce.price)*data.size.multiplier + show(data.ingredients)  }} ₽</p>
              <button type="button" class="button" disabled>Готовьте!</button>
            </div>
          </div>
        </AppDrop>

      

    </form>
  </main>
</template>