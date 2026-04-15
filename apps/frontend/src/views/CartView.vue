<template>
  <div class="cart-page">
    <div class="container">
      <h1 class="page-title">Корзина</h1>

      <div v-if="cartStore.loading" class="loading">
        <div class="spinner"></div>
      </div>

      <div v-else-if="cartStore.isEmpty" class="empty-cart">
        <p class="empty-text">Ваша корзина пуста</p>
        <router-link to="/catalog" class="btn btn-primary">Перейти в каталог</router-link>
      </div>

      <div v-else class="cart-content">
        <div class="cart-items">
          <div v-for="item in cartStore.cart!.items" :key="item.product" class="cart-item card">
            <router-link :to="`/product/${item.product}`" class="item-image">
              <img :src="item.image || '/placeholder.jpg'" :alt="item.name" />
            </router-link>
            <div class="item-details">
              <router-link :to="`/product/${item.product}`" class="item-name">{{ item.name }}</router-link>
              <p class="item-price">{{ formatPrice(item.price) }}</p>
            </div>
            <div class="item-quantity">
              <button class="qty-btn" @click="updateItem(item.product, item.quantity - 1)" :disabled="item.quantity <= 1">-</button>
              <span class="qty-value">{{ item.quantity }}</span>
              <button class="qty-btn" @click="updateItem(item.product, item.quantity + 1)">+</button>
            </div>
            <div class="item-total">
              <p class="total-text">{{ formatPrice(item.price * item.quantity) }}</p>
            </div>
            <button class="remove-btn" @click="cartStore.removeItem(item.product)">✕</button>
          </div>
        </div>

        <div class="cart-summary card">
          <h3>Итого</h3>
          <div class="summary-row">
            <span>Количество:</span>
            <span>{{ cartStore.totalItems }} шт.</span>
          </div>
          <div class="summary-row summary-total">
            <span>Итого:</span>
            <span>{{ formatPrice(cartStore.totalPrice) }}</span>
          </div>
          <router-link to="/checkout" class="btn btn-primary btn-lg btn-block">
            Оформить заказ
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCartStore } from '../stores/cart';

const cartStore = useCartStore();

function formatPrice(price: number): string {
  return `${price.toFixed(2)} ₽`;
}

async function updateItem(productId: string, quantity: number) {
  await cartStore.updateItem(productId, quantity);
}

onMounted(() => cartStore.fetchCart());
</script>

<style scoped>
.page-title {
  font-family: var(--font-serif);
  font-size: 2rem;
  margin: var(--space-xl) 0;
}

.empty-cart {
  text-align: center;
  padding: var(--space-2xl);
}

.empty-text {
  color: var(--color-text-light);
  margin-bottom: var(--space-lg);
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: var(--space-xl);
}

@media (max-width: 900px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr auto auto auto;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
}

.item-image {
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: var(--radius-md);
  background-color: var(--color-border);
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-name {
  font-weight: 600;
}

.item-name:hover {
  color: var(--color-primary);
}

.item-price {
  color: var(--color-text-light);
  font-size: 0.9rem;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-xs);
}

.qty-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: var(--color-background);
  cursor: pointer;
  border-radius: var(--radius-sm);
}

.qty-value {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
}

.total-text {
  font-weight: 700;
  color: var(--color-primary);
}

.remove-btn {
  color: var(--color-text-light);
  font-size: 1.2rem;
  padding: var(--space-sm);
}

.remove-btn:hover {
  color: var(--color-error);
}

.cart-summary {
  padding: var(--space-lg);
  height: fit-content;
  position: sticky;
  top: 80px;
}

.cart-summary h3 {
  margin-bottom: var(--space-md);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: var(--space-sm) 0;
}

.summary-total {
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-md);
  margin-top: var(--space-sm);
  font-weight: 700;
  font-size: 1.1rem;
}

.btn-block {
  display: block;
  width: 100%;
  margin-top: var(--space-md);
}
</style>