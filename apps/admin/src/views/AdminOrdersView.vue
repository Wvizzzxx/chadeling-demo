<template>
  <div class="admin-orders">
    <h1 class="page-title">Заказы</h1>

    <div v-if="loading" class="loading"><div class="spinner"></div></div>

    <div v-else class="card table-card">
      <table v-if="orders.length > 0" class="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Покупатель</th>
            <th>Дата</th>
            <th>Сумма</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order._id">
            <td>#{{ order._id.slice(-6) }}</td>
            <td>{{ order.user?.name || 'N/A' }}<br><small class="text-muted">{{ order.user?.email }}</small></td>
            <td>{{ formatDate(order.createdAt) }}</td>
            <td>{{ formatPrice(order.totalPrice) }}</td>
            <td>
              <select v-model="order.status" @change="updateStatus(order)" class="status-select" :class="`status-${order.status}`">
                <option value="pending">Ожидает</option>
                <option value="processing">В обработке</option>
                <option value="shipped">Отправлен</option>
                <option value="delivered">Доставлен</option>
                <option value="cancelled">Отменён</option>
              </select>
            </td>
            <td>
              <button class="btn btn-sm btn-outline" @click="viewOrder(order)">👁️</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="empty-table">Нет заказов</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Order } from '@waystea/types';
import axios from 'axios';

const orders = ref<(Order & { user?: { name: string; email: string } })[]>([]);
const loading = ref(true);

function formatPrice(price: number): string { return `${price.toFixed(2)} ₽`; }
function formatDate(dateStr: string): string { return new Date(dateStr).toLocaleDateString('ru-RU'); }

async function fetchOrders() {
  const { data } = await axios.get('/api/admin/orders?page=1&limit=50');
  orders.value = data.data.orders;
  loading.value = false;
}

async function updateStatus(order: typeof orders.value[0]) {
  await axios.put(`/api/admin/orders/${order._id}/status`, { status: order.status });
}

function viewOrder(_order: typeof orders.value[0]) {
  // TODO: Implement order detail modal
}

onMounted(fetchOrders);
</script>

<style scoped>
.page-title { margin-bottom: var(--space-lg); }
.table-card { padding: var(--space-lg); }
.admin-table { width: 100%; border-collapse: collapse; }
.admin-table th, .admin-table td { padding: var(--space-sm); text-align: left; border-bottom: 1px solid var(--color-border); }
.admin-table th { font-weight: 600; color: var(--color-text-light); font-size: 0.85rem; }
.status-select { padding: var(--space-xs) var(--space-sm); border-radius: var(--radius-sm); border: 1px solid var(--color-border); font-size: 0.85rem; }
.status-pending { border-color: #ffc107; background: #fff8e1; }
.status-processing { border-color: #2196f3; background: #e3f2fd; }
.status-shipped { border-color: #4caf50; background: #e8f5e9; }
.status-delivered { border-color: #00bcd4; background: #e0f7fa; }
.status-cancelled { border-color: #f44336; background: #ffebee; }
.empty-table { text-align: center; padding: var(--space-xl); color: var(--color-text-light); }
.text-muted { color: var(--color-text-light); font-size: 0.8rem; }
</style>