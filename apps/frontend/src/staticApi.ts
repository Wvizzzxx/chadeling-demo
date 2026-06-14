// ============================================================
// Статический API для GitHub Pages (без бэкенда)
// ============================================================
// Перехватывает запросы axios и возвращает захардкоженные данные.
// ============================================================

import { staticProducts } from './data/products';

// Определяем, работаем ли в статическом режиме (нет бэкенда)
export function isStaticMode(): boolean {
  return import.meta.env.VITE_STATIC_MODE === 'true' || 
         (typeof window !== 'undefined' && window.location.hostname.includes('github.io'));
}

// Статические рейтинги (пустые)
const staticRatings: Record<string, { avgRating: number; count: number }> = {};

// Статические настройки (с локальными изображениями из базы данных)
const _base = import.meta.env.BASE_URL || '/';
const staticSettings = {
  storeName: 'Chadeling',
  storeDescription: 'Интернет-магазин китайского чая',
  phone: '+7 (999) 123-45-67',
  email: 'info@chadeling.ru',
  address: 'Москва, Россия',
  about_hero_image: _base + 'images/about/hero.jpg',
  about_team_1: _base + 'images/about/team1.jpg',
  about_team_2: _base + 'images/about/team2.jpg',
  about_team_3: _base + 'images/about/team3.jpg',
  about_team_4: _base + 'images/about/team4.jpg',
  about_cert_1: _base + 'images/about/cert1.jpg',
  about_cert_2: _base + 'images/about/cert2.jpg',
  about_cert_3: _base + 'images/about/cert3.jpg',
  blog_hero_image: _base + 'images/about/blog-hero.jpg',
};

// Статические статьи (с HTML-контентом из базы данных)
const staticArticles = [
  {
    _id: 'article1',
    slug: 'kak-pravilno-zavarivat-zelenyj-chaj',
    title: 'Как правильно заваривать зелёный чай',
    excerpt: 'Температура воды, время заваривания и пропорции для идеального вкуса.',
    content: '<p>Зелёный чай — один из самых популярных напитков в мире. Его правильно заваривают при температуре 70-80°C, используя 2-3 г чая на 150 мл воды. Время заваривания — 1-3 минуты. Не заливайте кипятком — чай будет горьким.</p><h3>Пропорции</h3><p>На чашку 200 мл: 2-3 г сухого чая (1 чайная ложка без горки). Первую заварку можно слить через 30 секунд — она «проснет» чай.</p><h3>Температура воды</h3><ul><li>Молодой зелёный чай: 70-75°C</li><li>Зрелый зелёный чай: 80-85°C</li><li>Японская сенча: 70-80°C</li></ul><p>Используйте термометр или подождите 3-5 минут после закипания чайника.</p>',
    icon: '🍵',
    category: 'Советы',
    gradient: 'linear-gradient(135deg, #27ae60, #2ecc71)',
    readTime: '5 мин',
    author: 'Виктория Листова',
    published: true,
    createdAt: '2026-05-01T00:00:00.000Z',
  },
  {
    _id: 'article2',
    slug: 'puer-chaj-kotoryj-stanovitsya-luchshe-s-godami',
    title: 'Пуэр: чай, который становится лучше с годами',
    excerpt: 'Виды пуэра, правила хранения и почему коллекционеры платят тысячи.',
    content: '<p>Пуэр — уникальный чай, который созревает со временем. Существует два типа: шу (искусственное созревание) и шен (естественное старение).</p><h3>Виды пуэра</h3><ul><li><strong>Шу пуэр</strong> — тёмный, гладкий вкус. Готов к употреблению.</li><li><strong>Шен пуэр</strong> — зеленоватый, терпкий. Становится лучше с годами.</li></ul><h3>Хранение</h3><p>Храните в сухом, проветриваемом месте при комнатной температуре. Избегайте запахов. Коллекционные пуэры могут стоить тысячи долларов за килограмм.</p>',
    icon: '🫖',
    category: 'История',
    gradient: 'linear-gradient(135deg, #8e44ad, #9b59b6)',
    readTime: '8 мин',
    author: 'Алексей Чайкинский',
    published: true,
    createdAt: '2026-05-10T00:00:00.000Z',
  },
  {
    _id: 'article3',
    slug: 'chajnyj-grib-retcept-domashnej-kombuchi',
    title: 'Чайный гриб: рецепт домашнего комбучи',
    excerpt: 'Пошаговый рецепт освежающего напитка с полезными свойствами.',
    content: '<p>Комбучи — освежающий ферментированный напиток с пробиотиками. Для приготовления вам понадобится чайный гриб (SCOBY) и чайный напиток.</p><h3>Рецепт на 1 литр</h3><ol><li>Заварите 4 чайные ложки чая в 500 мл кипятка</li><li>Добавьте 4-5 столовых ложек сахара, размешайте до растворения</li><li>Остудите до комнатной температуры</li><li>Перелейте в банку, добавьте SCOBY и 100 мл старого напитка</li><li>Накройте марлей, оставьте на 7-14 дней при 20-25°C</li></ol><p>Готовый напиток имеет приятный кисловатый вкус. Храните в холодильнике до 3 месяцев.</p>',
    icon: '🧪',
    category: 'Рецепты',
    gradient: 'linear-gradient(135deg, #e67e22, #f39c12)',
    readTime: '6 мин',
    author: 'Мария Зелёная',
    published: true,
    createdAt: '2026-06-01T00:00:00.000Z',
  },
];

// Обработка статических запросов
export function handleStaticRequest(url: string, params?: any): any {
  // Products
  if (url.includes('/api/products') && !url.includes('/api/products/')) {
    let filtered = [...staticProducts];
    
    // Фильтрация по категории
    if (params?.category) {
      filtered = filtered.filter(p => p.category === params.category);
    }
    
    // Поиск
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }
    
    const page = params?.page || 1;
    const limit = params?.limit || 12;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);
    
    return {
      success: true,
      data: {
        products: paginated,
        total: filtered.length,
        page,
        limit,
      },
    };
  }
  
  // Single product
  if (url.match(/\/api\/products\/[a-f0-9]+/)) {
    const id = url.split('/api/products/')[1];
    const product = staticProducts.find(p => p._id === id);
    return {
      success: true,
      data: product || null,
    };
  }
  
  // Reviews ratings
  if (url.includes('/api/reviews/ratings')) {
    return {
      success: true,
      data: staticRatings,
    };
  }
  
  // Single article by slug
  if (url.match(/\/api\/articles\/[a-z]/)) {
    const slug = url.split('/api/articles/')[1];
    const article = staticArticles.find(a => a.slug === slug);
    return {
      success: true,
      data: article || null,
    };
  }

  // Articles list
  if (url.includes('/api/articles')) {
    return {
      success: true,
      data: staticArticles,
    };
  }
  
  // Settings
  if (url.includes('/api/settings')) {
    return {
      success: true,
      data: staticSettings,
    };
  }
  
  // Chat quick questions
  if (url.includes('/api/chat/quick-questions')) {
    return {
      success: true,
      data: [
        'Какие чаи вы рекомендуете для начинающих?',
        'Как правильно заваривать пуэр?',
        'Какой чай лучше для вечера?',
      ],
    };
  }
  
  // Auth - register/login/profile
  if (url.includes('/api/auth/register')) {
    return { success: true, data: { message: 'Регистрация недоступна в демо-режиме' } };
  }
  if (url.includes('/api/auth/login')) {
    return { success: true, data: { token: 'demo-token', user: { _id: 'demo', email: 'demo@chadeling.ru', name: 'Демо', role: 'customer', avatar: null, emailVerified: true, totalSpent: 0, discountLevel: 0, discountPercentage: 0, settings: { notifications: { emailOrders: true, emailPromo: false, emailNewsletter: true }, language: 'ru' }, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } } };
  }
  if (url.includes('/api/auth/profile')) {
    return { success: true, data: { _id: 'demo', email: 'demo@chadeling.ru', name: 'Демо', role: 'customer', avatar: null, emailVerified: true, totalSpent: 0, discountLevel: 0, discountPercentage: 0, settings: { notifications: { emailOrders: true, emailPromo: false, emailNewsletter: true }, language: 'ru' }, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } };
  }
  if (url.includes('/api/auth/settings')) {
    return { success: true, data: { _id: 'demo', email: 'demo@chadeling.ru', name: 'Демо', role: 'customer', settings: { notifications: { emailOrders: true, emailPromo: false, emailNewsletter: true }, language: 'ru' } } };
  }
  if (url.includes('/api/auth/discount-info')) {
    return { success: true, data: { currentTier: { name: 'Базовый', level: 0, percentage: 0 }, nextTierAt: 5000, tiers: [] } };
  }
  if (url.includes('/api/auth/password')) {
    return { success: true, message: 'Пароль изменён (демо)' };
  }
  if (url.includes('/api/auth/profile') && !url.includes('/api/auth/profile/')) {
    return { success: true, data: { _id: 'demo', email: 'demo@chadeling.ru', name: 'Демо', role: 'customer', avatar: null, emailVerified: true, totalSpent: 0, discountLevel: 0, discountPercentage: 0, settings: { notifications: { emailOrders: true, emailPromo: false, emailNewsletter: true }, language: 'ru' } } };
  }
  if (url.includes('/api/auth/discount-tiers')) {
    return { success: true, data: [] };
  }
  
  // Default empty response
  return { success: true, data: null };
}