# WayTea — Интернет-магазин премиального чая

Монорепозиторий интернет-магазина чая waystea.ru, построенный на Turborepo с Vue 3, Fastify и MongoDB.

## 📁 Структура проекта

```
чай33/
├── apps/
│   ├── frontend/          # Фронтенд (Vue 3 + Vite) — порт 3000
│   ├── backend/           # Бэкенд (Fastify + TypeScript) — порт 3001
│   └── admin/             # Админ-панель (Vue 3 + Vite) — порт 3002
├── packages/
│   ├── types/             # Общие TypeScript типы
│   └── ui/                # Общие UI утилиты
├── package.json           # Корневой package.json (Turborepo)
├── turbo.json             # Конфигурация Turborepo
└── pnpm-workspace.yaml    # pnpm workspace
```

## 🛠️ Технологии

### Фронтенд (apps/frontend)
- **Vue 3** — Composition API
- **Vite** — сборка
- **TypeScript** — типизация
- **Pinia** — управление состоянием
- **Vue Router** — маршрутизация
- **Axios** — HTTP-клиент

### Бэкенд (apps/backend)
- **Fastify** — веб-фреймворк
- **TypeScript** — типизация
- **Mongoose** — ORM для MongoDB
- **JWT** — авторизация
- **bcrypt** — хеширование паролей

### Админ-панель (apps/admin)
- **Vue 3** — Composition API
- **Vite** — сборка
- **TypeScript** — типизация
- **Pinia** — управление состоянием
- **Vue Router** — маршрутизация

## 📋 Требования

- **Node.js** >= 18
- **pnpm** >= 8
- **MongoDB** >= 6 (локально или Atlas)

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
pnpm install
```

### 2. Настройка окружения

Создайте файл `.env` в корне проекта:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/waystea

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:3002

# Порты
BACKEND_PORT=3001
FRONTEND_PORT=3000
ADMIN_PORT=3002
```

### 3. Заполнение базы данных

```bash
cd apps/backend
pnpm run seed
```

Это создаст:
- **Администратора**: `admin@waystea.ru` / `admin123`
- **Пользователя**: `user@waystea.ru` / `user123`
- **20 товаров** различных категорий чая

### 4. Запуск всех приложений

```bash
# В корне проекта
pnpm dev
```

Или запуск по отдельности:

```bash
pnpm dev:backend    # Бэкенд на порту 3001
pnpm dev:frontend   # Фронтенд на порту 3000
pnpm dev:admin      # Админ-панель на порту 3002
```

## 🌐 URL-адреса

| Приложение | URL | Описание |
|------------|-----|----------|
| Фронтенд | http://localhost:3000 | Основной сайт |
| Бэкенд API | http://localhost:3001 | REST API |
| Админ-панель | http://localhost:3002 | Панель администратора |

## 📄 Страницы сайта

### Публичные страницы
- **Главная** (`/`) — Hero, преимущества, популярные товары, отзывы
- **Каталог** (`/catalog`) — Все товары с фильтрацией
- **Страница товара** (`/product/:id`) — Детали товара
- **О нас** (`/about`) — История компании, команда, ценности
- **Доставка** (`/delivery`) — Способы доставки, оплаты, сроки, возврат
- **Контакты** (`/contact`) — Контактная информация, форма обратной связи
- **FAQ** (`/faq`) — Частые вопросы с поиском и категориями
- **Блог** (`/blog`) — Статьи о чае с категориями
- **Корзина** (`/cart`) — Корзина покупок
- **Авторизация** (`/login`) — Вход в аккаунт
- **Регистрация** (`/register`) — Создание аккаунта

### Защищённые страницы
- **Оформление заказа** (`/checkout`) — Требует авторизации
- **Личный кабинет** (`/profile`) — Требует авторизации

### Админ-панель
- **Дашборд** (`/`) — Статистика
- **Товары** (`/products`) — CRUD товаров
- **Заказы** (`/orders`) — Управление заказами
- **Пользователи** (`/users`) — Список пользователей
- **Вход** (`/login`) — Авторизация администратора

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` — Регистрация
- `POST /api/auth/login` — Вход
- `GET /api/auth/profile` — Профиль (требует JWT)

### Products
- `GET /api/products` — Список товаров (пагинация, фильтры)
- `GET /api/products/:id` — Детали товара

### Cart (требует JWT)
- `GET /api/cart` — Получить корзину
- `POST /api/cart` — Добавить товар
- `PUT /api/cart/:productId` — Изменить количество
- `DELETE /api/cart/:productId` — Удалить товар
- `DELETE /api/cart` — Очистить корзину

### Orders (требует JWT)
- `GET /api/orders` — Мои заказы
- `POST /api/orders` — Создать заказ
- `GET /api/orders/:id` — Детали заказа

### Admin (требует JWT + роль admin)
- `GET /api/admin/stats` — Статистика
- `GET /api/admin/products` — Все товары
- `POST /api/admin/products` — Создать товар
- `PUT /api/admin/products/:id` — Обновить товар
- `DELETE /api/admin/products/:id` — Удалить товар
- `GET /api/admin/orders` — Все заказы
- `PUT /api/admin/orders/:id/status` — Изменить статус
- `GET /api/admin/users` — Все пользователи

## 📦 Команды

```bash
# Установка зависимостей
pnpm install

# Запуск всех приложений
pnpm dev

# Запуск по отдельности
pnpm dev:frontend
pnpm dev:backend
pnpm dev:admin

# Заполнение базы данных
cd apps/backend && pnpm run seed

# Сборка типов
cd packages/types && pnpm run build

# Проверка типов
pnpm type-check

# Линтинг
pnpm lint
```

## 🗄️ MongoDB

### Локальная установка (Windows)
1. Скачайте MongoDB с [официального сайта](https://www.mongodb.com/try/download/community)
2. Установите как сервис
3. MongoDB будет доступна на `mongodb://localhost:27017`

### MongoDB Atlas (облако)
1. Зарегистрируйтесь на [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Создайте кластер
3. Получите connection string
4. Обновите `MONGODB_URI` в `.env`

### MongoDB Compass
1. Скачайте [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Подключитесь к `mongodb://localhost:27017`
3. База `waystea` появится после запуска seed скрипта

## 🔐 Роли пользователей

| Роль | Описание |
|------|----------|
| `customer` | Обычный покупатель (каталог, корзина, заказы) |
| `admin` | Администратор (управление товарами, заказами, пользователями) |

## 🎨 Стили

Проект использует CSS переменные для единообразного дизайна:

```css
--color-primary: #2d5016;
--color-primary-light: #4a7c24;
--color-primary-dark: #1a3009;
--color-text: #333;
--color-text-light: #666;
--color-border: #e0e0e0;
--color-success: #27ae60;
--color-error: #e74c3c;
--color-warning: #f39c12;
```

## 📱 Адаптивность

Все страницы адаптированы для мобильных устройств:
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

## 🐛 Решение проблем

### MongoDB не подключается
- Убедитесь, что MongoDB запущен
- Проверьте `MONGODB_URI` в `.env`

### Ошибка CORS
- Убедитесь, что `CORS_ORIGIN` содержит правильные URL

### Порт уже используется
- Измените порты в `.env`

### Зависимости не устанавливаются
- Удалите `node_modules` и `pnpm-lock.yaml`
- Запустите `pnpm install` заново

## 📝 Лицензия

MIT