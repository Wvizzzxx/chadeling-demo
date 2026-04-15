<template>
  <div class="admin-users">
    <h1 class="page-title">Пользователи</h1>

    <div v-if="loading" class="loading"><div class="spinner"></div></div>

    <div v-else class="card table-card">
      <table v-if="users.length > 0" class="admin-table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Email</th>
            <th>Дата регистрации</th>
            <th>Роль</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ formatDate(user.createdAt) }}</td>
            <td>
              <span :class="user.role === 'admin' ? 'badge-admin' : 'badge-customer'">
                {{ user.role === 'admin' ? 'Администратор' : 'Покупатель' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="empty-table">Нет пользователей</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { User } from '@waystea/types';
import axios from 'axios';

const users = ref<User[]>([]);
const loading = ref(true);

function formatDate(dateStr: string): string { return new Date(dateStr).toLocaleDateString('ru-RU'); }

async function fetchUsers() {
  const { data } = await axios.get('/api/admin/users');
  users.value = data.data;
  loading.value = false;
}

onMounted(fetchUsers);
</script>

<style scoped>
.page-title { margin-bottom: var(--space-lg); }
.table-card { padding: var(--space-lg); }
.admin-table { width: 100%; border-collapse: collapse; }
.admin-table th, .admin-table td { padding: var(--space-sm); text-align: left; border-bottom: 1px solid var(--color-border); }
.admin-table th { font-weight: 600; color: var(--color-text-light); font-size: 0.85rem; }
.badge-admin { background: #e0f7fa; color: #006064; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem; }
.badge-customer { background: #f0f0f0; color: #666; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem; }
.empty-table { text-align: center; padding: var(--space-xl); color: var(--color-text-light); }
</style>