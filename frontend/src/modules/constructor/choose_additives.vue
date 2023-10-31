<script setup>
import { onUpdated, reactive, ref ,inject} from "vue";
import ingredients from '../../mocks/ingredients.json'
import ing from '../../common/data/ingredients.js'
import CounterButton from '../components/CounterButton.vue';
import Counter from '../components/Counter.vue';
import AppDrag from '@/common/components/AppDrag.vue'
import AppDrop from '@/common/components/AppDrop.vue'
const props = defineProps({
  ingredients: {
    type: Object,

  }
})
const emit = defineEmits(['update:ingredients'])

const data = reactive({
  droped:false,
  count:0,
  price:0,
  id:0
})

  

const changeIn = inject('changeIn')
function droptask(e){

  data.droped=true;
  data.count +=1
  data.price = e.target.firstElementChild.getAttributeNode('alt')
  data.id = e.target.firstElementChild.key
  let amount = parseInt(data.price) * parseInt(data.count)
  console.log(data.price);

  changeIn(amount,parseInt(data.count),parseInt(data.id),"")
}

onUpdated(() => {

  emit('update:ingredients', { amount: data.amount, count: data.count, id: data.id })
})


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
      <AppDrop v-for="ingredient in ingredients" v-model:drop="data" @mousedown="droptask">
        <AppDrag>
          <li class="ingredients__item" >
            <span :class="'filling filling--' + ing[parseInt(ingredient.id)]"
              :alt="ingredient.price" :key="parseInt(ingredient.id)">{{ ingredient.name }}</span>
            <div class="counter counter--orange ingredients__counter">
              <Counter v-model:ID="ingredient.id" v-model:price="ingredient.price"
                v-model:name="ing[parseInt(ingredient.id)]" v-model:data="data" v-model:drop="data"/>
            </div>
          </li>
        </AppDrag>
      </AppDrop>

    </ul>

  </div>
</template>