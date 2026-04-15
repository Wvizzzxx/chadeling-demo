<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-form-wrapper">
        <h1 class="auth-title">Вход</h1>
        <form class="auth-form" @submit.prevent="handleLogin">
          <div v-if="error" class="alert alert-error">{{ error }}</div>

          <div class="form-group">
            <label class="form-label">Email</label>
            <input v-model="email" type="email" class="form-input" placeholder="mail@example.com" required />
          </div>

          <div class="form-group">
            <label class="form-label">Пароль</label>
            <input v-model="password" type="password" class="form-input" placeholder="Введите пароль" required />
          </div>

          <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
            <span v-if="loading">Вход...</span>
            <span v-else>Войти</span>
          </button>
        </form>

        <p class="auth-link">
          Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

async function handleLogin() {
  error.value = '';
  loading.value = true;
  try {
    await authStore.login(email.value, password.value);
    await router.push('/profile');
  } catch (err: any) {
    error.value = err.response?.data?.error || 'Ошибка входа';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  padding: var(--space-xl) 0;
}

.auth-form-wrapper {
  max-width: 420px;
  margin: 0 auto;
  width: 100%;
}

.auth-title {
  font-family: var(--font-serif);
  font-size: 2rem;
  text-align: center;
  margin-bottom: var(--space-xl);
}

.auth-form {
  background: var(--color-surface);
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.btn-block {
  display: block;
  width: 100%;
}

.auth-link {
  text-align: center;
  margin-top: var(--space-md);
  color: var(--color-text-light);
}

.auth-link a {
  color: var(--color-primary);
  font-weight: 500;
}

.auth-link a:hover {
  text-decoration: underline;
}
</style>