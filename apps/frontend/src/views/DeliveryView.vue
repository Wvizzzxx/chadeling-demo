<template>
  <div class="delivery-page animate-page">
    <!-- Hero -->
    <section class="delivery-hero">
      <div class="container fade-in-up">
        <h1>Доставка и оплата</h1>
        <p class="subtitle">Удобные способы получения и оплаты заказа</p>
        <div class="hero-icons zoom-in">
          <span class="icon">🚚</span>
          <span class="icon">📦</span>
          <span class="icon">💳</span>
        </div>
      </div>
    </section>

    <!-- Delivery Methods -->
    <section class="delivery-methods">
      <div class="container">
        <h2 class="section-title fade-in-up">Способы доставки</h2>
        <div class="grid grid-3">
          <div class="delivery-card fade-in-up delay-1">
            <div class="delivery-icon">🚚</div>
            <h3>Курьерская доставка</h3>
            <p>Доставка до двери в удобное для вас время</p>
            <ul class="delivery-features">
              <li>📍 По Москве — 1-2 дня</li>
              <li>📍 По России — 3-7 дней</li>
              <li>⏰ Выбор временного интервала</li>
              <li>📱 SMS-уведомления</li>
            </ul>
            <div class="delivery-price">
              <span class="price-label">Стоимость:</span>
              <span class="price-value">от 299 ₽</span>
            </div>
            <div class="free-delivery-note">
              Бесплатно при заказе от 3000 ₽
            </div>
          </div>

          <div class="delivery-card fade-in-up delay-2">
            <div class="delivery-icon">📦</div>
            <h3>Пункты выдачи</h3>
            <p>Самовывоз из пунктов выдачи по всей России</p>
            <ul class="delivery-features">
              <li>📍 Более 5000 пунктов</li>
              <li>📍 Хранение 7 дней</li>
              <li>📍 Примерка при получении</li>
              <li>📱 Уведомление о готовности</li>
            </ul>
            <div class="delivery-price">
              <span class="price-label">Стоимость:</span>
              <span class="price-value">от 149 ₽</span>
            </div>
            <div class="free-delivery-note">
              Бесплатно при заказе от 2000 ₽
            </div>
          </div>

          <div class="delivery-card fade-in-up delay-3">
            <div class="delivery-icon">📮</div>
            <h3>Почта России</h3>
            <p>Доставка в любое отделение почты</p>
            <ul class="delivery-features">
              <li>📍 По всей России</li>
              <li>📍 Отслеживание по трек-номеру</li>
              <li>📍 Хранение 30 дней</li>
              <li>📱 SMS-уведомления</li>
            </ul>
            <div class="delivery-price">
              <span class="price-label">Стоимость:</span>
              <span class="price-value">от 199 ₽</span>
            </div>
            <div class="free-delivery-note">
              Бесплатно при заказе от 5000 ₽
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Payment Methods -->
    <section class="payment-methods">
      <div class="container">
        <h2 class="section-title fade-in-up">Способы оплаты</h2>
        <div class="payment-grid">
          <div class="payment-card fade-in-up delay-1">
            <div class="payment-icon">💳</div>
            <h3>Банковская карта</h3>
            <p>Visa, MasterCard, МИР</p>
            <ul>
              <li>Мгновенное подтверждение</li>
              <li>Безопасная оплата через защищённый шлюз</li>
              <li>Поддержка 3D Secure</li>
            </ul>
          </div>
          <div class="payment-card fade-in-up delay-2">
            <div class="payment-icon">📱</div>
            <h3>Электронные кошельки</h3>
            <p>ЮMoney, QIWI, WebMoney</p>
            <ul>
              <li>Быстрая оплата</li>
              <li>Без регистрации на сайте</li>
              <li>Мгновенное подтверждение</li>
            </ul>
          </div>
          <div class="payment-card fade-in-up delay-3">
            <div class="payment-icon">💵</div>
            <h3>При получении</h3>
            <p>Наличными или картой курьеру</p>
            <ul>
              <li>Оплата после проверки товара</li>
              <li>Возможность примерки</li>
              <li>Чек при получении</li>
            </ul>
          </div>
          <div class="payment-card fade-in-up delay-4">
            <div class="payment-icon">🏦</div>
            <h3>Безналичный расчёт</h3>
            <p>Для юридических лиц</p>
            <ul>
              <li>Счёт на оплату</li>
              <li>НДС включён</li>
              <li>Закрывающие документы</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Delivery Times -->
    <section class="delivery-times">
      <div class="container">
        <h2 class="section-title fade-in-up">Сроки доставки</h2>
        <div class="times-table fade-in-up">
          <table class="times-grid">
            <thead>
              <tr>
                <th>Регион</th>
                <th>Курьер</th>
                <th>Пункт выдачи</th>
                <th>Почта</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Москва и МО</strong></td>
                <td>1-2 дня</td>
                <td>1-2 дня</td>
                <td>3-5 дней</td>
              </tr>
              <tr>
                <td><strong>Санкт-Петербург</strong></td>
                <td>2-3 дня</td>
                <td>2-3 дня</td>
                <td>4-6 дней</td>
              </tr>
              <tr>
                <td><strong>Центральный ФО</strong></td>
                <td>2-4 дня</td>
                <td>2-4 дня</td>
                <td>5-8 дней</td>
              </tr>
              <tr>
                <td><strong>Южный и Северо-Кавказский ФО</strong></td>
                <td>3-5 дней</td>
                <td>3-5 дней</td>
                <td>6-10 дней</td>
              </tr>
              <tr>
                <td><strong>Уральский и Сибирский ФО</strong></td>
                <td>4-6 дней</td>
                <td>4-6 дней</td>
                <td>7-12 дней</td>
              </tr>
              <tr>
                <td><strong>Дальневосточный ФО</strong></td>
                <td>5-7 дней</td>
                <td>5-7 дней</td>
                <td>10-14 дней</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Returns -->
    <section class="returns-section">
      <div class="container">
        <h2 class="section-title fade-in-up">Возврат и обмен</h2>
        <div class="returns-content fade-in-up">
          <div class="return-card">
            <h3>🔄 Возврат товара</h3>
            <p>Вы можете вернуть товар в течение 14 дней с момента получения при соблюдении следующих условий:</p>
            <ul>
              <li>Товар не был в употреблении</li>
              <li>Сохранена оригинальная упаковка</li>
              <li>Сохранены все ярлыки и бирки</li>
              <li>Есть чек или подтверждение заказа</li>
            </ul>
          </div>
          <div class="return-card">
            <h3>💰 Возврат средств</h3>
            <p>Возврат денежных средств осуществляется в течение 3-10 рабочих дней:</p>
            <ul>
              <li>На банковскую карту — до 10 дней</li>
              <li>На электронный кошелёк — до 3 дней</li>
              <li>Наличными — в день обращения</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="delivery-faq">
      <div class="container">
        <h2 class="section-title fade-in-up">Частые вопросы</h2>
        <div class="faq-list">
          <div v-for="(item, index) in faqItems" :key="index" class="faq-item fade-in-up" :style="{ animationDelay: `${index * 0.1}s` }">
            <button class="faq-question" @click="toggleFaq(index)">
              <span>{{ item.question }}</span>
              <span class="faq-toggle" :class="{ active: item.open }">+</span>
            </button>
            <div v-show="item.open" class="faq-answer">
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card fade-in-up">
          <h2>Остались вопросы?</h2>
          <p>Наша служба поддержки работает ежедневно с 9:00 до 21:00</p>
          <div class="cta-buttons">
            <router-link to="/contact" class="btn btn-outline-light btn-lg">Связаться с нами</router-link>
            <a href="tel:+78001234567" class="btn btn-outline-light btn-lg">8 (800) 123-45-67</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const faqItems = ref([
  {
    question: 'Как отследить заказ?',
    answer: 'После отправки заказа вы получите трек-номер для отслеживания на email и в SMS. Отслеживать статус можно в личном кабинете в разделе "Мои заказы".',
    open: false
  },
  {
    question: 'Можно ли изменить адрес доставки?',
    answer: 'Да, вы можете изменить адрес доставки до момента отправки заказа. Для этого свяжитесь с нашей службой поддержки по телефону или email.',
    open: false
  },
  {
    question: 'Что делать, если заказ пришёл повреждённым?',
    answer: 'Если вы получили повреждённый товар, свяжитесь с нами в течение 24 часов. Мы организуем замену или возврат средств.',
    open: false
  },
  {
    question: 'Есть ли доставка в выходные?',
    answer: 'Курьерская доставка осуществляется с понедельника по субботу. В воскресенье доставка не производится. Пункты выдачи работают ежедневно.',
    open: false
  },
  {
    question: 'Как получить бесплатную доставку?',
    answer: 'Бесплатная доставка предоставляется при заказе на сумму от 3000 ₽ (курьер) или от 2000 ₽ (пункт выдачи).',
    open: false
  }
]);

function toggleFaq(index: number) {
  faqItems.value[index].open = !faqItems.value[index].open;
}
</script>

<style scoped>
.animate-page {
  animation: fadeInUp 0.6s ease;
}

/* Hero */
.delivery-hero {
  background: linear-gradient(135deg, #1a5276, #2980b9);
  color: white;
  text-align: center;
  padding: 5rem 0;
}

.delivery-hero h1 {
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
  animation: bounce 2s ease-in-out infinite;
}

.hero-icons .icon:nth-child(2) { animation-delay: 0.3s; }
.hero-icons .icon:nth-child(3) { animation-delay: 0.6s; }

/* Delivery Methods */
.delivery-methods {
  padding: 5rem 0;
}

.delivery-card {
  padding: 2.5rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.delivery-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.12);
  border-color: #2980b9;
}

.delivery-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.delivery-card h3 {
  font-size: 1.4rem;
  color: #1a5276;
  margin-bottom: 0.5rem;
}

.delivery-card > p {
  color: #666;
  margin-bottom: 1.5rem;
}

.delivery-features {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.delivery-features li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.delivery-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 0.5rem;
}

.price-label {
  color: #666;
}

.price-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a5276;
}

.free-delivery-note {
  text-align: center;
  color: #27ae60;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Payment Methods */
.payment-methods {
  padding: 5rem 0;
  background: #f8f9fa;
}

.payment-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.payment-card {
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.payment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.payment-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.payment-card h3 {
  color: #1a5276;
  margin-bottom: 0.5rem;
}

.payment-card > p {
  color: #666;
  margin-bottom: 1rem;
}

.payment-card ul {
  list-style: none;
  padding: 0;
}

.payment-card li {
  padding: 0.4rem 0;
  color: #555;
}

.payment-card li::before {
  content: '✓ ';
  color: #27ae60;
}

/* Delivery Times */
.delivery-times {
  padding: 5rem 0;
}

.times-table {
  overflow-x: auto;
}

.times-grid {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}

.times-grid th,
.times-grid td {
  padding: 1rem 1.5rem;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.times-grid th {
  background: #1a5276;
  color: white;
  font-weight: 600;
}

.times-grid tr:last-child td {
  border-bottom: none;
}

.times-grid tr:hover {
  background: #f8f9fa;
}

/* Returns */
.returns-section {
  padding: 5rem 0;
  background: #f8f9fa;
}

.returns-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.return-card {
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.return-card h3 {
  color: #1a5276;
  margin-bottom: 1rem;
}

.return-card ul {
  list-style: none;
  padding: 0;
}

.return-card li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

/* FAQ */
.delivery-faq {
  padding: 5rem 0;
}

.faq-item {
  margin-bottom: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  overflow: hidden;
}

.faq-question {
  width: 100%;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  text-align: left;
}

.faq-toggle {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.faq-toggle.active {
  transform: rotate(45deg);
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
  color: #666;
  line-height: 1.6;
}

/* CTA */
.cta-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #1a5276, #2980b9);
}

.cta-card {
  text-align: center;
  color: white;
}

.cta-card h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-card p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

@keyframes zoomIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
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

/* Responsive */
@media (max-width: 768px) {
  .delivery-hero h1 { font-size: 2rem; }
  .payment-grid { grid-template-columns: 1fr; }
  .returns-content { grid-template-columns: 1fr; }
  .hero-icons { gap: 1rem; }
  .hero-icons .icon { font-size: 2.5rem; }
}
</style>