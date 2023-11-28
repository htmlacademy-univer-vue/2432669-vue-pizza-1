<script setup>
import sizes from '../../mocks/sizes.json'
import s from "../../common/data/sizes"
import {  reactive, onUpdated } from 'vue';

import {useCartStore} from '@/stores'
const cartStore = useCartStore()

const state = reactive({
    id:1,
    // sauce:"tomato",
    multiplier:50
    
})
const props = defineProps({
    size:{
        type:Object,
        
    }
})
const emit = defineEmits(['update:size'])
function onchange(e){
  if(e.target.checked){
    emit('update:size',{id:e.target.title,multiplier:e.target.alt})
    state.id=e.target.title
        // state.sauce = e.target.value
    state.multiplier = parseInt(e.target.alt) 
  }
}
onUpdated(()=>{
  cartStore.updateId("size",state.id)
})
</script>
<style lang="scss" scoped>
@import '../../assets/scss/ds-system/ds-colors.scss';
@import '../../assets/scss/ds-system/ds-shadows.scss';
@import '../../assets/scss/ds-system/ds-typography.scss';
@import '../../assets/scss/mixins/m_center.scss';

.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;

  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 46px;

    &::before {
      @include p_center_v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-color: $green-100;
      background-image: url("../../assets/img/diameter.svg");
      background-repeat: no-repeat;
      background-position: center;
      
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  &--small {
    span::before {
      background-size: 18px;
    }
  }

  &--normal {
    span::before {
      background-size: 29px;
    }
  }

  &--big {
    span::before {
      background-size: 100%;
    }
  }

  &:hover {
    span::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + span::before {
      box-shadow: $shadow-large;
    }
  }
}

</style>
<template>
    <div class="content__diameter">
        <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
                <label class="diameter__input diameter__input--small" v-for="size in sizes">
                    <input type="radio" name="diameter" :title="size.id" class="visually-hidden" :alt="size.multiplier"  @change="onchange">
                    <span>{{ size.name }}</span>
                </label>

            </div>
        </div>
    </div>
</template>