<template>
    <div class="sign-form">
        <a href="#" class="close close--white">
            <span class="visually-hidden">Закрыть форму авторизации</span>
        </a>
        <div class="sign-form__title">
            <h1 class="title title--small">Авторизуйтесь на сайте</h1>
        </div>
        <form @submit.prevent="login">
            <div class="sign-form__input">
                <label class="input">
                    <span>E-mail</span>
                    <app-input
            v-model="email"
            type="email"
            name="email"
            
            placeholder="example@mail.ru"
            :error-text="validations.email.error"
        />
                    <!-- <input type="email" name="email" placeholder="example@mail.ru"> -->
                </label>
            </div>

            <div class="sign-form__input">
                <label class="input">
                    <span>Пароль</span>
                    <app-input
            v-model="password"
            type="password"
            name="pass"
            
            placeholder="***********"
            :error-text="validations.password.error"
        />
                    <!-- <input type="password" name="pass" placeholder="***********"> -->
                </label>
            </div>
            <button type="submit"  class="button" @click="emit('update:logined',true)">Авторизоваться</button>
            <div v-if="serverErrorMessage" class="server-error-message">{{ serverErrorMessage }}</div>
        </form>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppInput from '@/common/components/AppInput.vue'
import { validateFields, clearValidationErrors } from '@/common/validator'
const router = useRouter()
import { useAuthStore } from '@/stores'
const authStore = useAuthStore()
const setEmptyValidations = () => ({
  email: {
    error: '',
    rules: ['required', 'email']
  },
  password: {
    error: '',
    rules: ['required']
  }
})
const props = defineProps({
    logined:{type:Boolean}
})
const email = ref('')
const password = ref('')
const validations = ref(setEmptyValidations())
const serverErrorMessage = ref(null)

watch(email, () => {
  // Очищаем поля ошибок при вводе новых данных
  if (serverErrorMessage.value ) serverErrorMessage.value = null
  if (validations.value.email.error) clearValidationErrors(validations.value)
})

watch(password, () => {
  // Очищаем поля ошибок при вводе новых данных
  if (serverErrorMessage.value ) serverErrorMessage.value = null
  if (validations.value.password.error) clearValidationErrors(validations.value)
})

async function login () {
  if (!validateFields(
      { email: email.value, password: password.value },
      validations.value
  )) {
    return
  }
  const responseMessage = await authStore.login(email.value, password.value)
  // Проверяем если возвращается статус не "ок", то показываем ошибку сервера
  if (responseMessage !== 'ok') {
    serverErrorMessage.value = responseMessage
  } else {
    // Получаем данные пользователя
    await authStore.getMe()
    // Если логин прошел без ошибок, перенаправляем на главную страницу
    await router.push('/')
  }
}
const emit = defineEmits(['logined'])

</script>

<style lang="scss" scoped>
@import "../assets/scss/mixins/m_center.scss";
@import "../assets/scss/ds-system/ds-colors.scss";
@import "../assets/scss/ds-system/ds-shadows.scss";


.sign-form {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;

  background: $white url("../assets/img/popup.svg") no-repeat center top;
  box-shadow: $shadow-light;

  button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}

.sign-form__title {
  margin-bottom: 24px;

  text-align: center;
}

.sign-form__input {
  margin-bottom: 16px;
}

</style>