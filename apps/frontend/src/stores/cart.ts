import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Cart, CartItem } from '@waystea/types';
import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Cart | null>(null);
  const loading = ref(false);

  const totalItems = computed(() => cart.value?.totalItems || 0);
  const totalPrice = computed(() => cart.value?.totalPrice || 0);
  const isEmpty = computed(() => !cart.value || cart.value.items.length === 0);

  async function fetchCart() {
    loading.value = true;
    try {
      const { data } = await api.get('/cart');
      cart.value = data.data;
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      loading.value = false;
    }
  }

  async function addToCart(productId: string, quantity: number) {
    loading.value = true;
    try {
      const { data } = await api.post('/cart/add', { productId, quantity });
      cart.value = data.data;
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      loading.value = false;
    }
  }

  async function updateItem(productId: string, quantity: number) {
    loading.value = true;
    try {
      const { data } = await api.put('/cart/item', { productId, quantity });
      cart.value = data.data;
    } catch (error) {
      console.error('Failed to update cart:', error);
    } finally {
      loading.value = false;
    }
  }

  async function removeItem(productId: string) {
    loading.value = true;
    try {
      const { data } = await api.delete(`/cart/item/${productId}`);
      cart.value = data.data;
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    } finally {
      loading.value = false;
    }
  }

  async function clearCart() {
    loading.value = true;
    try {
      const { data } = await api.delete('/cart/clear');
      cart.value = data.data;
    } catch (error) {
      console.error('Failed to clear cart:', error);
    } finally {
      loading.value = false;
    }
  }

  return { cart, loading, totalItems, totalPrice, isEmpty, fetchCart, addToCart, updateItem, removeItem, clearCart };
});
