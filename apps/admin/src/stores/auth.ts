import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { User, AuthResponse } from '@waystea/types';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001/api' });

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('admin_token'));

  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === 'admin');

  api.interceptors.request.use((config) => {
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  });

  async function login(email: string, password: string) {
    const { data } = await api.post<{ success: boolean; data: AuthResponse }>('/auth/login', { email, password });
    if (data.data.user.role !== 'admin') {
      throw new Error('Нет доступа к админ-панели');
    }
    token.value = data.data.token;
    user.value = data.data.user;
    localStorage.setItem('admin_token', data.data.token);
  }

  async function fetchProfile() {
    try {
      const { data } = await api.get<{ success: boolean; data: User }>('/auth/profile');
      user.value = data.data;
    } catch {
      logout();
    }
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('admin_token');
  }

  return { user, token, isAuthenticated, isAdmin, login, fetchProfile, logout };
});