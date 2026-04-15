import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Product, ProductListResponse } from '@waystea/types';
import axios from 'axios';

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([]);
  const product = ref<Product | null>(null);
  const loading = ref(false);
  const total = ref(0);
  const currentPage = ref(1);

  async function fetchProducts(params: { page?: number; limit?: number; category?: string; search?: string } = {}) {
    loading.value = true;
    try {
      const { data } = await axios.get<{ data: ProductListResponse }>('/api/products', { params });
      products.value = data.data.products;
      total.value = data.data.total;
      currentPage.value = data.data.page;
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      loading.value = false;
    }
  }

  async function fetchProduct(id: string) {
    loading.value = true;
    try {
      const { data } = await axios.get<{ data: Product }>(`/api/products/${id}`);
      product.value = data.data;
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      loading.value = false;
    }
  }

  function clearProduct() {
    product.value = null;
  }

  return { products, product, loading, total, currentPage, fetchProducts, fetchProduct, clearProduct };
});