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

// Статические настройки (с локальными изображениями)
const staticSettings = {
  storeName: 'Chadeling',
  storeDescription: 'Интернет-магазин китайского чая',
  phone: '+7 (999) 123-45-67',
  email: 'info@chadeling.ru',
  address: 'Москва, Россия',
  about_hero_image: (import.meta.env.BASE_URL || '/') + 'images/products/1780057992768-5d0suv.jpg',
  about_team_1: (import.meta.env.BASE_URL || '/') + 'images/products/1780059468031-ofanqq.png',
  about_team_2: (import.meta.env.BASE_URL || '/') + 'images/products/1780059482270-mnzzj3.jpg',
  about_team_3: (import.meta.env.BASE_URL || '/') + 'images/products/1780059503825-a9p3un.jpg',
  about_team_4: (import.meta.env.BASE_URL || '/') + 'images/products/1780059515496-ftv8pl.jpg',
  about_cert_1: (import.meta.env.BASE_URL || '/') + 'images/products/1780059537195-5z36rv.png',
  about_cert_2: (import.meta.env.BASE_URL || '/') + 'images/products/1780059548173-p7cdih.jpg',
  about_cert_3: (import.meta.env.BASE_URL || '/') + 'images/products/1780059561182-o93cgs.png',
  blog_hero_image: (import.meta.env.BASE_URL || '/') + 'images/products/1780059578369-qkidop.jpg',
};

// Статические статьи
const staticArticles = [
  {
    _id: 'article1',
    slug: 'kak-zavarivat-kitajskij-chaj',
    title: 'Как заваривать китайский чай',
    excerpt: 'Правильная температура воды и время заваривания — залог идеального вкуса.',
    content: 'Каждый вид чая требует особого подхода к завариванию. Зелёный чай заваривается при температуре 75-85°C в течение 2-3 минут. Чёрный чай — при 95-100°C в течение 3-5 минут. Пуэр требует промывки перед первым завариванием. Улун заваривается кипятком (95-100°C) проливами — каждые 10-15 секунд. Белый чай — самый деликатный, при 75-80°C на 3-5 минут. Правильная температура и время раскрывают весь вкусовой букет.',
    icon: '🍵',
    category: 'Советы',
    image: (import.meta.env.BASE_URL || '/') + 'images/products/1780057992768-5d0suv.jpg',
    readTime: '5 мин',
    createdAt: '2026-05-01T00:00:00.000Z',
  },
  {
    _id: 'article2',
    slug: 'istoriya-kitajskogo-chaya',
    title: 'История китайского чая',
    excerpt: 'От древних легенд до современных традиций — погружение в мир чая.',
    content: 'Чай — один из древнейших напитков в мире. Легенда гласит, что император Шэнь Нун обнаружил чай в 2737 году до н.э., когда листья чайного дерева попали в его кипяток. На протяжении тысячелетий чай эволюцировал от лекарственного напитка до основы культурного ритуала. В династию Тан чай стал символом учёности, а в эпоху Сун — предметом эстетического наслаждения. Сегодня Китай остаётся крупнейшим производителем чая в мире.',
    icon: '📜',
    category: 'История',
    image: (import.meta.env.BASE_URL || '/') + 'images/products/1780059548173-p7cdih.jpg',
    readTime: '8 мин',
    createdAt: '2026-05-10T00:00:00.000Z',
  },
  {
    _id: 'article3',
    slug: 'vidy-kitajskogo-chaya',
    title: 'Виды китайского чая',
    excerpt: 'Зелёный, белый, улун, чёрный, пуэр — какой чай выбрать?',
    content: 'Китайский чай делится на несколько основных категорий по степени ферментации: зелёный (без ферментации), белый (минимальная), жёлтый (слабая), улун (частичная), чёрный (полная) и пуэр (постферментация). Каждый тип имеет уникальные вкусовые качества и полезные свойства. Для начинающих рекомендуем начать с зелёного чая или улуна — они наиболее сбалансированы по вкусу.',
    icon: '🍃',
    category: 'Обзоры',
    image: (import.meta.env.BASE_URL || '/') + 'images/products/1780059537195-5z36rv.png',
    readTime: '6 мин',
    createdAt: '2026-05-15T00:00:00.000Z',
  },
  {
    _id: 'article4',
    slug: 'polza-kitajskogo-chaya',
    title: 'Польза китайского чая для здоровья',
    excerpt: 'Какие вещества содержатся в чае и как они влияют на организм.',
    content: 'Китайский чай богат полифенолами, катехинами и теином. Зелёный чай содержит EGCG — мощный антиоксидант, который помогает в борьбе со свободными радикалами. Пуэр способствует пищеварению и снижению холестерина. Улун ускоряет метаболизм и помогает похудеть. Белый чай обладает антибактериальными свойствами. Регулярное употребление чая снижает риск сердечно-сосудистых заболеваний.',
    icon: '💚',
    category: 'Советы',
    image: (import.meta.env.BASE_URL || '/') + 'images/products/1780059503825-a9p3un.jpg',
    readTime: '7 мин',
    createdAt: '2026-05-20T00:00:00.000Z',
  },
  {
    _id: 'article5',
    slug: 'puerh-sekret-starini',
    title: 'Пуэр: секрет древних деревьев',
    excerpt: 'Почему пуэр становится лучше с возрастом и как его хранить.',
    content: 'Пуэр — уникальный чай, который проходит процесс постферментации. В отличие от других чаёв, пуэр не теряет качества со временем, а наоборот — улучшается. Шу-пуэр проходит ускоренную ферментацию (40-60 дней), а шен-пуэр ферментируется естественно на протяжении лет. Для хранения пуэра нужна температура 20-25°C и влажность 60-70%. Правильно хранящийся пуэр может стоить тысячи долларов.',
    icon: '🏆',
    category: 'История',
    image: (import.meta.env.BASE_URL || '/') + 'images/products/1780059578369-qkidop.jpg',
    readTime: '6 мин',
    createdAt: '2026-05-25T00:00:00.000Z',
  },
  {
    _id: 'article6',
    slug: 'chajnyj-set-chaynici',
    title: 'Чайная церемония: искусство чаепития',
    excerpt: 'Как провести чайную церемонию дома по-китайски.',
    content: 'Китайская чайная церемония (Гунфу Ча) — это искусство заваривания чая, которое зародилось в провинции Фуцзянь. Для проведения вам понадобятся: чайник-гайвань или юйхин, несколько маленьких чашек, поддон для воды и, конечно, качественный чай. Промойте посуду кипятком, добавьте чай (5-7 г на 150 мл), промойте заварку 2-3 секунды и слейте. Затем заваривайте проливами, постепенно увеличивая время.',
    icon: '🫖',
    category: 'Рецепты',
    image: (import.meta.env.BASE_URL || '/') + 'images/products/1780059561182-o93cgs.png',
    readTime: '10 мин',
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