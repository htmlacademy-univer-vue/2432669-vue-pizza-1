const AUTH_KEY = 'vue-work-auth-key'

export function getToken() {
  return window.localStorage.getItem(AUTH_KEY)
}

export function setToken(token) {
  return window.localStorage.setItem(AUTH_KEY, token)
}

export function removeToken() {
  return window.localStorage.removeItem(AUTH_KEY)
}