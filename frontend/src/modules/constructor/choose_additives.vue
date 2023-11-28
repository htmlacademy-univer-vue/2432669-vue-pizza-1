<script setup>
import { onUpdated, reactive, ref, inject, watch,effect } from "vue";
import ingredients from '../../mocks/ingredients.json'
import ing from '../../common/data/ingredients.js'

import Counter from '../components/AppCounter.vue';
import AppDrag from '@/common/components/AppDrag.vue'
import AppDrop from '@/common/components/AppDrop.vue'
import { useCartStore } from '@/stores'
const cartStore = useCartStore()
const data = reactive({
  
  ingredient: {}

})

const props = defineProps({
    dragId:{
        type:Number,
        
    }
})
defineEmits(['drop'])


effect(() => {
  if (parseInt(data.ingredient.quantity) > 0) {
    
    cartStore.updateIngredient(data.ingredient)
  } else {

    cartStore.deleteIngredient(data.ingredient)
  }

})

function moveTask($event,task){
  
  let obj = JSON.parse($event)
  console.log(obj);
  let id = obj.id
  data.DragId = id
  let quantit = cartStore.findIngredient(id)
  data.ingredient = id
  data.quantity = quantit+1
  if(quantit === 0){
    data.ingredient = id
    data.quantity = 1
    
  }else{
    data.ingredient = id
    data.quantity = quantit+1
   
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
      <AppDrop v-for="ingredient in ingredients" @drop="moveTask($event,task)">

        <AppDrag :transfer-data="ingredient">
          <li class="ingredients__item">
            <span :class="'filling filling--' + ing[parseInt(ingredient.id)]" :alt="ingredient.price"
              :key="parseInt(ingredient.id)">{{ ingredient.name }}</span>
            <div class="counter counter--orange ingredients__counter">
              <Counter v-model:ingredientId="ingredient.id" v-model:price="ingredient.price"
                v-model:ingredients="data.ingredient" :dragId ="props.dragId" />
            </div>
          </li>
        </AppDrag>
      </AppDrop>

    </ul>

  </div>
</template>