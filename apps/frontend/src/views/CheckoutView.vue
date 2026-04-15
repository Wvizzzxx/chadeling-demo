<template>
  <div class="checkout-page">
    <div class="container">
      <h1 class="page-title">Оформление заказа</h1>

      <div v-if="cartStore.isEmpty" class="empty-warning">
        <p>Ваша корзина пуста</p>
        <router-link to="/catalog" class="btn btn-primary">Перейти в каталог</router-link>
      </div>

      <form v-else class="checkout-form" @submit.prevent="handleSubmit">
        <div class="checkout-grid">
          <div class="checkout-section">
            <div class="card form-section">
              <h2>Контактная информация</h2>
              <div class="form-group">
                <label class="form-label">Имя</label>
                <input v-model="form.name" type="text" class="form-input" required />
              </div>
              <div class="form-group">
                <label class="form-label">Телефон</label>
                <input v-model="form.phone" type="tel" class="form-input" required />
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input v-model="form.email" type="email" class="form-input" required />
              </div>
            </div>

            <div class="card form-section">
              <h2>Адрес доставки</h2>
              <div class="form-group">
                <label class="form-label">Город</label>
                <input v-model="form.city" type="text" class="form-input" required />
              </div>
              <div class="form-group">
                <label class="form-label">Почтовый индекс</label>
                <input v-model="form.zipCode" type="text" class="form-input" required />
              </div>
              <div class="form-group">
                <label class="form-label">Адрес</label>
                <textarea v-model="form.address" class="form-input" rows="3" required></textarea>
              </div>
            </div>

            <div class="card form-section">
              <h2>Комментарий к заказу</h2>
              <div class="form-group">
                <textarea v-model="form.comment" class="form-input" rows="2" placeholder="Дополнительные пожелания..."></textarea>
              </div>
            </div>
          </div>

          <div class="order-summary card">
            <h2>Ваш заказ</h2>
            <div class="summary-items">
              <div v-for="item in cartStore.cart!.items" :key="item.product" class="summary-item">
                <span class="summary-item-name">{{ item.name }}</span>
                <span class="summary-item-qty">{{ item.quantity }} шт.</span>
                <span class="summary-item-price">{{ formatPrice(item.price * item.quantity) }}</span>
              </div>
            </div>
            <div class="summary-divider"></div>
            <div class="summary-total-row">
              <span>Итого:</span>
              <span class="total-price">{{ formatPrice(cartStore.totalPrice) }}</span>
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-block" :disabled="loading">
              <span v-if="loading">Оформление...</span>
              <span v-else>Подтвердить заказ</span>
            </button>
          </div>
        </div>
      </form>

      <div v-if="orderSuccess" class="order-success">
        <div class="card success-card">
          <h2>Заказ успешно оформлен!</h2>
          <p>Номер заказа: {{ orderSuccess }}</p>
          <router-link to="/profile" class="btn btn-primary">Перейти в личный кабинет</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ShippingAddress } from '@waystea/types';
import { useCartStore } from '../stores/cart';
import axios from 'axios';

const cartStore = useCartStore();
const loading = ref(false);
const orderSuccess = ref<string | null>(null);

const form = ref({
  name: '',
  phone: '',
  email: '',
  city: '',
  zipCode: '',
  address: '',
  comment: '',
});

function formatPrice(price: number): string {
  return `${price.toFixed(2)} ₽`;
}

  async function handleSubmit() {
    loading.value = true;
    try {
      const shippingAddress: ShippingAddress = {
        name: form.value.name,
        phone: form.value.phone,
        email: form.value.email,
        address: form.value.address,
        city: form.value.city,
        zipCode: form.value.zipCode,
      };
      const token = localStorage.getItem('token');
      const { data } = await axios.post('/api/orders', {
        shippingAddress,
        comment: form.value.comment || undefined,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      orderSuccess.value = data.data._id;
      await cartStore.fetchCart();
    } catch (error) {
      console.error('Order failed:', error);
    } finally {
      loading.value = false;
    }
  }
</script>

<style scoped>
.page-title {
  font-family: var(--font-serif);
  font-size: 2rem;
  margin: var(--space-xl) 0;
}

.empty-warning {
  text-align: center;
  padding: var(--space-2xl);
}

.checkout-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: var(--space-xl);
  align-items: start;
}

@media (max-width: 900px) {
  .checkout-grid {
    grid-template-columns: 1fr;
  }
}

.form-section {
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
}

.form-section h2 {
  margin-bottom: var(--space-md);
  font-size: 1.3rem;
}

.order-summary {
  padding: var(--space-lg);
  position: sticky;
  top: 80px;
}

.order-summary h2 {
  margin-bottom: var(--space-md);
}

.summary-items {
  max-height: 300px;
  overflow-y: auto;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: var(--space-sm) 0;
  font-size: 0.9rem;
}

.summary-item-name {
  flex: 1;
  margin-right: var(--space-sm);
}

.summary-item-qty {
  color: var(--color-text-light);
}

.summary-item-price {
  font-weight: 600;
  margin-left: var(--space-sm);
}

.summary-divider {
  border-top: 1px solid var(--color-border);
  margin: var(--space-md) 0;
}

.summary-total-row {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: var(--space-lg);
}

.total-price {
  color: var(--color-primary);
}

.btn-block {
  display: block;
  width: 100%;
}

.success-card {
  text-align: center;
  padding: var(--space-2xl);
  border-color: var(--color-success);
}

.success-card h2 {
  color: var(--color-success);
  margin-bottom: var(--space-md);
}

.success-card p {
  color: var(--color-text-light);
  margin-bottom: var(--space-lg);
}
</style>