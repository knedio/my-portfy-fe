import { AuthUser } from '@/models/auth.model'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(!!localStorage.getItem('token'))

  const login = (token: string, user: AuthUser) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    isAuthenticated.value = true
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    isAuthenticated.value = false
  }

  return {
    isAuthenticated,
    login,
    logout,
  }
})
