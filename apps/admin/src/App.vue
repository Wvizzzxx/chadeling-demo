<template>
  <div class="admin-app">
    <template v-if="authStore.isAuthenticated">
      <aside class="admin-sidebar">
        <div class="sidebar-logo">
          <span class="logo-icon">🍃</span>
          <span class="logo-text">WayTea Admin</span>
        </div>
        <nav class="sidebar-nav">
          <router-link to="/" class="nav-item" :class="{ active: $route.name === 'dashboard' }">
            <span class="nav-icon">📊</span>
            <span>Дашборд</span>
          </router-link>
          <router-link to="/products" class="nav-item" :class="{ active: $route.name === 'products' }">
            <span class="nav-icon">📦</span>
            <span>Товары</span>
          </router-link>
          <router-link to="/orders" class="nav-item" :class="{ active: $route.name === 'orders' }">
            <span class="nav-icon">🛒</span>
            <span>Заказы</span>
          </router-link>
          <router-link to="/users" class="nav-item" :class="{ active: $route.name === 'users' }">
            <span class="nav-icon">👥</span>
            <span>Пользователи</span>
          </router-link>
        </nav>
        <div class="sidebar-footer">
          <button class="logout-btn" @click="handleLogout">
            <span class="nav-icon">🚪</span>
            <span>Выйти</span>
          </button>
        </div>
      </aside>
      <main class="admin-content">
        <header class="content-header">
          <h1 class="page-title">{{ pageTitle }}</h1>
          <div class="header-user">
            <span class="user-name">{{ authStore.user?.name }}</span>
            <span class="user-avatar">👤</span>
          </div>
        </header>
        <div class="content-body">
          <router-view />
        </div>
      </main>
    </template>
    <router-view v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from './stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

watch(() => authStore.isAuthenticated, async (val) => {
  if (val && route.name !== 'login') {
    await authStore.fetchProfile();
  }
});

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    dashboard: 'Дашборд',
    products: 'Управление товарами',
    orders: 'Управление заказами',
    users: 'Управление пользователями',
  };
  return titles[route.name as string] || 'Админ-панель';
});

async function handleLogout() {
  authStore.logout();
  router.push('/login');
}

onMounted(async () => {
  if (authStore.isAuthenticated && route.name !== 'login') {
    await authStore.fetchProfile();
  }
});
</script>

<style scoped>
.admin-app {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
}

.admin-sidebar {
  width: 260px;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-logo {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-icon {
  font-size: 2rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.nav-item.active {
  background: rgba(45, 80, 22, 0.3);
  color: #4a7c24;
  border-left-color: #4a7c24;
}

.nav-icon {
  font-size: 1.25rem;
}

.sidebar-footer {
  padding: 1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.875rem 1.5rem;
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.logout-btn:hover {
  background: rgba(231, 76, 60, 0.2);
}

.admin-content {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-header {
  background: white;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.page-title {
  font-size: 1.5rem;
  color: #333;
  margin: 0;
}

.header-user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 12px;
}

.user-name {
  font-weight: 500;
  color: #555;
}

.user-avatar {
  font-size: 1.5rem;
}

.content-body {
  flex: 1;
  padding: 2rem;
}

@media (max-width: 768px) {
  .admin-sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  
  .admin-content {
    margin-left: 0;
  }
  
  .sidebar-nav {
    display: flex;
    overflow-x: auto;
    padding: 0.5rem;
  }
  
  .nav-item {
    flex-direction: column;
    padding: 0.75rem 1rem;
    font-size: 0.8rem;
    border-left: none;
    border-bottom: 3px solid transparent;
  }
  
  .nav-item.active {
    border-bottom-color: #4a7c24;
  }
}
</style>