<template>
  <div class="faq-page animate-page">
    <!-- Hero -->
    <section class="faq-hero">
      <div class="container fade-in-up">
        <h1>Часто задаваемые вопросы</h1>
        <p class="subtitle">Ответы на самые популярные вопросы о нашем магазине</p>
        <div class="hero-icon zoom-in">❓</div>
      </div>
    </section>

    <!-- Search -->
    <section class="faq-search">
      <div class="container">
        <div class="search-wrapper fade-in-up">
          <input v-model="searchQuery" type="text" class="search-input" placeholder="Поиск по вопросам..." />
          <span class="search-icon">🔍</span>
        </div>
      </div>
    </section>

    <!-- FAQ Categories -->
    <section class="faq-categories">
      <div class="container">
        <div class="category-tabs fade-in-up">
          <button v-for="cat in categories" :key="cat" class="category-tab" :class="{ active: activeCategory === cat }" @click="activeCategory = cat">
            {{ cat }}
          </button>
        </div>
      </div>
    </section>

    <!-- FAQ List -->
    <section class="faq-list-section">
      <div class="container">
        <div class="faq-list">
          <div v-for="(item, index) in filteredFaq" :key="index" class="faq-item fade-in-up" :style="{ animationDelay: `${index * 0.05}s` }">
            <button class="faq-question" @click="toggleFaq(index)">
              <span>{{ item.question }}</span>
              <span class="faq-toggle" :class="{ active: item.open }">+</span>
            </button>
            <div v-show="item.open" class="faq-answer">
              <p v-html="item.answer"></p>
            </div>
          </div>
          <div v-if="filteredFaq.length === 0" class="no-results">
            <div class="no-results-icon">🔍</div>
            <h3>Ничего не найдено</h3>
            <p>Попробуйте изменить поисковый запрос или выбрать другую категорию</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card fade-in-up">
          <h2>Не нашли ответ?</h2>
          <p>Свяжитесь с нами — мы всегда рады помочь!</p>
          <div class="cta-buttons">
            <router-link to="/contact" class="btn btn-outline-light btn-lg">Написать нам</router-link>
            <a href="tel:+78001234567" class="btn btn-outline-light btn-lg">8 (800) 123-45-67</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
  open: boolean;
}

const searchQuery = ref('');
const activeCategory = ref('Все');

const faqItems = ref<FaqItem[]>([
  // Общие вопросы
  {
    question: 'Что такое WayTea?',
    answer: 'WayTea — это интернет-магазин премиального чая с доставкой по всей России. Мы предлагаем более 150 сортов чая из лучших плантаций мира.',
    category: 'Общие вопросы',
    open: false
  },
  {
    question: 'Как зарегистрироваться на сайте?',
    answer: 'Нажмите кнопку "Регистрация" в правом верхнем углу сайта. Заполните форму, указав имя, email и пароль. После регистрации вы сможете оформлять заказы и отслеживать их статус.',
    category: 'Общие вопросы',
    open: false
  },
  {
    question: 'Как восстановить пароль?',
    answer: 'На странице входа нажмите "Забыли пароль?". Введите email, указанный при регистрации, и мы отправим ссылку для восстановления пароля.',
    category: 'Общие вопросы',
    open: false
  },
  // Заказы
  {
    question: 'Как оформить заказ?',
    answer: 'Выберите понравившийся чай, добавьте его в корзину. Перейдите в корзину и нажмите "Оформить заказ". Заполните данные доставки и выберите способ оплаты.',
    category: 'Заказы',
    open: false
  },
  {
    question: 'Можно ли отменить заказ?',
    answer: 'Да, вы можете отменить заказ до момента его отправки. Для этого свяжитесь с нашей службой поддержки по телефону 8 (800) 123-45-67 или напишите на info@waystea.ru.',
    category: 'Заказы',
    open: false
  },
  {
    question: 'Как отследить заказ?',
    answer: 'После отправки заказа вы получите трек-номер на email. Отслеживать статус можно в личном кабинете в разделе "Мои заказы" или на сайте службы доставки.',
    category: 'Заказы',
    open: false
  },
  {
    question: 'Какой минимальный заказ?',
    answer: 'Минимальная сумма заказа составляет 500 ₽. При заказе на сумму от 3000 ₽ доставка бесплатная.',
    category: 'Заказы',
    open: false
  },
  // Доставка
  {
    question: 'Сколько стоит доставка?',
    answer: 'Стоимость доставки зависит от региона и способа. Курьерская доставка по Москве — от 299 ₽, по России — от 399 ₽. Бесплатная доставка при заказе от 3000 ₽.',
    category: 'Доставка',
    open: false
  },
  {
    question: 'Сколько времени занимает доставка?',
    answer: 'По Москве — 1-2 рабочих дня. По России — от 3 до 14 рабочих дней в зависимости от региона.',
    category: 'Доставка',
    open: false
  },
  {
    question: 'Есть ли доставка в выходные?',
    answer: 'Курьерская доставка осуществляется с понедельника по субботу. Пункты выдачи работают ежедневно.',
    category: 'Доставка',
    open: false
  },
  // Оплата
  {
    question: 'Какие способы оплаты доступны?',
    answer: 'Мы принимаем банковские карты (Visa, MasterCard, МИР), электронные кошельки (ЮMoney, QIWI), а также оплату при получении наличными или картой.',
    category: 'Оплата',
    open: false
  },
  {
    question: 'Безопасно ли оплачивать заказ на сайте?',
    answer: 'Да, все платежи защищены с помощью SSL-шифрования. Мы используем сертифицированные платёжные шлюзы, соответствующие стандарту PCI DSS.',
    category: 'Оплата',
    open: false
  },
  // Возврат
  {
    question: 'Можно ли вернуть чай?',
    answer: 'Чай является продуктом питания и подлежит возврату только в случае ненадлежащего качества. Если вы получили повреждённый товар, свяжитесь с нами в течение 24 часов.',
    category: 'Возврат',
    open: false
  },
  {
    question: 'Как вернуть деньги?',
    answer: 'Возврат средств осуществляется на банковскую карту в течение 10 рабочих дней или наличными в день обращения.',
    category: 'Возврат',
    open: false
  },
  // Чай
  {
    question: 'Как хранить чай?',
    answer: 'Храните чай в герметичной упаковке, в сухом и тёмном месте, при комнатной температуре. Не храните чай рядом с продуктами с сильным запахом.',
    category: 'Чай',
    open: false
  },
  {
    question: 'Какой срок годности чая?',
    answer: 'Зелёный и белый чай — до 12 месяцев. Чёрный чай и улун — до 24 месяцев. Пуэр — может храниться десятилетиями, улучшая вкус со временем.',
    category: 'Чай',
    open: false
  },
  {
    question: 'Как правильно заваривать чай?',
    answer: 'Каждый вид чая требует своей температуры воды и времени заваривания. Зелёный чай — 80°C, 2-3 минуты. Чёрный чай — 95°C, 3-5 минут. Белый чай — 75°C, 4-5 минут. На каждой упаковке есть рекомендации.',
    category: 'Чай',
    open: false
  }
]);

const categories = computed(() => ['Все', ...Array.from(new Set(faqItems.value.map(item => item.category)))]);

const filteredFaq = computed(() => {
  let items = faqItems.value;
  if (activeCategory.value !== 'Все') {
    items = items.filter(item => item.category === activeCategory.value);
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    items = items.filter(item =>
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query)
    );
  }
  return items;
});

function toggleFaq(index: number) {
  const item = filteredFaq.value[index];
  const originalIndex = faqItems.value.findIndex(f => f.question === item.question);
  if (originalIndex !== -1) {
    faqItems.value[originalIndex].open = !faqItems.value[originalIndex].open;
  }
}
</script>

<style scoped>
.animate-page {
  animation: fadeInUp 0.6s ease;
}

/* Hero */
.faq-hero {
  background: linear-gradient(135deg, #e67e22, #f39c12);
  color: white;
  text-align: center;
  padding: 5rem 0;
}

.faq-hero h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
}

.hero-icon {
  font-size: 5rem;
  margin-top: 1.5rem;
}

/* Search */
.faq-search {
  padding: 2rem 0;
  background: #f8f9fa;
}

.search-wrapper {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 1rem 3rem 1rem 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 50px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #e67e22;
}

.search-icon {
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.25rem;
}

/* Categories */
.faq-categories {
  padding: 2rem 0;
}

.category-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.category-tab {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 50px;
  background: white;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-tab:hover {
  border-color: #e67e22;
  color: #e67e22;
}

.category-tab.active {
  background: #e67e22;
  border-color: #e67e22;
  color: white;
}

/* FAQ List */
.faq-list-section {
  padding: 3rem 0;
}

.faq-item {
  margin-bottom: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
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
  color: #e67e22;
}

.faq-toggle.active {
  transform: rotate(45deg);
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
  color: #666;
  line-height: 1.8;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.no-results h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.no-results p {
  color: #666;
}

/* CTA */
.cta-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #e67e22, #f39c12);
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
</style>