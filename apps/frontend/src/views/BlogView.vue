<template>
  <div class="blog-page animate-page">
    <!-- Hero -->
    <section class="blog-hero" :style="heroImage ? { backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}">
      <div class="blog-hero-overlay" v-if="heroImage"></div>
      <div class="container fade-in-up">
        <h1>Блог Cha de ling</h1>
        <p class="subtitle">Всё о китайском чае: истории, советы, рецепты и новости</p>
        <div class="hero-icon zoom-in">📝</div>
      </div>
    </section>

    <!-- Featured Article -->
    <section v-if="featuredArticle" class="featured-article">
      <div class="container">
        <router-link :to="`/blog/${featuredArticle.slug}`" class="featured-card fade-in-up">
          <div class="featured-badge">Рекомендуем</div>
          <div class="featured-content">
          <div class="featured-image">
            <img v-if="featuredArticle.image" :src="featuredArticle.image" :alt="featuredArticle.title" class="article-img" />
            <span v-else>{{ featuredArticle.icon }}</span>
          </div>
            <div class="featured-text">
              <span class="featured-category">{{ featuredArticle.category }}</span>
              <h2>{{ featuredArticle.title }}</h2>
              <p>{{ featuredArticle.excerpt }}</p>
              <div class="featured-meta">
                <span>📅 {{ formatDate(featuredArticle.createdAt) }}</span>
                <span>⏱️ {{ featuredArticle.readTime }}</span>
              </div>
              <span class="btn btn-primary">Читать далее</span>
            </div>
          </div>
        </router-link>
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
          <router-link v-for="(article, index) in filteredArticles" :key="article._id || index" :to="`/blog/${article.slug}`" class="article-card hover-lift fade-in-up" :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="article-image">
              <img v-if="article.image" :src="article.image" :alt="article.title" class="article-img" />
              <span v-else>{{ article.icon }}</span>
            </div>
            <div class="article-content">
              <span class="article-category">{{ article.category }}</span>
              <h3>{{ article.title }}</h3>
              <p>{{ article.excerpt }}</p>
              <div class="article-meta">
                <span>📅 {{ formatDate(article.createdAt) }}</span>
                <span>⏱️ {{ article.readTime }}</span>
              </div>
              <span class="btn btn-outline-primary btn-sm">Читать далее</span>
            </div>
          </router-link>
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
import { ref, computed, onMounted } from 'vue';
import api from '../api';

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  icon: string;
  image?: string;
  gradient: string;
  readTime: string;
  author: string;
  published: boolean;
  createdAt: string;
}

const activeCategory = ref('Все');
const categories = ['Все', 'История', 'Советы', 'Рецепты', 'Новости', 'Обзоры'];
const articles = ref<Article[]>([]);
const loading = ref(true);
const heroImage = ref('');

const featuredArticle = computed(() => articles.value[0] || null);

const filteredArticles = computed(() => {
  const list = activeCategory.value === 'Все' ? articles.value : articles.value.filter(a => a.category === activeCategory.value);
  return list.slice(activeCategory.value === 'Все' ? 1 : 0);
});

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

function subscribeNewsletter() {
  alert('Спасибо за подписку на блог!');
}

onMounted(async () => {
  try {
    const [articlesRes, settingsRes] = await Promise.all([
      api.get('/articles'),
      api.get('/settings').catch(() => null)
    ]);
    if (articlesRes.data.success) {
      articles.value = articlesRes.data.data;
    }
    if (settingsRes?.data?.data?.blog_hero_image) {
      heroImage.value = settingsRes.data.data.blog_hero_image;
    }
  } catch {
    // API not available, use empty list
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.animate-page {
  animation: fadeInUp 0.6s ease;
}

/* Hero */
.blog-hero {
  background: linear-gradient(135deg, #3d6b2d, #5A8F3C);
  color: white;
  text-align: center;
  padding: 5rem 0;
  position: relative;
}

.blog-hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 0;
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
  background: #5A8F3C;
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
  border-color: #5A8F3C;
  color: #5A8F3C;
}

.category-tab.active {
  background: #5A8F3C;
  border-color: #5A8F3C;
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
  overflow: hidden;
}

.article-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.article-content {
  padding: 1.5rem;
}

.article-category {
  display: inline-block;
  background: #e8f5e9;
  color: #3d6b2d;
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
  border-color: #5A8F3C;
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

/* Dark Theme */
:global([data-theme="dark"]) .featured-card { background: #16213e !important; }
:global([data-theme="dark"]) .featured-card h2,
:global([data-theme="dark"]) .featured-text h2 { color: #e0e0e0 !important; }
:global([data-theme="dark"]) .featured-card p,
:global([data-theme="dark"]) .featured-text p { color: #a0a0a0 !important; }
:global([data-theme="dark"]) .featured-image { background: linear-gradient(135deg, #1a1a3e, #1a2a1a) !important; }
:global([data-theme="dark"]) .featured-category { background: #1a3a1a !important; color: #6db33f !important; }
:global([data-theme="dark"]) .featured-meta { color: #888 !important; }

:global([data-theme="dark"]) .category-tab { background: #16213e !important; border-color: #2a2a5a !important; color: #a0a0a0 !important; }
:global([data-theme="dark"]) .category-tab:hover { border-color: #6db33f !important; color: #6db33f !important; }
:global([data-theme="dark"]) .category-tab.active { background: #6db33f !important; border-color: #6db33f !important; color: white !important; }

:global([data-theme="dark"]) .article-card { background: #16213e !important; }
:global([data-theme="dark"]) .article-card h3 { color: #e0e0e0 !important; }
:global([data-theme="dark"]) .article-card p { color: #a0a0a0 !important; }
:global([data-theme="dark"]) .article-image { background: linear-gradient(135deg, #1a1a3e, #1a2a1a) !important; }
:global([data-theme="dark"]) .article-category { background: #3a1a1a !important; color: #ef9a9a !important; }
:global([data-theme="dark"]) .article-meta { color: #888 !important; }

:global([data-theme="dark"]) .newsletter-section { background: #1a1a2e !important; }
:global([data-theme="dark"]) .newsletter-card { background: #16213e !important; }
:global([data-theme="dark"]) .newsletter-card h2 { color: #e0e0e0 !important; }
:global([data-theme="dark"]) .newsletter-card p { color: #a0a0a0 !important; }
:global([data-theme="dark"]) .newsletter-form input { background: #1a1a3e !important; border-color: #2a2a5a !important; color: #e0e0e0 !important; }
:global([data-theme="dark"]) .newsletter-form input:focus { border-color: #6db33f !important; }

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