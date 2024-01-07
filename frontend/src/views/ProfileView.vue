<template>
  <div class="layout__title">
    <h1 class="title title--big">Мои данные</h1>
  </div>

  <div class="user">
    <picture>
      <source type="image/webp" srcset="../assets/img/users/user5@2x.webp 1x, ../assets/img/users/user5@4x.webp 2x">
      <img :src="userImage" srcset=".userImage" :alt="authStore.user.name" width="72" height="72">
    </picture>
    <div class="user__name">
      <span>{{ authStore.user.name }}</span>
    </div>
    <p class="user__phone">Контактный телефон: <span>{{ authStore.user.phone }}</span></p>
  </div>

  <div class="layout__address" v-for="add in addresses.address">
    <div class="sheet address-form">
      <div class="address-form__header">
        <b>Адрес №{{ add.id + "." + add.name }}</b>
        <div class="address-form__edit">
          <button type="button" class="icon" :id="add.id" @click="changeAddress(add.id)"><span
              class="visually-hidden">Изменить адрес</span></button>
        </div>
      </div>
      <p>{{ add.street + ",д." + add.building + ",кв." + add.flat }}</p>
      <small>{{ add.comment }}</small>
    </div>
  </div>

  <div class="layout__address" v-if="status.changId !== -1">
    <form action="test.html" method="post" class="address-form address-form--opened sheet">
      <div class="address-form__header">
        <b>Адрес № {{ status.changeinfo.id }}</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <input type="text" name="addr-name" placeholder="Введите название адреса" :value="status.changeinfo.name"
              @blur="changeinfo($event)" required>
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <input type="text" name="addr-street" placeholder="Введите название улицы" :value="status.changeinfo.street"
              @blur="changeinfo($event)" required>
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <input type="text" name="addr-house" placeholder="Введите номер дома" :value="status.changeinfo.building"
              @blur="changeinfo($event)" required>
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <input type="text" name="addr-apartment" placeholder="Введите № квартиры" :value="status.changeinfo.flat"
              @blur="changeinfo($event)">
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <input type="text" name="addr-comment" placeholder="Введите комментарий" :value="status.changeinfo.comment"
              @blur="changeinfo($event)">
          </label>
        </div>
      </div>

      <div class="address-form__buttons">
        <button type="button" class="button button--transparent" @click="deleteAddress(status.changId)">Удалить</button>
        <button type="submit" class="button" @click="updateAddress(status.changeinfo)">Сохранить</button>
      </div>
    </form>
  </div>
  <div class="layout__address" v-if="status.add">
    <form  @submit.prevent="postAddress(status.addinfo)" class="address-form address-form--opened sheet">
      <div class="address-form__header">
        <b>Адрес </b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <input type="text" name="addr-name" placeholder="Введите название адреса" @blur="addinfo($event)" required>
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <input type="text" name="addr-street" placeholder="Введите название улицы"  @blur="addinfo($event)" required>
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <input type="text" name="addr-house" placeholder="Введите номер дома" @blur="addinfo($event)" required>
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <input type="text" name="addr-apartment" placeholder="Введите № квартиры" @blur="addinfo($event)">
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <input type="text" name="addr-comment" placeholder="Введите комментарий" @blur="addinfo($event)">
          </label>
        </div>
      </div>

      <div class="address-form__buttons">
        <!-- <button type="button" class="button button--transparent">Удалить</button> -->
        <button type="submit" class="button"  @click="postAddress(status.addinfo)">Сохранить</button>
      </div>
    </form>
  </div>

  <div class="layout__button">
    <button type="button" class="button button--border" @click="addAddress()">Добавить новый адрес</button>
  </div>
</template>
<script setup>
import { useAuthStore, useProfileStore } from '@/stores'
import { getPublicImage } from '@/common/helper'
import { reactive } from 'vue';

const authStore = useAuthStore()
const addresses = useProfileStore()
addresses.fetchaddress()
const userImage = getPublicImage(authStore.user?.avatar)

const status = reactive({
  changId: -1,
  add: false,
  changeinfo: {
  },
  addinfo: {
    building: "",
    comment: "",
    flat: "",
    userId:authStore.user.id,
    name: "",
    street: ""
  }
})

function changeAddress(id) {
  status.changId = id;
  addresses.address.map(item => {
    if (item.id === status.changId) {
      status.changeinfo = item
    }
  })

}
function deleteAddress(id) {
  const res = addresses.deleteaddress(id)

  status.changId = -1
  status.changeinfo = {}
}
function changeinfo(event) {
  switch (event.currentTarget.name) {
    case 'addr-name':
      status.changeinfo.name = event.currentTarget.value
      break;
    case 'addr-street':
      status.changeinfo.street = event.currentTarget.value
      status.changeinfo.name = `ул.${status.changeinfo.street}, д.${status.changeinfo.building}, кв.${status.changeinfo.flat}`
      break;
    case 'addr-house':
      status.changeinfo.building = event.currentTarget.value
      status.changeinfo.name = `ул.${status.changeinfo.street}, д.${status.changeinfo.building}, кв.${status.changeinfo.flat}`
      break;
    case 'addr-apartment':
      status.changeinfo.flat = event.currentTarget.value
      status.changeinfo.name = `ул.${status.changeinfo.street}, д.${status.changeinfo.building}, кв.${status.changeinfo.flat}`

      break;
    case 'addr-comment':
      status.changeinfo.comment = event.currentTarget.value
      status.changeinfo.name = `ул.${status.changeinfo.street}, д.${status.changeinfo.building}, кв.${status.changeinfo.flat}`
      break;
  }
}
function updateAddress(changeinfo) {
  addresses.updateAddress(changeinfo)

  status.changId = -1
  status.changeinfo = {}
}
function addAddress() {
  status.add = true
}
function addinfo(event) {
  switch (event.currentTarget.name) {
    case 'addr-name':
      status.addinfo.name = event.currentTarget.value
      break;
    case 'addr-street':
      status.addinfo.street = event.currentTarget.value
      status.addinfo.name = `ул.${status.addinfo.street}, д.${status.addinfo.building}, кв.${status.addinfo.flat}`
      break;
    case 'addr-house':
      status.addinfo.building = event.currentTarget.value
      status.addinfo.name = `ул.${status.addinfo.street}, д.${status.addinfo.building}, кв.${status.addinfo.flat}`
      break;
    case 'addr-apartment':
      status.addinfo.flat = event.currentTarget.value
      status.addinfo.name = `ул.${status.addinfo.street}, д.${status.addinfo.building}, кв.${status.addinfo.flat}`

      break;
    case 'addr-comment':
      status.addinfo.comment = event.currentTarget.value
      status.addinfo.name = `ул.${status.addinfo.street}, д.${status.addinfo.building}, кв.${status.addinfo.flat}`
      break;
  }
}
function postAddress(addinfo) {
  addresses.addAddress(addinfo)

  status.add = false
  status.addinfo = {}
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/app.scss";

.address-form {

  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  &--opened {
    #{$bl}__header {
      padding: 16px;
    }
  }

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  small {
    @include l-s11-h13;

    display: block;

    padding: 0 16px;
  }
}

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;

  &--size {
    &--normal {
      width: 60.5%;
    }

    &--small {
      width: 18%;
    }
  }
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;

  padding: 0 16px;

  button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}

.address-form__header {
  @include b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);
}

.input {
  display: block;

  span {
    @include r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;

    font-family: inherit;

    &:focus {
      border-color: $green-500;
    }
  }

  &:hover {
    input {
      border-color: $black;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;

    span {
      @include b-s16-h19;

      margin-right: 16px;

      white-space: nowrap;
    }
  }
}

.icon {
  display: block;
  overflow: hidden;

  width: 32px;
  height: 32px;

  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;
  background-color: $white;
  background-image: url("../assets/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    box-shadow: $shadow-light;
  }

  &:active {
    box-shadow: $shadow-large;
  }

  &:focus {
    box-shadow: $shadow-regular;
  }
}

.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: 33px;
}

.user__name {
  @include b-s20-h23;

  margin-left: 30px;

  span {
    display: inline-block;

    vertical-align: middle;
  }
}

.user__button {
  display: inline-block;

  cursor: pointer;
  vertical-align: middle;
}

.user__phone {
  @include b-s16-h19;

  width: 100%;
  margin-top: 20px;

  span {
    font-weight: 400;
  }

}</style>

