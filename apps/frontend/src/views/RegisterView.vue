<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-form-wrapper">
        <h1 class="auth-title">Регистрация</h1>
        <form class="auth-form" @submit.prevent="handleRegister">
          <div v-if="error" class="alert alert-error">{{ error }}</div>

          <div class="form-group">
            <label class="form-label">Имя</label>
            <input v-model="name" type="text" class="form-input" placeholder="Ваше имя" required />
          </div>

          <div class="form-group">
            <label class="form-label">Email</label>
            <input v-model="email" type="email" class="form-input" placeholder="mail@example.com" required />
          </div>

          <div class="form-group">
            <label class="form-label">Пароль</label>
            <input v-model="password" type="password" class="form-input" placeholder="Минимум 6 символов" required minlength="6" />
          </div>

          <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
            <span v-if="loading">Регистрация...</span>
            <span v-else>Зарегистрироваться</span>
          </button>
        </form>

        <p class="auth-link">
          Уже есть аккаунт? <router-link to="/login">Войти</router-link>
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

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

async function handleRegister() {
  error.value = '';
  loading.value = true;
  try {
    await authStore.register(email.value, name.value, password.value);
    await router.push('/profile');
  } catch (err: any) {
    error.value = err.response?.data?.error || 'Ошибка регистрации';
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