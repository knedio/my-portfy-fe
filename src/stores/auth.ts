import { User } from '@/models/user.model';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(!!localStorage.getItem('token'));

  const storedUser = localStorage.getItem('user');
  const user = ref<User | null>(storedUser ? JSON.parse(storedUser) : null);

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    user.value = userData;
    isAuthenticated.value = true;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    user.value = null;
    isAuthenticated.value = false;
  };

  const setUser = (userData: User) => {
    user.value = userData;
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return {
    isAuthenticated,
    user,
    setUser,
    login,
    logout,
  };
});
