<script setup>

import doughs from '../../mocks/dough.json'
import doug from "../../common/data/doughSizes"
import { onMounted, reactive } from 'vue';



const state = reactive({
    doughs:"large",
    price:300
    
})
const props = defineProps({
  dough:{type:Object}
})

const emit = defineEmits(['update:doughType'])


function change(event){
 console.log(1111);
   if(event.target.checked){
      state.doughs = event.target.value
      state.price = parseInt(event.target.alt
      ) 
   }
   emit('update:doughType',state)
   

}


onMounted(()=>{
  state.doughs='large'
})
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
                <label class="dough__input dough__input--light" v-for="dough in doughs">
                    <input type="radio" name="dough" :value="doug[parseInt(dough.id)]" :alt="dough.price"  class="visually-hidden" :checked = "dough.id ==2?true:false" @click="change" >
                    <b>{{ dough.name }}</b>
                    <span>{{ dough.description }}</span>
                </label>
            </div>
        </div>
    </div>
</template>

