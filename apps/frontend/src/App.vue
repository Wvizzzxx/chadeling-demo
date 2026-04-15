<template>
  <div class="app">
    <!-- Header -->
    <header class="header">
      <div class="container header-inner">
        <router-link to="/" class="logo">
          <span class="logo-icon">🍃</span>
          <span class="logo-text">WayTea</span>
        </router-link>
        <nav class="nav">
          <router-link to="/" class="nav-link" :class="{ active: $route.name === 'home' }">Главная</router-link>
          <router-link to="/catalog" class="nav-link" :class="{ active: $route.name === 'catalog' }">Каталог</router-link>
          <router-link to="/about" class="nav-link" :class="{ active: $route.name === 'about' }">О нас</router-link>
          <router-link to="/blog" class="nav-link" :class="{ active: $route.name === 'blog' }">Блог</router-link>
          <router-link to="/contact" class="nav-link" :class="{ active: $route.name === 'contact' }">Контакты</router-link>
        </nav>
        <div class="header-actions">
          <router-link to="/cart" class="cart-btn" :class="{ active: $route.name === 'cart' }">
            <span class="cart-icon">🛒</span>
            <span v-if="cartStore.totalItems > 0" class="cart-badge">{{ cartStore.totalItems }}</span>
          </router-link>
          <template v-if="authStore.isAuthenticated">
            <router-link to="/profile" class="profile-btn">
              <span class="profile-icon">👤</span>
              <span class="profile-name">{{ authStore.user?.name }}</span>
            </router-link>
            <button class="logout-btn" @click="handleLogout">Выйти</button>
          </template>
          <template v-else>
            <router-link to="/login" class="login-btn">Войти</router-link>
          </template>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <h3 class="footer-title">
              <span class="footer-logo-icon">🍃</span> WayTea
            </h3>
            <p class="footer-desc">Интернет-магазин премиального чая с доставкой по всей России. Более 150 сортов из лучших плантаций мира.</p>
            <div class="footer-social">
              <a href="#" class="social-link" title="Telegram">📱</a>
              <a href="#" class="social-link" title="VK">💬</a>
              <a href="#" class="social-link" title="Instagram">📷</a>
              <a href="#" class="social-link" title="YouTube">▶️</a>
            </div>
          </div>
          <div class="footer-col">
            <h4 class="footer-heading">Каталог</h4>
            <ul class="footer-links">
              <li><router-link to="/catalog">Все товары</router-link></li>
              <li><a href="#">Чёрный чай</a></li>
              <li><a href="#">Зелёный чай</a></li>
              <li><a href="#">Белый чай</a></li>
              <li><a href="#">Улун</a></li>
              <li><a href="#">Пуэр</a></li>
              <li><a href="#">Травяной чай</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 class="footer-heading">Информация</h4>
            <ul class="footer-links">
              <li><router-link to="/about">О компании</router-link></li>
              <li><router-link to="/delivery">Доставка и оплата</router-link></li>
              <li><router-link to="/faq">Частые вопросы</router-link></li>
              <li><router-link to="/blog">Блог</router-link></li>
              <li><router-link to="/contact">Контакты</router-link></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 class="footer-heading">Контакты</h4>
            <ul class="footer-contacts">
              <li>📞 <a href="tel:+78001234567">8 (800) 123-45-67</a></li>
              <li>✉️ <a href="mailto:info@waystea.ru">info@waystea.ru</a></li>
              <li>📍 г. Москва, ул. Чайная, д. 15</li>
              <li>🕐 Пн-Пт: 10:00 - 19:00</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; {{ new Date().getFullYear() }} WayTea — Интернет-магазин чая. Все права защищены.</p>
          <div class="footer-bottom-links">
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Пользовательское соглашение</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';
import { useCartStore } from './stores/cart';

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

async function handleLogout() {
  authStore.logout();
  await router.push('/');
}

onMounted(async () => {
  if (authStore.isAuthenticated) {
    await authStore.fetchProfile();
    await cartStore.fetchCart();
  }
});
</script>

<style scoped>
/* Header */
.header {
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  gap: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d5016;
}

.logo-icon {
  font-size: 2rem;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #2d5016;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #2d5016;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cart-btn {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: all 0.3s ease;
}

.cart-btn:hover {
  background: #e8f5e9;
}

.cart-icon {
  font-size: 1.25rem;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #e74c3c;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.profile-btn:hover {
  background: #e8f5e9;
}

.profile-icon {
  font-size: 1.25rem;
}

.profile-name {
  font-weight: 500;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background: #fee;
  color: #e74c3c;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: #fdd;
}

.login-btn {
  padding: 0.5rem 1.5rem;
  background: #2d5016;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background: #4a7c24;
}

/* Footer */
.footer {
  background: #1a1a2e;
  color: #ccc;
  padding: 4rem 0 2rem;
  margin-top: 4rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-title {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-logo-icon {
  font-size: 1.75rem;
}

.footer-desc {
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.footer-social {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  text-decoration: none;
  font-size: 1.25rem;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #2d5016;
  transform: translateY(-3px);
}

.footer-heading {
  color: white;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: #aaa;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #4a7c24;
}

.footer-contacts {
  list-style: none;
  padding: 0;
}

.footer-contacts li {
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-contacts a {
  color: #aaa;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-contacts a:hover {
  color: #4a7c24;
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-bottom-links {
  display: flex;
  gap: 1.5rem;
}

.footer-bottom-links a {
  color: #888;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-bottom-links a:hover {
  color: #4a7c24;
}

/* Page Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .header-inner {
    flex-wrap: wrap;
  }
  .nav {
    order: 3;
    width: 100%;
    justify-content: center;
    padding-top: 1rem;
    border-top: 1px solid #f0f0f0;
    margin-top: 1rem;
  }
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>