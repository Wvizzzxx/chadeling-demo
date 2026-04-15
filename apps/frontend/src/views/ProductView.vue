<template>
  <div class="product-page">
    <div class="container">
      <nav class="breadcrumbs">
        <router-link to="/">Главная</router-link> /
        <router-link to="/catalog">Каталог</router-link> /
        <span>{{ productStore.product?.name }}</span>
      </nav>

      <div v-if="productStore.loading" class="loading">
        <div class="spinner"></div>
      </div>

      <div v-else-if="productStore.product" class="product-detail">
        <div class="product-gallery">
          <img :src="productStore.product.image || '/placeholder.jpg'" :alt="productStore.product.name" />
        </div>

        <div class="product-details">
          <h1 class="product-title">{{ productStore.product.name }}</h1>
          <p class="product-category">{{ productStore.product.category }}</p>
          <p class="product-price">{{ formatPrice(productStore.product.price) }}</p>

          <div class="product-description-full">
            <h3>Описание</h3>
            <p>{{ productStore.product.description }}</p>
          </div>

          <div class="product-meta">
            <div class="meta-item">
              <span class="meta-label">Вес:</span>
              <span class="meta-value">{{ productStore.product.weight }}г</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Наличие:</span>
              <span class="meta-value" :class="{ 'in-stock': productStore.product.inStock, 'out-of-stock': !productStore.product.inStock }">
                {{ productStore.product.inStock ? 'В наличии' : 'Нет в наличии' }}
              </span>
            </div>
          </div>

          <div class="product-actions">
            <div class="quantity-selector">
              <button class="qty-btn" @click="decreaseQty">-</button>
              <span class="qty-value">{{ quantity }}</span>
              <button class="qty-btn" @click="increaseQty">+</button>
            </div>
            <button
              class="btn btn-primary btn-lg"
              :disabled="!productStore.product.inStock || cartStore.loading"
              @click="handleAddToCart"
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>

      <div v-else class="not-found">
        <p>Товар не найден</p>
        <router-link to="/catalog" class="btn btn-outline">Вернуться в каталог</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsStore } from '../stores/products';
import { useCartStore } from '../stores/cart';

const route = useRoute();
const productStore = useProductsStore();
const cartStore = useCartStore();
const quantity = ref(1);

function formatPrice(price: number): string {
  return `${price.toFixed(2)} ₽`;
}

function increaseQty() { quantity.value++; }
function decreaseQty() { if (quantity.value > 1) quantity.value--; }

async function handleAddToCart() {
  await cartStore.addToCart(productStore.product!._id, quantity.value);
}

onMounted(async () => {
  const id = route.params.id as string;
  await productStore.fetchProduct(id);
});
</script>

<style scoped>
.breadcrumbs {
  padding: var(--space-md) 0;
  color: var(--color-text-light);
  font-size: 0.9rem;
}

.breadcrumbs a:hover {
  color: var(--color-primary);
}

.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2xl);
  margin: var(--space-xl) 0;
}

@media (max-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr;
  }
}

.product-gallery img {
  width: 100%;
  border-radius: var(--radius-lg);
  background-color: var(--color-border);
}

.product-title {
  font-family: var(--font-serif);
  font-size: 2rem;
  margin-bottom: var(--space-sm);
}

.product-category {
  color: var(--color-text-light);
  margin-bottom: var(--space-md);
}

.product-price {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--space-lg);
}

.product-description-full {
  margin-bottom: var(--space-lg);
}

.product-description-full h3 {
  margin-bottom: var(--space-sm);
}

.product-meta {
  margin-bottom: var(--space-lg);
}

.meta-item {
  display: flex;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.meta-label {
  color: var(--color-text-light);
}

.in-stock {
  color: var(--color-success);
}

.out-of-stock {
  color: var(--color-error);
}

.product-actions {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-xs);
}

.qty-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: var(--color-background);
  cursor: pointer;
  font-size: 1.2rem;
  border-radius: var(--radius-sm);
}

.qty-value {
  padding: 0 var(--space-sm);
  font-weight: 600;
  min-width: 30px;
  text-align: center;
}

.not-found {
  text-align: center;
  padding: var(--space-2xl);
}
</style>