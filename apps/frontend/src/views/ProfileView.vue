В<template>
  <div class="profile-page">
    <div class="container">
      <h1 class="page-title">Личный кабинет</h1>

      <div v-if="!authStore.isAuthenticated" class="loading">
        <div class="spinner"></div>
      </div>

      <div v-else class="profile-grid">
        <!-- User Info -->
        <div class="card profile-section">
          <h2>Профиль</h2>
          <div class="user-info">
            <div class="avatar-section">
              <img v-if="authStore.user?.avatar" :src="authStore.user.avatar" alt="Аватар" class="avatar" />
              <div v-else class="avatar-placeholder">👤</div>
              <label class="upload-btn">
                <input type="file" accept="image/*" @change="handleAvatarUpload" hidden />
                📷 Загрузить фото
              </label>
            </div>
            <div class="info-row">
              <span class="info-label">Имя:</span>
              <span>{{ authStore.user?.name }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span>
              <span>{{ authStore.user?.email }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Роль:</span>
              <span class="role-badge" :class="authStore.isAdmin ? 'role-admin' : 'role-customer'">
                {{ authStore.isAdmin ? 'Администратор' : 'Покупатель' }}
              </span>
            </div>
          </div>
          <router-link v-if="authStore.isAdmin" to="/admin" class="btn btn-secondary">
            Перейти в админ-панель
          </router-link>
        </div>

        <!-- Orders -->
        <div class="card orders-section">
          <h2>Мои заказы</h2>

          <div v-if="loading" class="orders-loading">
            <div class="spinner"></div>
          </div>

          <div v-else-if="orders.length === 0" class="empty-orders">
            <p>У вас пока нет заказов</p>
            <router-link to="/catalog" class="btn btn-outline">Перейти в каталог</router-link>
          </div>

          <div v-else class="orders-list">
            <div v-for="order in orders" :key="order._id" class="order-card">
              <div class="order-header">
                <span class="order-id">Заказ #{{ order._id.slice(-6) }}</span>
                <span class="order-status" :class="`status-${order.status}`">
                  {{ statusLabels[order.status] }}
                </span>
              </div>
              <div class="order-date">{{ formatDate(order.createdAt) }}</div>
              <div class="order-items">
                <span v-for="item in order.items" :key="item.product" class="order-item-chip">
                  {{ item.name }} × {{ item.quantity }}
                </span>
              </div>
              <div class="order-total">{{ formatPrice(order.totalPrice) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Order } from '@waystea/types';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';

const authStore = useAuthStore();
const orders = ref<Order[]>([]);
const loading = ref(true);
const uploadError = ref('');

const statusLabels: Record<string, string> = {
  pending: 'Ожидает',
  processing: 'В обработке',
  shipped: 'Отправлен',
  delivered: 'Доставлен',
  cancelled: 'Отменён',
};

function formatPrice(price: number): string {
  return `${price.toFixed(2)} ₽`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

async function fetchOrders() {
  loading.value = true;
  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.get('/api/orders', {
      headers: { Authorization: `Bearer ${token}` }
    });
    orders.value = data.data.orders;
  } catch (error) {
    console.error('Failed to fetch orders:', error);
  } finally {
    loading.value = false;
  }
}

async function handleAvatarUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('avatar', file);

  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.post('/api/auth/avatar', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    authStore.user = data.data;
  } catch (error: any) {
    uploadError.value = error.response?.data?.error || 'Ошибка загрузки фото';
    console.error('Failed to upload avatar:', error);
  }
}

onMounted(async () => {
  await authStore.fetchProfile();
  await fetchOrders();
});
</script>

<style scoped>
.page-title {
  font-family: var(--font-serif);
  font-size: 2rem;
  margin: var(--space-xl) 0;
}

.profile-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--space-xl);
  align-items: start;
}

@media (max-width: 900px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }
}

.profile-section,
.orders-section {
  padding: var(--space-lg);
}

.profile-section h2,
.orders-section h2 {
  margin-bottom: var(--space-md);
}

.avatar-section {
  text-align: center;
  margin-bottom: var(--space-lg);
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: var(--space-sm);
}

.avatar-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin: 0 auto var(--space-sm);
}

.upload-btn {
  display: inline-block;
  padding: 8px 16px;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.upload-btn:hover {
  opacity: 0.9;
}

.user-info {
  margin-bottom: var(--space-lg);
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: var(--space-sm) 0;
  border-bottom: 1px solid var(--color-border);
}

.info-label {
  color: var(--color-text-light);
}

.role-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 500;
}

.role-admin {
  background-color: var(--color-secondary);
  color: white;
}

.role-customer {
  background-color: var(--color-primary);
  color: white;
}

.empty-orders {
  text-align: center;
  padding: var(--space-xl);
  color: var(--color-text-light);
}

.empty-orders p {
  margin-bottom: var(--space-md);
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.order-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xs);
}

.order-id {
  font-weight: 600;
}

.order-status {
  font-size: 0.85rem;
  padding: 2px 10px;
  border-radius: var(--radius-full);
}

.status-pending {
  background-color: #fff3cd;
  color: #856404;
}

.status-processing {
  background-color: #cce5ff;
  color: #004085;
}

.status-shipped {
  background-color: #d4edda;
  color: #155724;
}

.status-delivered {
  background-color: #d1ecf1;
  color: #0c5460;
}

.status-cancelled {
  background-color: #f8d7da;
  color: #721c24;
}

.order-date {
  color: var(--color-text-light);
  font-size: 0.85rem;
  margin-bottom: var(--space-sm);
}

.order-items {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-bottom: var(--space-sm);
}

.order-item-chip {
  background-color: var(--color-background);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
}

.order-total {
  font-weight: 700;
  color: var(--color-primary);
  text-align: right;
}
</style>