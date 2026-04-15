<template>
  <div class="dashboard">
    <h1 class="page-title">Дашборд</h1>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
    </div>

    <div v-else class="stats-grid">
      <div class="stat-card card">
        <div class="stat-icon">👥</div>
        <div class="stat-info">
          <h3>Пользователи</h3>
          <p class="stat-value">{{ stats.totalUsers }}</p>
        </div>
      </div>

      <div class="stat-card card">
        <div class="stat-icon">📦</div>
        <div class="stat-info">
          <h3>Товары</h3>
          <p class="stat-value">{{ stats.totalProducts }}</p>
        </div>
      </div>

      <div class="stat-card card">
        <div class="stat-icon">🛒</div>
        <div class="stat-info">
          <h3>Заказы</h3>
          <p class="stat-value">{{ stats.totalOrders }}</p>
        </div>
      </div>

      <div class="stat-card card">
        <div class="stat-icon">💰</div>
        <div class="stat-info">
          <h3>Выручка</h3>
          <p class="stat-value">{{ formatPrice(stats.totalRevenue) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const stats = ref({ totalUsers: 0, totalProducts: 0, totalOrders: 0, totalRevenue: 0 });
const loading = ref(true);

const api = axios.create({ baseURL: 'http://localhost:3001/api' });

api.interceptors.request.use((config) => {
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});

function formatPrice(price: number): string {
  return `${price.toFixed(2)} ₽`;
}

onMounted(async () => {
  try {
    const { data } = await api.get('/admin/stats');
    stats.value = data.data;
  } catch (error) {
    console.error('Failed to fetch stats:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.page-title {
  margin-bottom: var(--space-xl);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat-card {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-info h3 {
  font-size: 0.9rem;
  color: var(--color-text-light);
  font-weight: 400;
  margin-bottom: var(--space-xs);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>