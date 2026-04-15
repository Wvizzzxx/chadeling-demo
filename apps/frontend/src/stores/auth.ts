import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { User, AuthResponse } from '@waystea/types';
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('token'));

  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === 'admin');

  // Set auth header
  api.interceptors.request.use((config) => {
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  async function register(email: string, name: string, password: string) {
    const { data } = await api.post<{ success: boolean; data: AuthResponse }>('/auth/register', { email, name, password });
    token.value = data.data.token;
    user.value = data.data.user;
    localStorage.setItem('token', data.data.token);
    return data.data;
  }

  async function login(email: string, password: string) {
    const { data } = await api.post<{ success: boolean; data: AuthResponse }>('/auth/login', { email, password });
    token.value = data.data.token;
    user.value = data.data.user;
    localStorage.setItem('token', data.data.token);
    return data.data;
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
    localStorage.removeItem('token');
  }

  return { user, token, isAuthenticated, isAdmin, register, login, fetchProfile, logout };
});