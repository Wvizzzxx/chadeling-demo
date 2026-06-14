<template>
  <div class="article-page animate-page">
    <!-- Hero -->
    <section class="article-hero" :style="{ background: article.gradient }">
      <div class="container fade-in-up">
        <router-link to="/blog" class="back-link">← Назад к блогу</router-link>
        <span class="article-category-badge">{{ article.category }}</span>
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <span>📅 {{ article.date }}</span>
          <span>⏱️ {{ article.readTime }}</span>
          <span>✍️ {{ article.author }}</span>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="article-content-section">
      <div class="container">
        <div class="article-content fade-in-up">
          <div class="article-icon">{{ article.icon }}</div>
          <div class="article-body" v-html="article.content"></div>
        </div>

        <!-- Share -->
        <div class="article-share fade-in-up">
          <span>Поделиться:</span>
          <button class="share-btn" title="ВКонтакте">💬</button>
          <button class="share-btn" title="Скопировать ссылку" @click="copyLink">🔗</button>
        </div>

        <!-- Back -->
        <div class="article-back fade-in-up">
          <router-link to="/blog" class="btn btn-primary">← Все статьи</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api';

const route = useRoute();

interface ArticleData {
  title: string;
  category: string;
  icon: string;
  date: string;
  readTime: string;
  author: string;
  gradient: string;
  content: string;
}

const article = ref<ArticleData>({
  title: 'Загрузка...',
  category: '',
  icon: '📝',
  date: '',
  readTime: '',
  author: '',
  gradient: 'linear-gradient(135deg, #666, #999)',
  content: '',
});

async function fetchArticle() {
  const slug = route.params.slug as string;
  try {
    const { data } = await api.get(`/articles/${slug}`);
    if (data.success) {
      const a = data.data;
      article.value = {
        title: a.title,
        category: a.category,
        icon: a.icon,
        date: new Date(a.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
        readTime: a.readTime,
        author: a.author,
        gradient: a.gradient,
        content: a.content,
      };
    }
  } catch (err) {
    article.value = {
      title: 'Статья не найдена',
      category: '',
      icon: '📄',
      date: '',
      readTime: '',
      author: '',
      gradient: 'linear-gradient(135deg, #666, #999)',
      content: '<p>Эта статья ещё не опубликована. Вернитесь в блог для чтения других статей.</p>',
    };
  }
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href);
  alert('Ссылка скопирована!');
}

onMounted(fetchArticle);
</script>

<style scoped>
.animate-page {
  animation: fadeInUp 0.6s ease;
}

/* Hero */
.article-hero {
  color: white;
  padding: 3rem 0 2.5rem;
  background: linear-gradient(135deg, #2d5016, #4a7c24) !important;
}

.back-link {
  display: inline-block;
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  transition: color 0.2s;
}

.back-link:hover {
  color: white;
}

.article-category-badge {
  display: inline-block;
  background: rgba(255,255,255,0.2);
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  backdrop-filter: blur(4px);
}

.article-hero h1 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.article-meta {
  display: flex;
  gap: 1.5rem;
  font-size: 0.9rem;
  opacity: 0.9;
  flex-wrap: wrap;
}

/* Content */
.article-content-section {
  padding: 3rem 0;
}

.article-content {
  max-width: 720px;
  margin: 0 auto;
}

.article-icon {
  font-size: 4rem;
  text-align: center;
  margin-bottom: 2rem;
}

.article-body {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--color-text);
}

.article-body :deep(h2) {
  font-size: 1.4rem;
  color: var(--color-primary);
  margin: 2rem 0 0.75rem;
}

.article-body :deep(p) {
  margin-bottom: 1rem;
}

.article-body :deep(ul) {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 1rem;
}

.article-body :deep(li) {
  padding: 0.4rem 0 0.4rem 1.5rem;
  position: relative;
  line-height: 1.6;
}

.article-body :deep(li::before) {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-primary);
  font-weight: bold;
}

/* Share */
.article-share {
  max-width: 720px;
  margin: 3rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text-light);
  font-size: 0.9rem;
}

.share-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.share-btn:hover {
  border-color: var(--color-primary);
  transform: scale(1.1);
}

/* Back */
.article-back {
  max-width: 720px;
  margin: 2rem auto 0;
  text-align: center;
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .article-hero h1 { font-size: 1.6rem; }
  .article-meta { gap: 0.75rem; }
}
</style>