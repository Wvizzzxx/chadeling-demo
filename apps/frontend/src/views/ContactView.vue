<template>
  <div class="contact-page animate-page">
    <!-- Hero -->
    <section class="contact-hero">
      <div class="container fade-in-up">
        <h1>Контакты</h1>
        <p class="subtitle">Мы всегда рады помочь вам</p>
        <div class="hero-icons zoom-in">
          <span class="icon">📞</span>
          <span class="icon">✉️</span>
          <span class="icon">📍</span>
        </div>
      </div>
    </section>

    <!-- Contact Info -->
    <section class="contact-info">
      <div class="container">
        <div class="grid grid-3">
          <div class="contact-card fade-in-up delay-1">
            <div class="contact-icon">📞</div>
            <h3>Телефон</h3>
            <p class="contact-value">8 (800) 123-45-67</p>
            <p class="contact-note">Бесплатно по России</p>
            <p class="contact-hours">Ежедневно с 9:00 до 21:00</p>
            <a href="tel:+78001234567" class="btn btn-primary">Позвонить</a>
          </div>
          <div class="contact-card fade-in-up delay-2">
            <div class="contact-icon">✉️</div>
            <h3>Email</h3>
            <p class="contact-value">info@waystea.ru</p>
            <p class="contact-note">Ответим в течение 24 часов</p>
            <p class="contact-hours">Круглосуточно</p>
            <a href="mailto:info@waystea.ru" class="btn btn-primary">Написать</a>
          </div>
          <div class="contact-card fade-in-up delay-3">
            <div class="contact-icon">📍</div>
            <h3>Адрес</h3>
            <p class="contact-value">г. Москва</p>
            <p class="contact-note">ул. Чайная, д. 15</p>
            <p class="contact-hours">Пн-Пт: 10:00 - 19:00</p>
            <a href="#map" class="btn btn-primary">На карте</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Media -->
    <section class="social-section">
      <div class="container">
        <h2 class="section-title fade-in-up">Мы в социальных сетях</h2>
        <div class="social-grid">
          <a href="#" class="social-card fade-in-up delay-1">
            <div class="social-icon telegram">📱</div>
            <h3>Telegram</h3>
            <p>@waytea_shop</p>
          </a>
          <a href="#" class="social-card fade-in-up delay-2">
            <div class="social-icon vk">💬</div>
            <h3>ВКонтакте</h3>
            <p>waytea.ru</p>
          </a>
          <a href="#" class="social-card fade-in-up delay-3">
            <div class="social-icon instagram">📷</div>
            <h3>Instagram</h3>
            <p>@waytea_official</p>
          </a>
          <a href="#" class="social-card fade-in-up delay-4">
            <div class="social-icon youtube">▶️</div>
            <h3>YouTube</h3>
            <p>WayTea Channel</p>
          </a>
        </div>
      </div>
    </section>

    <!-- Contact Form -->
    <section class="contact-form-section">
      <div class="container">
        <h2 class="section-title fade-in-up">Напишите нам</h2>
        <div class="form-wrapper fade-in-up">
          <form class="contact-form" @submit.prevent="submitForm">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Ваше имя *</label>
                <input v-model="form.name" type="text" class="form-input" required placeholder="Иван Иванов" />
              </div>
              <div class="form-group">
                <label class="form-label">Email *</label>
                <input v-model="form.email" type="email" class="form-input" required placeholder="example@mail.ru" />
              </div>
              <div class="form-group">
                <label class="form-label">Телефон</label>
                <input v-model="form.phone" type="tel" class="form-input" placeholder="+7 (999) 123-45-67" />
              </div>
              <div class="form-group">
                <label class="form-label">Тема обращения *</label>
                <select v-model="form.subject" class="form-input" required>
                  <option value="">Выберите тему</option>
                  <option value="order">Вопрос по заказу</option>
                  <option value="product">Вопрос по товару</option>
                  <option value="delivery">Доставка</option>
                  <option value="return">Возврат</option>
                  <option value="cooperation">Сотрудничество</option>
                  <option value="other">Другое</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Сообщение *</label>
              <textarea v-model="form.message" class="form-input" rows="6" required placeholder="Опишите ваш вопрос..."></textarea>
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.agree" required />
                <span>Я согласен на обработку персональных данных</span>
              </label>
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-block" :disabled="loading">
              {{ loading ? 'Отправка...' : 'Отправить сообщение' }}
            </button>
          </form>
          <div v-if="success" class="success-message">
            <div class="success-icon">✅</div>
            <h3>Сообщение отправлено!</h3>
            <p>Мы свяжемся с вами в ближайшее время.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Map -->
    <section class="map-section" id="map">
      <div class="container">
        <h2 class="section-title fade-in-up">Как нас найти</h2>
        <div class="map-wrapper fade-in-up">
          <div class="map-placeholder">
            <div class="map-content">
              <span class="map-icon">📍</span>
              <h3>г. Москва, ул. Чайная, д. 15</h3>
              <p>Ближайшее метро: Китай-город</p>
              <div class="map-details">
                <p><strong>Часы работы:</strong></p>
                <p>Пн-Пт: 10:00 - 19:00</p>
                <p>Сб-Вс: 11:00 - 17:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners -->
    <section class="partners-section">
      <div class="container">
        <h2 class="section-title fade-in-up">Сотрудничество</h2>
        <p class="section-desc">Мы открыты для партнёрства и сотрудничества</p>
        <div class="partners-grid">
          <div class="partner-card fade-in-up delay-1">
            <div class="partner-icon">🏪</div>
            <h3>Для магазинов</h3>
            <p>Станьте нашим партнёром в вашем регионе</p>
            <a href="mailto:partners@waystea.ru" class="btn btn-outline-primary">Стать партнёром</a>
          </div>
          <div class="partner-card fade-in-up delay-2">
            <div class="partner-icon">🌱</div>
            <h3>Для поставщиков</h3>
            <p>Предлагайте нам свою продукцию</p>
            <a href="mailto:supply@waystea.ru" class="btn btn-outline-primary">Предложить товар</a>
          </div>
          <div class="partner-card fade-in-up delay-3">
            <div class="partner-icon">📰</div>
            <h3>Для СМИ</h3>
            <p>Пресс-служба и медиа-материалы</p>
            <a href="mailto:press@waystea.ru" class="btn btn-outline-primary">Связаться</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  agree: false
});

const loading = ref(false);
const success = ref(false);

async function submitForm() {
  loading.value = true;
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1500));
  success.value = true;
  loading.value = false;
  form.value = { name: '', email: '', phone: '', subject: '', message: '', agree: false };
}
</script>

<style scoped>
.animate-page {
  animation: fadeInUp 0.6s ease;
}

/* Hero */
.contact-hero {
  background: linear-gradient(135deg, #8e44ad, #9b59b6);
  color: white;
  text-align: center;
  padding: 5rem 0;
}

.contact-hero h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
}

.hero-icons {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.hero-icons .icon {
  font-size: 4rem;
  animation: pulse 2s ease-in-out infinite;
}

.hero-icons .icon:nth-child(2) { animation-delay: 0.3s; }
.hero-icons .icon:nth-child(3) { animation-delay: 0.6s; }

/* Contact Info */
.contact-info {
  padding: 5rem 0;
}

.contact-card {
  padding: 2.5rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.06);
  text-align: center;
  transition: all 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.12);
}

.contact-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.contact-card h3 {
  color: #8e44ad;
  margin-bottom: 0.5rem;
}

.contact-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.25rem;
}

.contact-note {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.contact-hours {
  color: #8e44ad;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

/* Social Media */
.social-section {
  padding: 5rem 0;
  background: #f8f9fa;
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.social-card {
  padding: 2rem;
  background: white;
  border-radius: 16px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.social-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.social-icon {
  font-size: 3rem;
  margin-bottom: 0.75rem;
}

.social-card h3 {
  color: #333;
  margin-bottom: 0.25rem;
}

.social-card p {
  color: #666;
  font-size: 0.9rem;
}

/* Contact Form */
.contact-form-section {
  padding: 5rem 0;
}

.form-wrapper {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.contact-form {
  padding: 2.5rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.06);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #8e44ad;
}

textarea.form-input {
  resize: vertical;
  min-height: 120px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.btn-block {
  width: 100%;
}

.success-message {
  position: absolute;
  inset: 0;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.success-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.success-message h3 {
  color: #27ae60;
  margin-bottom: 0.5rem;
}

.success-message p {
  color: #666;
}

/* Map */
.map-section {
  padding: 5rem 0;
  background: #f8f9fa;
}

.map-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

.map-placeholder {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0,0,0,0.06);
}

.map-content {
  padding: 3rem;
  text-align: center;
}

.map-icon {
  font-size: 5rem;
  display: block;
  margin-bottom: 1rem;
}

.map-content h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.map-content p {
  color: #666;
  margin-bottom: 0.25rem;
}

.map-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #f0f0f0;
}

/* Partners */
.partners-section {
  padding: 5rem 0;
}

.section-desc {
  text-align: center;
  color: #777;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.partner-card {
  padding: 2.5rem;
  background: white;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
}

.partner-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.12);
}

.partner-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.partner-card h3 {
  color: #8e44ad;
  margin-bottom: 0.5rem;
}

.partner-card p {
  color: #666;
  margin-bottom: 1.5rem;
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.fade-in-up {
  animation: fadeInUp 0.8s ease forwards;
}

.zoom-in {
  animation: zoomIn 0.6s ease forwards;
}

.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }

@keyframes zoomIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

/* Responsive */
@media (max-width: 768px) {
  .contact-hero h1 { font-size: 2rem; }
  .social-grid { grid-template-columns: repeat(2, 1fr); }
  .partners-grid { grid-template-columns: 1fr; }
  .form-grid { grid-template-columns: 1fr; }
  .hero-icons { gap: 1rem; }
  .hero-icons .icon { font-size: 2.5rem; }
}
</style>