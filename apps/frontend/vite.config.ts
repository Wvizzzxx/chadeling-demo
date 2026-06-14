// ============================================================
// Конфигурация Vite (сборщик фронтенда)
// ============================================================
// Настройка: плагин Vue, алиас @ для src,
// dev-сервер на порту 3000, прокси на бэкенд.
// ============================================================

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],                                  // Плагин Vue.js
  base: '/chadeling-demo/',                          // Base path для GitHub Pages (repo: wvizzzxx/chadeling-demo)

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),                // Алиас: @ → src/
    },
  },

  server: {
    host: '0.0.0.0',                                 // Принимать подключения с любых IP
    port: 3000,                                       // Порт фронтенда
    allowedHosts: true,                               // Разрешить любые хосты (для телефона)
    proxy: {
      // ============================================================
      // Прокси на бэкенд: /api → http://localhost:3001
      // ============================================================
      '/api': {
        target: 'http://localhost:3001',              // Адрес бэкенда
        changeOrigin: true,                           // Изменить Origin в заголовке
      },
      '/uploads': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
