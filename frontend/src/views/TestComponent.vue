<template>
    <main class="content">
        <form action="#" method="post">
            <div class="content_wrapper">
                <h1 class="title title--big" data-test="title--big">Конструктор пиццы</h1>
                <div class="content__dough" >
                    <div class="sheet">
                        <h2 class="title title--small sheet__title" >Выберите тесто</h2>
                        <div class="sheet__content dough"  >
                            <label class="dough__input" data-test="dough-List" v-for="dough in datastore.dough" >
                                <input type="radio" name="dough" :alt="dough.price" :title="dough.id"  class="visually-hidden"  >
                                <b>{{ dough.name }}</b>
                                <span>{{ dough.description }}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </main>
</template>

<script setup>
import { useCartStore, useDataStore } from '@/stores'
const cartstore = useCartStore()
const datastore = useDataStore()
// datastore.initData()
</script>

<style lang="scss" scoped></style>