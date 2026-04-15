<template>
  <div class="catalog">
    <div class="container">
      <h1 class="page-title">Каталог чая</h1>

      <div class="catalog-layout">
        <!-- Filters Sidebar -->
        <aside class="filters">
          <div class="filters-header">
            <h3>Фильтры</h3>
          </div>

          <div class="filter-group">
            <label class="form-label">Категория</label>
            <select v-model="selectedCategory" @change="applyFilters" class="form-input">
              <option value="">Все категории</option>
              <option value="black">Чёрный чай</option>
              <option value="green">Зелёный чай</option>
              <option value="white">Белый чай</option>
              <option value="oolong">Улун</option>
              <option value="herbal">Травяной</option>
              <option value="puerh">Пуэр</option>
            </select>
          </div>

          <div class="filter-group">
            <label class="form-label">Поиск</label>
            <input
              v-model="searchQuery"
              @input="debouncedSearch"
              type="text"
              placeholder="Название или описание"
              class="form-input"
            />
          </div>
        </aside>

        <!-- Products Grid -->
        <div class="products-section">
          <p class="results-count">Найдено: {{ productsStore.total }} товаров</p>

          <div v-if="productsStore.loading" class="loading">
            <div class="spinner"></div>
          </div>

          <div v-else-if="productsStore.products.length === 0" class="empty-results">
            <p>Товары не найдены</p>
          </div>

          <div v-else class="grid grid-3">
            <div v-for="product in productsStore.products" :key="product._id" class="card product-card">
              <router-link :to="`/product/${product._id}`" class="product-image">
                <img :src="product.image || '/placeholder.jpg'" :alt="product.name" />
              </router-link>
              <div class="product-info">
                <router-link :to="`/product/${product._id}`" class="product-name">{{ product.name }}</router-link>
                <p class="product-category">{{ product.category }}</p>
                <p class="product-description">{{ product.description.slice(0, 80) }}...</p>
                <div class="flex-between">
                  <span class="product-price">{{ formatPrice(product.price) }}</span>
                  <button class="btn btn-primary btn-sm" @click="addToCart(product._id)" :disabled="!product.inStock">
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="pagination">
            <button
              class="btn btn-outline"
              :disabled="currentPage === 1"
              @click="goToPage(currentPage - 1)"
            >
              ← Назад
            </button>
            <span class="page-info">{{ currentPage }} из {{ totalPages }}</span>
            <button
              class="btn btn-outline"
              :disabled="currentPage === totalPages"
              @click="goToPage(currentPage + 1)"
            >
              Вперёд →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useProductsStore } from '../stores/products';
import { useCartStore } from '../stores/cart';

const productsStore = useProductsStore();
const cartStore = useCartStore();

const selectedCategory = ref('');
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 12;

const totalPages = computed(() => Math.ceil(productsStore.total / itemsPerPage));

function formatPrice(price: number): string {
  return `${price.toFixed(2)} ₽`;
}

async function applyFilters() {
  currentPage.value = 1;
  await fetchProducts();
}

let searchTimeout: ReturnType<typeof setTimeout>;
function debouncedSearch() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(async () => {
    currentPage.value = 1;
    await fetchProducts();
  }, 500);
}

async function fetchProducts() {
  await productsStore.fetchProducts({
    page: currentPage.value,
    limit: itemsPerPage,
    category: selectedCategory.value || undefined,
    search: searchQuery.value || undefined,
  });
}

async function goToPage(page: number) {
  currentPage.value = page;
  await fetchProducts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function addToCart(productId: string) {
  await cartStore.addToCart(productId, 1);
}

onMounted(fetchProducts);
</script>

<style scoped>
.page-title {
  font-family: var(--font-serif);
  font-size: 2rem;
  margin: var(--space-xl) 0;
}

.catalog-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: var(--space-xl);
}

@media (max-width: 768px) {
  .catalog-layout {
    grid-template-columns: 1fr;
  }
}

.filters {
  background: var(--color-surface);
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  height: fit-content;
  position: sticky;
  top: 80px;
}

.filters-header h3 {
  margin-bottom: var(--space-md);
}

.filter-group {
  margin-bottom: var(--space-lg);
}

.results-count {
  color: var(--color-text-light);
  margin-bottom: var(--space-md);
}

.empty-results {
  text-align: center;
  padding: var(--space-2xl);
  color: var(--color-text-light);
}

.product-card {
  display: flex;
  flex-direction: column;
}

.product-image {
  aspect-ratio: 1;
  overflow: hidden;
  background-color: var(--color-border);
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition);
}

.product-image:hover img {
  transform: scale(1.05);
}

.product-info {
  padding: var(--space-md);
}

.product-name {
  font-weight: 600;
  display: block;
  margin-bottom: var(--space-xs);
}

.product-name:hover {
  color: var(--color-primary);
}

.product-category {
  color: var(--color-text-light);
  font-size: 0.85rem;
  margin-bottom: var(--space-sm);
}

.product-description {
  font-size: 0.85rem;
  color: var(--color-text-light);
  margin-bottom: var(--space-md);
}

.product-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-primary);
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  margin-top: var(--space-xl);
}

.page-info {
  color: var(--color-text-light);
}
</style>