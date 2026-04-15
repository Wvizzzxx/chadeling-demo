<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="container hero-content fade-in">
        <h1 class="hero-title">WayTea — Чай для истинных ценителей</h1>
        <p class="hero-subtitle">Откройте для себя коллекцию редких сортов чая из лучших плантаций мира</p>
        <div class="hero-buttons">
          <router-link to="/catalog" class="btn btn-primary btn-lg">Каталог чая</router-link>
          <router-link to="/about" class="btn btn-outline-light btn-lg">О нас</router-link>
        </div>
      </div>
      <div class="hero-decoration">
        <div class="leaf leaf-1"></div>
        <div class="leaf leaf-2"></div>
        <div class="leaf leaf-3"></div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="section-title fade-in-up">Почему выбирают нас</h2>
        <div class="grid grid-4">
          <div class="feature-item fade-in-up delay-1">
            <div class="feature-icon">🍃</div>
            <h3>Натуральный чай</h3>
            <p>Мы предлагаем только натуральный чай без добавок и красителей из проверенных источников.</p>
          </div>
          <div class="feature-item fade-in-up delay-2">
            <div class="feature-icon">🌍</div>
            <h3>Со всего мира</h3>
            <p>Коллекция чая из лучших плантаций Китая, Индии, Шри-Ланки, Кении и других стран.</p>
          </div>
          <div class="feature-item fade-in-up delay-3">
            <div class="feature-icon">🚚</div>
            <h3>Быстрая доставка</h3>
            <p>Доставка по всей России. Бесплатная доставка при заказе от 3000 ₽.</p>
          </div>
          <div class="feature-item fade-in-up delay-4">
            <div class="feature-icon">💎</div>
            <h3>Высокое качество</h3>
            <p>Каждая партия проходит контроль качества для обеспечения идеального вкуса.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured">
      <div class="container">
        <h2 class="section-title slide-in-left">Популярные товары</h2>
        <div v-if="productsStore.loading" class="loading">
          <div class="spinner"></div>
        </div>
        <div v-else-if="productsStore.products.length > 0" class="grid grid-4">
          <div v-for="product in productsStore.products.slice(0, 8)" :key="product._id" class="card product-card hover-lift">
            <router-link to="/product/:id" class="product-image">
              <img :src="product.image || '/placeholder.jpg'" :alt="product.name" />
              <div class="product-badge" v-if="product.inStock">В наличии</div>
            </router-link>
            <div class="product-info">
              <router-link to="/product/:id" class="product-name">{{ product.name }}</router-link>
              <p class="product-category">{{ getCategoryName(product.category) }}</p>
              <div class="flex-between">
                <span class="product-price">{{ formatPrice(product.price) }}</span>
                <button class="btn btn-primary btn-sm" @click="addToCart(product._id)" :disabled="!product.inStock || cartStore.loading">
                  В корзину
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="empty-message">Загрузка товаров...</div>
        <div class="text-center" style="margin-top: 2rem;">
          <router-link to="/catalog" class="btn btn-outline-primary btn-lg">Все товары →</router-link>
        </div>
      </div>
    </section>

    <!-- About Tea Section -->
    <section class="about-tea">
      <div class="container">
        <div class="about-grid">
          <div class="about-text fade-in-up">
            <h2>Искусство чаепития</h2>
            <p>Чай — это не просто напиток. Это тысячелетняя традиция, искусство и философия. В WayTea мы верим, что каждый глоток чая может рассказать историю.</p>
            <p>Наша команда тщательно отбирает лучшие сорта со всего мира, чтобы вы могли наслаждаться неповторимым вкусом настоящего чая.</p>
            <ul class="about-list">
              <li>✨ Более 100 сортов чая</li>
              <li>🌱 Прямые поставки с плантаций</li>
              <li>🏆 Гарантия свежести</li>
              <li>🎁 Подарочные наборы</li>
            </ul>
            <router-link to="/about" class="btn btn-outline-primary">Узнать больше</router-link>
          </div>
          <div class="about-visual zoom-in">
            <div class="tea-circle">
              <span>🍵</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials">
      <div class="container">
        <h2 class="section-title">Отзывы наших клиентов</h2>
        <div class="grid grid-3">
          <div class="testimonial-card fade-in-up delay-1">
            <div class="testimonial-stars">★★★★★</div>
            <p class="testimonial-text">"Лучший магазин чая! Огромный выбор и отличное качество. Доставка всегда вовремя."</p>
            <div class="testimonial-author">
              <strong>Анна К.</strong>
              <span>Москва</span>
            </div>
          </div>
          <div class="testimonial-card fade-in-up delay-2">
            <div class="testimonial-stars">★★★★★</div>
            <p class="testimonial-text">"Покупаю здесь чай для подарков. Упаковка красивая, вкус потрясающий. Рекомендую!"</p>
            <div class="testimonial-author">
              <strong>Дмитрий В.</strong>
              <span>Санкт-Петербург</span>
            </div>
          </div>
          <div class="testimonial-card fade-in-up delay-3">
            <div class="testimonial-stars">★★★★★</div>
            <p class="testimonial-text">"Нашла здесь редкие сорта чая, которые долго искала. Консультанты помогли выбрать идеальный чай."</p>
            <div class="testimonial-author">
              <strong>Елена М.</strong>
              <span>Казань</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter">
      <div class="container">
        <div class="newsletter-content zoom-in">
          <h2>Подпишитесь на новинки</h2>
          <p>Получайте уведомления о новых сортах и специальных предложениях</p>
          <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
            <input type="email" placeholder="Ваш email адрес" required />
            <button type="submit" class="btn btn-primary btn-lg">Подписаться</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductsStore } from '../stores/products';
import { useCartStore } from '../stores/cart';

const productsStore = useProductsStore();
const cartStore = useCartStore();

function formatPrice(price: number): string {
  return `${price.toFixed(2)} ₽`;
}

function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    black: 'Чёрный чай',
    green: 'Зелёный чай',
    white: 'Белый чай',
    oolong: 'Улун',
    herbal: 'Травяной',
    puerh: 'Пуэр'
  };
  return names[category] || category;
}

async function addToCart(productId: string) {
  await cartStore.addToCart(productId, 1);
}

function subscribeNewsletter() {
  alert('Спасибо за подписку!');
}

onMounted(async () => {
  await productsStore.fetchProducts({ limit: 8 });
});
</script>

<style scoped>
/* Hero Section */
.hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2d5016, #4a7c24, #2d5016);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.4rem;
  opacity: 0.95;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Leaf Animation */
.hero-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.leaf {
  position: absolute;
  width: 40px;
  height: 40px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff30'%3E%3Cpath d='M17,8C8,10 5.9,16.1 3.8,21.3 L5.7,22.1 C7.8,16.9 9.9,10.9 17,8Z'/%3E%3C/svg%3E") no-repeat center;
  background-size: contain;
  animation: float 6s ease-in-out infinite;
}

.leaf-1 { left: 10%; top: 20%; animation-delay: 0s; }
.leaf-2 { right: 10%; top: 40%; animation-delay: 2s; }
.leaf-3 { left: 30%; bottom: 10%; animation-delay: 4s; }

/* Features */
.features {
  padding: 5rem 0;
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
}

.feature-item {
  padding: 2.5rem 1.5rem;
  text-align: center;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  transition: all 0.4s ease;
}

.feature-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
}

.feature-icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  animation: pulse 2s ease-in-out infinite;
}

.feature-item h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: #2d5016;
}

.feature-item p {
  color: #666;
  line-height: 1.6;
}

/* Featured Products */
.featured {
  padding: 5rem 0;
}

.product-card {
  position: relative;
  overflow: hidden;
}

.product-image {
  aspect-ratio: 1;
  overflow: hidden;
  background-color: #f0f0f0;
  position: relative;
  display: block;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

.product-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #4caf50;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.product-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
}

.product-name:hover {
  color: #4a7c24;
}

.product-category {
  color: #999;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2d5016;
}

/* About Tea */
.about-tea {
  padding: 5rem 0;
  background: linear-gradient(135deg, #f8f9fa 50%, #e8f5e9 50%);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-text h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #2d5016;
}

.about-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 1rem;
}

.about-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.about-list li {
  padding: 0.5rem 0;
  font-size: 1.1rem;
}

.about-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tea-circle {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #4a7c24, #2d5016);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: float 4s ease-in-out infinite;
  box-shadow: 0 20px 60px rgba(45,80,22,0.3);
}

.tea-circle span {
  font-size: 8rem;
}

/* Testimonials */
.testimonials {
  padding: 5rem 0;
  background: #fff;
}

.testimonial-card {
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.testimonial-stars {
  color: #ffc107;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.testimonial-text {
  font-style: italic;
  line-height: 1.8;
  color: #555;
  margin-bottom: 1rem;
  min-height: 100px;
}

.testimonial-author strong {
  display: block;
  color: #2d5016;
}

.testimonial-author span {
  font-size: 0.85rem;
  color: #999;
}

/* Newsletter */
.newsletter {
  padding: 5rem 0;
  background: linear-gradient(135deg, #2d5016, #4a7c24);
  color: white;
  text-align: center;
}

.newsletter-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.newsletter-content p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.newsletter-form {
  display: flex;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

.newsletter-form input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
}

/* Animations */
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(5deg); }
  50% { transform: translateY(-10px) rotate(0deg); }
  75% { transform: translateY(-30px) rotate(-5deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Utility Animations */
.fade-in {
  animation: fadeIn 1.2s ease forwards;
  opacity: 0;
}

.fade-in-up {
  animation: fadeInUp 0.8s ease forwards;
  opacity: 0;
}

.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }

.slide-in-left {
  animation: slideInLeft 0.8s ease forwards;
}

.zoom-in {
  animation: zoomIn 0.8s ease forwards;
}

.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title { font-size: 2rem; }
  .hero-subtitle { font-size: 1rem; }
  .about-grid { grid-template-columns: 1fr; }
  .newsletter-form { flex-direction: column; }
  .tea-circle { width: 200px; height: 200px; }
  .tea-circle span { font-size: 5rem; }
}
</style>