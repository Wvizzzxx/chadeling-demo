<template>
  <div class="admin-products">
    <div class="flex-between">
      <h1 class="page-title">Товары</h1>
      <button class="btn btn-primary" @click="showForm = true">+ Добавить товар</button>
    </div>

    <!-- Add/Edit Form -->
    <div v-if="showForm" class="card form-card">
      <h2>{{ editingId ? 'Редактировать' : 'Новый товар' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Название</label>
            <input v-model="form.name" type="text" class="form-input" required />
          </div>
          <div class="form-group">
            <label class="form-label">Категория</label>
            <select v-model="form.category" class="form-input" required>
              <option value="black">Чёрный чай</option>
              <option value="green">Зелёный чай</option>
              <option value="white">Белый чай</option>
              <option value="oolong">Улун</option>
              <option value="herbal">Травяной</option>
              <option value="puerh">Пуэр</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Цена (₽)</label>
            <input v-model.number="form.price" type="number" class="form-input" min="0" step="0.01" required />
          </div>
          <div class="form-group">
            <label class="form-label">Вес (г)</label>
            <input v-model.number="form.weight" type="number" class="form-input" min="0" required />
          </div>
          <div class="form-group">
            <label class="form-label">URL изображения</label>
            <input v-model="form.image" type="url" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-group-label">В наличии</label>
            <input v-model="form.inStock" type="checkbox" class="checkbox" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Описание</label>
          <textarea v-model="form.description" class="form-input" rows="4" required></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Сохранение...' : 'Сохранить' }}
          </button>
          <button type="button" class="btn btn-outline" @click="resetForm">Отмена</button>
        </div>
      </form>
    </div>

    <!-- Products Table -->
    <div class="card table-card">
      <table v-if="products.length > 0" class="admin-table">
        <thead>
          <tr>
            <th></th>
            <th>Название</th>
            <th>Категория</th>
            <th>Цена</th>
            <th>Вес</th>
            <th>Наличие</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product._id">
            <td>
              <img :src="product.image || '/placeholder.jpg'" class="table-thumb" />
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ formatPrice(product.price) }}</td>
            <td>{{ product.weight }}г</td>
            <td>
              <span :class="product.inStock ? 'badge-success' : 'badge-error'">
                {{ product.inStock ? 'Да' : 'Нет' }}
              </span>
            </td>
            <td class="table-actions">
              <button class="btn btn-sm btn-outline" @click="editProduct(product)">✏️</button>
              <button class="btn btn-sm btn-outline" @click="deleteProduct(product._id)" style="color: #e74c3c;">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="empty-table">Нет товаров</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Product, ProductInput } from '@waystea/types';
import axios from 'axios';

const products = ref<Product[]>([]);
const showForm = ref(false);
const editingId = ref<string | null>(null);
const loading = ref(false);

const form = ref<ProductInput>({
  name: '',
  description: '',
  price: 0,
  image: '',
  category: 'black',
  weight: 0,
  inStock: true,
});

function formatPrice(price: number): string {
  return `${price.toFixed(2)} ₽`;
}

async function fetchProducts() {
  const { data } = await axios.get('/api/admin/products?page=1&limit=100');
  products.value = data.data.products || data.data;
}

function editProduct(product: Product) {
  editingId.value = product._id;
  form.value = {
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    category: product.category,
    weight: product.weight,
    inStock: product.inStock,
  };
  showForm.value = true;
}

async function handleSubmit() {
  loading.value = true;
  try {
    if (editingId.value) {
      await axios.put(`/api/admin/products/${editingId.value}`, form.value);
    } else {
      await axios.post('/api/admin/products', form.value);
    }
    resetForm();
    await fetchProducts();
  } catch (error) {
    console.error('Failed to save product:', error);
  } finally {
    loading.value = false;
  }
}

function resetForm() {
  showForm.value = false;
  editingId.value = null;
  form.value = { name: '', description: '', price: 0, image: '', category: 'black', weight: 0, inStock: true };
}

async function deleteProduct(id: string) {
  if (confirm('Удалить товар?')) {
    await axios.delete(`/api/admin/products/${id}`);
    await fetchProducts();
  }
}

onMounted(fetchProducts);
</script>

<style scoped>
.page-title { margin-bottom: var(--space-lg); }
.form-card { padding: var(--space-lg); margin-bottom: var(--space-lg); }
.form-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-md); }
.form-actions { display: flex; gap: var(--space-sm); margin-top: var(--space-md); }
.table-card { padding: var(--space-lg); }
.admin-table { width: 100%; border-collapse: collapse; }
.admin-table th, .admin-table td { padding: var(--space-sm); text-align: left; border-bottom: 1px solid var(--color-border); }
.admin-table th { font-weight: 600; color: var(--color-text-light); font-size: 0.85rem; }
.table-thumb { width: 40px; height: 40px; border-radius: var(--radius-sm); object-fit: cover; }
.table-actions { display: flex; gap: var(--space-xs); }
.badge-success { color: var(--color-success); }
.badge-error { color: var(--color-error); }
.empty-table { text-align: center; padding: var(--space-xl); color: var(--color-text-light); }
</style>