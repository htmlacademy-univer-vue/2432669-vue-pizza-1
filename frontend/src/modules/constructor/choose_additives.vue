<script setup>
import { onUpdated, reactive, ref, inject, watch,effect } from "vue";



import Counter from '../components/AppCounter.vue';
import AppDrag from '@/common/components/AppDrag.vue'
import AppDrop from '@/common/components/AppDrop.vue'
import { useCartStore, useDataStore } from '@/stores'

const dataStore = useDataStore()
const cartStore = useCartStore()
const data = reactive({
  
  ingredient: {
    ingredientId:0,
    quantity:0
  }

})

const props = defineProps({
  draged:{
        type:Object,        
    },
    added:{
      type:Boolean
    }, pizzaid:{
        type:String
    },
    ings:{
      type:Array
    },
    index:{type:Number}
})

const emit = defineEmits(["update:added"]);
// defineEmits(['drop'])


effect(() => {
 
  if (parseInt(data.ingredient.quantity) > 0) {
    
    cartStore.updateIngredient(data.ingredient.ingredientId,data.ingredient.quantity,props.index)
  } else {

    cartStore.deleteIngredient(data.ingredient,props.index)
  }

  cartStore.pizzas.map(e=>{
    if(e.id === props.pizzaid) {
      if(e.ingredients.length > 0){
        emit("update:added",true)
      }else{
        emit("update:added",false)
      }
    }
  })

})

function shouw(id){
  if(props.ings){
    props.ings.map(e=>{
    if(e.ingredientId === id){
      console.log(e.quantity);
      return parseInt(e.quantity)
    }
  })
  }else{
    return 0
  }
  
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/ds-system/ds-colors.scss';
@import '../../assets/scss/ds-system/ds-shadows.scss';
@import '../../assets/scss/ds-system/ds-typography.scss';
@import '../../assets/scss/mixins/m_center.scss';

.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  &::before {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    content: "";

    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;

  }

  &--tomatoes::before {
    background-image: url("../../assets/img/filling/tomatoes.svg");
  }

  &--ananas::before {
    background-image: url("../../assets/img/filling/ananas.svg");
  }

  &--bacon::before {
    background-image: url("../../assets/img/filling/bacon.svg");
  }

  &--blue_cheese::before {
    background-image: url("../../assets/img/filling/blue_cheese.svg");
  }

  &--cheddar::before {
    background-image: url("../../assets/img/filling/cheddar.svg");
  }

  &--chile::before {
    background-image: url("../../assets/img/filling/chile.svg");
  }

  &--ham::before {
    background-image: url("../../assets/img/filling/ham.svg");
  }

  &--jalapeno::before {
    background-image: url("../../assets/img/filling/jalapeno.svg");
  }

  &--mozzarella::before {
    background-image: url("../../assets/img/filling/mozzarella.svg");
  }

  &--mushrooms::before {
    background-image: url("../../assets/img/filling/mushrooms.svg");
  }

  &--olives::before {
    background-image: url("../../assets/img/filling/olives.svg");
  }

  &--onion::before {
    background-image: url("../../assets/img/filling/onion.svg");
  }

  &--parmesan::before {
    background-image: url("../../assets/img/filling/parmesan.svg");
  }

  &--salami::before {
    background-image: url("../../assets/img/filling/salami.svg");
  }

  &--salmon::before {
    background-image: url("../../assets/img/filling/salmon.svg");
  }
}
</style>
<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <AppDrop v-for="ingredient in dataStore.ingredients" @drop="moveTask($event,task)">

        <AppDrag :transfer-data="ingredient">
          <li class="ingredients__item">
            <span :class="'filling filling--' + ingredient.status" :alt="ingredient.price"
              :key="parseInt(ingredient.id)">{{ ingredient.name }}</span>
            <div class="counter counter--orange ingredients__counter">
              <Counter v-model:ingredientId="ingredient.id" v-model:price="ingredient.price"
                v-model:ingredients="data.ingredient" :draged ="props.draged"  :counrval ="props.ings" :indexPizza = 'props.index'>
                
              </Counter>
            </div>
          </li>
        </AppDrag>
      </AppDrop>

    </ul>

  </div>
</template>