<script setup>
import { onMounted, onUpdated, reactive, inject, computed } from 'vue';
import sauce from '../../common/data/sauces'
import ings from '../../common/data/ingredients'
import {useCartStore,useDataStore} from '@/stores'
const dataStore = useDataStore()
const cartStore = useCartStore()
const pizzas = cartStore.pizzas

const props = defineProps({
    
    pizzaid:{
        type:String
    }
})
let ingredient =[]

const state = reactive({
    name1: "",
    name2: "",
    count: 0
})


const ingredients = inject('ingredients');

let show = computed(() => {
    return function (pizzaid) {
        let str = ''
        
        cartStore.pizzas.map(e=>{
        if (e.id === pizzaid){
            e.doughId ===2?state.name1 = "big":state.name1 = "small"
            e.sauceId=== 1 ? state.name2 = "tomato":state.name2 = "creamy"
        }
        })
        return state.name1 + '-'+state.name2
    }

})





</script>
<style lang="scss" scoped>
.pizza {
    position: relative;

    display: block;

    box-sizing: border-box;
    width: 100%;

    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;

    &--foundation--big-creamy {
        background-image: url("../../assets/img/foundation/big-creamy.svg");
    }

    &--foundation--big-tomato {
        background-image: url("../../assets/img/foundation/big-tomato.svg");
    }

    &--foundation--small-creamy {
        background-image: url("../../assets/img/foundation/small-creamy.svg");
    }

    &--foundation--small-tomato {
        background-image: url("../../assets/img/foundation/small-tomato.svg");
    }
}

.pizza__wrapper {
    width: 100%;
    padding-bottom: 100%;
}

.pizza__filling {
    $bl: &;
    position: absolute;
    top: 0;
    left: 0;

    display: block;

    width: 100%;
    height: 100%;

    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;

    &::before,
    &::after {
        display: none;

        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        content: '';

        background-image: inherit;
    }

    &--second {
        &::before {
            display: block;

            transform: rotate(45deg);
        }
    }

    &--third {
        &::before {
            display: block;

            transform: rotate(45deg);
        }

        &::after {
            display: block;

            transform: rotate(-45deg);
        }
    }

    &--ananas,
    &--ananas.pizza__filling--second::before,
    &--ananas.pizza__filling--third::after {
        background-image: url("../../assets/img/filling-big/ananas.svg");
    }

    &--bacon,
    &--bacon.pizza__filling--second::before,
    &--bacon.pizza__filling--third::after {
        background-image: url("../../assets/img/filling-big/bacon.svg");
    }

    &--blue_cheese,
    &--blue.pizza__filling--second::before,
    &--blue.pizza__filling--third::after {
        background-image: url("../../assets/img/filling-big/blue_cheese.svg");
    }

    &--cheddar,
    &--cheddar.pizza__filling--second::before,
    &--cheddar.pizza__filling--third::after {
        background-image: url("../../assets/img/filling-big/cheddar.svg");
    }

    &--chile,
    &--chile.pizza__filling--second::before,
    &--chile.pizza__filling--third::after {
        background-image: url("../../assets/img/filling-big/chile.svg");
    }

    &--ham,
    &--ham.pizza__filling--second::before,
    &--ham.pizza__filling--third::after {
        background-image: url("../../assets/img/filling-big/ham.svg");
    }

    &--jalapeno,
    &--jalapeno.pizza__filling--second::before,
    &--jalapeno.pizza__filling--third::after {
        background-image: url("../../assets/img/filling-big/jalapeno.svg");
    }

    &--mozzarella,
    &--mozzarella.pizza__filling--second::before,
    &--mozzarella.pizza__filling--third::after {
        background-image: url("../../assets/img/filling-big/mozzarella.svg");
    }

    &--mushrooms,
    &--mushrooms.pizza__filling--second::before,
    &--mushrooms.pizza__filling--third::after {
        background-image: url("../../assets/img/filling-big/mushrooms.svg");
    }

    &--olives,
    &--olives.pizza__filling--second::before,
    &--olives.pizza__filling--third::after {
        background-image: url("../../assets/img/filling-big/olives.svg");
    }

    &--onion,
    &--onion.pizza__filling--second::before,
    &--onion.pizza__filling--third::after {
        background-image: url("../../assets/img/filling-big/onion.svg");
    }

    &--parmesan,
    &--parmesan.pizza__filling--second::before,
    &--parmesan.pizza__filling--third::after {
        background-image: url("../../../assets/img/filling-big/parmesan.svg");
    }

    &--salami,
    &---salami.pizza__filling--second::before,
    &---salami.pizza__filling--third::after {
        background-image: url("../../assets/img/filling-big/salami.svg");
    }

    &--salmon,
    &--salmon.pizza__filling--second::before,
    &--salmon.pizza__filling--third::after {
        background-image: url("../../assets/img/filling-big/salmon.svg");
    }

    &--tomatoes,
    &--tomatoes.pizza__filling--second::before,
    &--tomatoes.pizza__filling--third::after {
        background-image: url("../../assets/img/filling-big/tomatoes.svg");
    }
}
</style>
<template>
    <div class="content__constructor">
        <div :class="'pizza pizza--foundation--' + show(props.pizzaid)" :key="state.count" >

            <div class="pizza__wrapper" > 
               
                    
            <div v-if="pizzas.length>0"  v-for="(item,index) in pizzas[(pizzas.length)-1].ingredients" class="pizza__filling" :class="['pizza__filling--' + ings[item.ingredientId],item.quantity===2?'pizza__filling--second':'',item.quantity === 3? 'pizza__filling--third':'']" :key="index"></div>
           
            <!-- <div class="pizza__filling pizza__filling--mushrooms" v-if="ingredients.length>0 && (ingredients[0]!=undefined && ingredients[0].count>0)" v-for="i in ingredients[0].count"></div>
            <div class="pizza__filling pizza__filling--cheddar" v-if="ingredients.length>0 && (ingredients[1]!=undefined &&  ingredients[1].count>0)" v-for="i in ingredients[1].count"></div>
            <div class="pizza__filling pizza__filling--salami" v-if="ingredients.length>0 && (ingredients[2]!=undefined &&  ingredients[2].count>0)" v-for="i in ingredients[2].count"></div>
            <div class="pizza__filling pizza__filling--ham" v-if="ingredients.length>0 && (ingredients[3]!=undefined&&  ingredients[3].count>0)" v-for="i in ingredients[3].count"></div>
            <div class="pizza__filling pizza__filling--ananas" v-if="ingredients.length>0 && (ingredients[4]!=undefined &&  ingredients[4].count>0)" v-for="i in ingredients[4].count"></div>
            <div class="pizza__filling pizza__filling--bacon" v-if="ingredients.length>0 && (ingredients[5]!=undefined&&  ingredients[5].count>0)" v-for="i in ingredients[5].count"></div>
            <div class="pizza__filling pizza__filling--onion" v-if="ingredients.length>0 && (ingredients[6]!=undefined &&  ingredients[6].count>0)" v-for="i in ingredients[6].count"></div>
            <div class="pizza__filling pizza__filling--chile" v-if="ingredients.length>0 && (ingredients[7]!=undefined && ingredients[7].count>0)" v-for="i in ingredients[7].count"></div>
            <div class="pizza__filling pizza__filling--jalapeno" v-if="ingredients.length>0 && (ingredients[8]!=undefined &&  ingredients[8].count>0)" v-for="i in ingredients[8].count"></div>
            <div class="pizza__filling pizza__filling--olives" v-if="ingredients.length>0 && (ingredients[9]!=undefined && ingredients[9].count>0)" v-for="i in ingredients[9].count"></div>
            <div class="pizza__filling pizza__filling--tomatoes" v-if="ingredients.length>0 && (ingredients[10]!=undefined &&  ingredients[10].count>0)" v-for="i in ingredients[10].count"></div>
            <div class="pizza__filling pizza__filling--salmon" v-if="ingredients.length>0 && (ingredients[11]!=undefined&&  ingredients[11].count>0)" v-for="i in ingredients[11].count"></div>
            <div class="pizza__filling pizza__filling--mozzarella" v-if="ingredients.length>0 && (ingredients[12]!=undefined &&  ingredients[12].count>0)" v-for="i in ingredients[12].count"></div>
            <div class="pizza__filling pizza__filling--parmesan" v-if="ingredients.length>0 && (ingredients[13]!=undefined &&  ingredients[13].count>0)" v-for="i in ingredients[13].count"></div>
            <div class="pizza__filling pizza__filling--blue_cheese" v-if="ingredients.length>0 && (ingredients[14]!=undefined &&  ingredients[14].count>0)" v-for="i in ingredients[14].count"></div> -->
        </div>
                

        </div>
    </div>
</template>
