<template>
  <div class="blog-page animate-page">
    <!-- Hero -->
    <section class="blog-hero">
      <div class="container fade-in-up">
        <h1>Блог WayTea</h1>
        <p class="subtitle">Всё о чае: истории, советы, рецепты и новости</p>
        <div class="hero-icon zoom-in">📝</div>
      </div>
    </section>

    <!-- Featured Article -->
    <section class="featured-article">
      <div class="container">
        <div class="featured-card fade-in-up">
          <div class="featured-badge">Рекомендуем</div>
          <div class="featured-content">
            <div class="featured-image">🍵</div>
            <div class="featured-text">
              <span class="featured-category">История чая</span>
              <h2>Путешествие чая: от древнего Китая до вашего стола</h2>
              <p>Узнайте, как чай прошёл путь от лекарственного средства в древнем Китае до самого популярного напитка в мире. История, полная приключений, открытий и культурного обмена.</p>
              <div class="featured-meta">
                <span>📅 15 апреля 2026</span>
                <span>⏱️ 10 мин чтения</span>
              </div>
              <button class="btn btn-primary">Читать далее</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="blog-categories">
      <div class="container">
        <div class="category-tabs fade-in-up">
          <button v-for="cat in categories" :key="cat" class="category-tab" :class="{ active: activeCategory === cat }" @click="activeCategory = cat">
            {{ cat }}
          </button>
        </div>
      </div>
    </section>

    <!-- Articles Grid -->
    <section class="articles-section">
      <div class="container">
        <div class="articles-grid">
          <article v-for="(article, index) in filteredArticles" :key="index" class="article-card hover-lift fade-in-up" :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="article-image">{{ article.icon }}</div>
            <div class="article-content">
              <span class="article-category">{{ article.category }}</span>
              <h3>{{ article.title }}</h3>
              <p>{{ article.excerpt }}</p>
              <div class="article-meta">
                <span>📅 {{ article.date }}</span>
                <span>⏱️ {{ article.readTime }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm">Читать далее</button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-card fade-in-up">
          <h2>Подпишитесь на наш блог</h2>
          <p>Получайте новые статьи и советы о чае прямо на почту</p>
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
import { ref, computed } from 'vue';

interface Article {
  title: string;
  excerpt: string;
  category: string;
  icon: string;
  date: string;
  readTime: string;
}

const activeCategory = ref('Все');
const categories = ['Все', 'История чая', 'Советы', 'Рецепты', 'Новости', 'Обзоры'];

const articles = ref<Article[]>([
  {
    title: 'Как правильно заваривать зелёный чай',
    excerpt: 'Узнайте секреты идеального заваривания зелёного чая. Температура воды, время и пропорции — всё, что нужно знать.',
    category: 'Советы',
    icon: '🍃',
    date: '12 апреля 2026',
    readTime: '5 мин'
  },
  {
    title: 'Пуэр: чай, который становится лучше с годами',
    excerpt: 'История пуэра, его виды и правила хранения. Почему коллекционеры готовы платить тысячи за выдержанные образцы.',
    category: 'История чая',
    icon: '🫖',
    date: '10 апреля 2026',
    readTime: '8 мин'
  },
  {
    title: 'Чайный гриб: рецепт домашнего комбучи',
    excerpt: 'Пошаговый рецепт приготовления освежающего напитка комбучи в домашних условиях. Полезные свойства и советы.',
    category: 'Рецепты',
    icon: '🧪',
    date: '8 апреля 2026',
    readTime: '6 мин'
  },
  {
    title: 'Новая коллекция: весенние чаи 2026',
    excerpt: 'Представляем новую коллекцию весенних чаёв. Свежий урожай с плантаций Китая и Японии уже в нашем каталоге.',
    category: 'Новости',
    icon: '🌸',
    date: '5 апреля 2026',
    readTime: '3 мин'
  },
  {
    title: 'Обзор: лучшие улуны Тайваня',
    excerpt: 'Дегустация и сравнение пяти лучших улунов с высокогорных плантаций Тайваня. Рейтинг и рекомендации.',
    category: 'Обзоры',
    icon: '🏔️',
    date: '3 апреля 2026',
    readTime: '12 мин'
  },
  {
    title: 'Чай и здоровье: научные исследования',
    excerpt: 'Что говорит наука о пользе чая? Обзор последних исследований о влиянии чая на здоровье и долголетие.',
    category: 'Советы',
    icon: '🔬',
    date: '1 апреля 2026',
    readTime: '10 мин'
  },
  {
    title: 'Матча: японский суперфуд',
    excerpt: 'Всё о матча — японском порошковом зелёном чае. История, польза и способы приготовления.',
    category: 'История чая',
    icon: '🍵',
    date: '28 марта 2026',
    readTime: '7 мин'
  },
  {
    title: 'Чайный коктейль: 5 рецептов с чаем',
    excerpt: 'Освежающие коктейли на основе чая. Идеально для тёплого времени года. Простые рецепты с пошаговыми инструкциями.',
    category: 'Рецепты',
    icon: '🍹',
    date: '25 марта 2026',
    readTime: '5 мин'
  },
  {
    title: 'Открытие нового магазина в Санкт-Петербурге',
    excerpt: 'Рады сообщить об открытии нового фирменного магазина WayTea в Санкт-Петербурге. Адрес и часы работы.',
    category: 'Новости',
    icon: '🏪',
    date: '22 марта 2026',
    readTime: '2 мин'
  }
]);

const filteredArticles = computed(() => {
  if (activeCategory.value === 'Все') return articles.value;
  return articles.value.filter(a => a.category === activeCategory.value);
});

function subscribeNewsletter() {
  alert('Спасибо за подписку на блог!');
}
</script>

<style scoped>
.animate-page {
  animation: fadeInUp 0.6s ease;
}

/* Hero */
.blog-hero {
  background: linear-gradient(135deg, #c0392b, #e74c3c);
  color: white;
  text-align: center;
  padding: 5rem 0;
}

.blog-hero h1 {
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

/* Featured Article */
.featured-article {
  padding: 3rem 0;
}

.featured-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  position: relative;
}

.featured-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: #e74c3c;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 1;
}

.featured-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.featured-image {
  background: linear-gradient(135deg, #f8f9fa, #e8f5e9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8rem;
  min-height: 300px;
}

.featured-text {
  padding: 3rem;
}

.featured-category {
  display: inline-block;
  background: #e8f5e9;
  color: #2d5016;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.featured-text h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.featured-text p {
  color: #666;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.featured-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  color: #999;
  font-size: 0.9rem;
}

/* Categories */
.blog-categories {
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
  border-color: #e74c3c;
  color: #e74c3c;
}

.category-tab.active {
  background: #e74c3c;
  border-color: #e74c3c;
  color: white;
}

/* Articles */
.articles-section {
  padding: 3rem 0;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.article-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
}

.article-image {
  height: 150px;
  background: linear-gradient(135deg, #f8f9fa, #e8f5e9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
}

.article-content {
  padding: 1.5rem;
}

.article-category {
  display: inline-block;
  background: #ffebee;
  color: #c0392b;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.article-content h3 {
  font-size: 1.15rem;
  color: #333;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.article-content p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.article-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #999;
  font-size: 0.85rem;
}

/* Newsletter */
.newsletter-section {
  padding: 5rem 0;
  background: #f8f9fa;
}

.newsletter-card {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.06);
}

.newsletter-card h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.75rem;
}

.newsletter-card p {
  color: #666;
  margin-bottom: 2rem;
}

.newsletter-form {
  display: flex;
  gap: 1rem;
}

.newsletter-form input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
}

.newsletter-form input:focus {
  outline: none;
  border-color: #e74c3c;
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

.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

/* Responsive */
@media (max-width: 768px) {
  .blog-hero h1 { font-size: 2rem; }
  .featured-content { grid-template-columns: 1fr; }
  .featured-image { min-height: 200px; }
  .featured-text { padding: 2rem; }
  .articles-grid { grid-template-columns: 1fr; }
  .newsletter-form { flex-direction: column; }
}
</style>