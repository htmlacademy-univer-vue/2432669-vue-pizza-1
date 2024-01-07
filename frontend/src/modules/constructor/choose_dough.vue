<script setup>

import doughs from '../../mocks/dough.json'
import doug from "../../common/data/doughSizes"
import { onMounted, onUpdated, reactive } from 'vue';

import {useDataStore} from '@/stores'
const dataStore = useDataStore()

const props = defineProps({
  doughid:{type:Number}
})
const state = reactive({
    id:props.doughid
  })

 


const emit = defineEmits(['update:doughid'])


function change(event){
 
   if(event.target.checked){
    state.id =  parseInt(event.target.title)  
     
   }
   emit('update:doughid',state.id)
   

}



</script>
<style lang="scss" scoped>
@import '../../assets/scss/ds-system/ds-colors.scss';
@import '../../assets/scss/ds-system/ds-shadows.scss';
@import '../../assets/scss/ds-system/ds-typography.scss';
@import '../../assets/scss/mixins/m_center.scss';
.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include r-s16-h19;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-image: url('../../assets/img/dough-light.svg');
        
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url("../../assets/img/dough-large.svg");
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>


<template>
    <div class="content__dough">
        <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>
            <div class="sheet__content dough">
                <label class="dough__input dough__input--light" v-for="dough in dataStore.dough">
                    <input type="radio" name="dough" :alt="dough.price" :title="dough.id"  class="visually-hidden" :checked = "dough.id ==state.id?true:false" @click="change" >
                    <b>{{ dough.name }}</b>
                    <span>{{ dough.description }}</span>
                </label>
            </div>
        </div>
    </div>
</template>

