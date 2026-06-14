<template>
  <div class="about-page animate-page">
    <!-- Hero Banner -->
    <section class="about-hero">
      <div class="container fade-in-up">
        <h1>О компании Cha de ling</h1>
        <p class="subtitle">Чай как искусство — мы знаем о нём всё</p>
        <div class="hero-icon zoom-in">🍃</div>
      </div>
    </section>

    <!-- Company Info -->
    <section class="company-info">
      <div class="container">
        <div class="two-columns">
          <div class="text-content fade-in-up">
            <h2>Наша история</h2>
            <p>
              Компания Cha de ling была основана в 2015 году с простой мечтой — дать
              каждому человеку возможность попробовать настоящий китайский чай.
            </p>
            <p>
              Мы начинали как маленький магазинчик в Москве, а сегодня являемся
              одним из крупнейших онлайн-магазинов чая в России.
            </p>
            <p>
              Наша команда включает профессиональных чайных сомелье, которые
              ежегодно посещают лучшие чайные провинции Китая —
              Юньнань, Фуцзянь, Аньхой и Гуандун.
            </p>
            <div class="stats-row">
              <div class="stat-item">
                <strong>8+</strong>
                <span>Лет на рынке</span>
              </div>
              <div class="stat-item">
                <strong>150+</strong>
                <span>Сортов китайского чая</span>
              </div>
              <div class="stat-item">
                <strong>50K+</strong>
                <span>Клиентов</span>
              </div>
              <div class="stat-item">
                <strong>5</strong>
                <span>Провинций Китая</span>
              </div>
            </div>
          </div>
          <div class="image-placeholder zoom-in">
            <!-- ЗАГЛУШКА: Замените src на своё фото плантации -->
            <img
              :src="settings.about_hero_image || img('images/products/1780057992768-5d0suv.jpg')"
              alt="Чайные плантации"
              class="about-photo"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Values -->
    <section class="mission-values">
      <div class="container">
        <h2 class="section-title fade-in-up">Наши ценности</h2>
        <div class="grid grid-3">
          <div class="value-card fade-in-up delay-1">
            <div class="value-icon">🌱</div>
            <h3>Качество прежде всего</h3>
            <p>
              Мы тщательно проверяем каждый товар. Чай проходит лабораторное
              тестирование перед отправкой в наш магазин.
            </p>
            <ul>
              <li>Сертификация органического происхождения</li>
              <li>Свежесть каждой партии</li>
              <li>Гарантия вкуса и аромата</li>
            </ul>
          </div>
          <div class="value-card fade-in-up delay-2">
            <div class="value-icon">🤝</div>
            <h3>Честные отношения</h3>
            <p>
              Мы работаем напрямую с фермерами, обеспечивая справедливую оплату
              труда производителей.
            </p>
            <ul>
              <li>Прямые контракты с плантациями Китая</li>
              <li>Поддержка малых производителей</li>
              <li>Прозрачная ценовая политика</li>
            </ul>
          </div>
          <div class="value-card fade-in-up delay-3">
            <div class="value-icon">💚</div>
            <h3>Забота об экологии</h3>
            <p>
              Мы используем экологически чистую упаковку и стремимся
              минимизировать воздействие на окружающую среду.
            </p>
            <ul>
              <li>Перерабатываемые материалы</li>
              <li>Углеродно-нейтральная доставка</li>
              <li>Программа утилизации чая</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="team-section">
      <div class="container">
        <h2 class="section-title fade-in-up">Наша команда</h2>
        <p class="section-desc">Профессионалы, которые знают о чае всё</p>
        <div class="grid grid-4">
          <!-- ЗАГЛУШКА: Замените src на фото сотрудника -->
          <div class="team-card hover-lift">
            <img
              :src="settings.about_team_1 || img('images/products/1780059468031-ofanqq.png')"
              alt="Алексей Чайкинский"
              class="team-photo"
            />
            <h3>Алексей Чайкинский</h3>
            <span class="team-role">Основатель, CEO</span>
            <p class="team-bio">
              15 лет опыта в чайной индустрии. Сертифицированный чайный сомелье.
            </p>
          </div>
          <!-- ЗАГЛУШКА: Замените src на фото сотрудника -->
          <div class="team-card hover-lift">
            <img
              :src="settings.about_team_2 || img('images/products/1780059482270-mnzzj3.jpg')"
              alt="Мария Зелёная"
              class="team-photo"
            />
            <h3>Мария Зелёная</h3>
            <span class="team-role">Главный технолог</span>
            <p class="team-bio">
              Контролирует качество каждой партии. Эксперт по ферментации чая.
            </p>
          </div>
          <!-- ЗАГЛУШКА: Замените src на фото сотрудника -->
          <div class="team-card hover-lift">
            <img
              :src="settings.about_team_3 || img('images/products/1780059503825-a9p3un.jpg')"
              alt="Виктория Листова"
              class="team-photo"
            />
            <h3>Виктория Листова</h3>
            <span class="team-role">Чайный сомелье</span>
            <p class="team-bio">
              Посетила более 40 плантаций по всему миру. Автор чайных коллекций.
            </p>
          </div>
          <!-- ЗАГЛУШКА: Замените src на фото сотрудника -->
          <div class="team-card hover-lift">
            <img
              :src="settings.about_team_4 || img('images/products/1780059515496-ftv8pl.jpg')"
              alt="Дмитрий Улунин"
              class="team-photo"
            />
            <h3>Дмитрий Улунин</h3>
            <span class="team-role">Директор по логистике</span>
            <p class="team-bio">
              Обеспечивает быструю и бережную доставку чая по всей России.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Certificates -->
    <section class="certificates-section">
      <div class="container">
        <h2 class="section-title fade-in-up">Сертификаты</h2>
        <div class="certs-grid">
          <!-- ЗАГЛУШКА: Замените src на фото сертификата -->
          <div class="cert-card zoom-in">
            <img
              :src="settings.about_cert_1 || img('images/products/1780059537195-5z36rv.png')"
              alt="Organic Certificate"
              class="cert-photo"
            />
            <p>Органическая продукция</p>
          </div>
          <!-- ЗАГЛУШКА: Замените src на фото сертификата -->
          <div class="cert-card zoom-in">
            <img
              :src="settings.about_cert_2 || img('images/products/1780059548173-p7cdih.jpg')"
              alt="ISO Certificate"
              class="cert-photo"
            />
            <p>ISO 22000</p>
          </div>
          <!-- ЗАГЛУШКА: Замените src на фото сертификата -->
          <div class="cert-card zoom-in">
            <img
              :src="settings.about_cert_3 || img('images/products/1780059561182-o93cgs.png')"
              alt="Fair Trade"
              class="cert-photo"
            />
            <p>Fair Trade</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="timeline-section">
      <div class="container">
        <h2 class="section-title fade-in-up">Наш путь</h2>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-year">2015</div>
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h3>Основание компании</h3>
              <p>Открытие первого магазина в Москве</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-year">2017</div>
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h3>Запуск онлайн-магазина</h3>
              <p>Начали работу по всей России</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-year">2019</div>
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h3>Прямые поставки</h3>
              <p>Заключили контракты с плантациями</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-year">2023</div>
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h3>Расширение ассортимента</h3>
              <p>Более 150 сортов чая в каталоге</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card fade-in-up">
          <h2>Хотите узнать больше?</h2>
          <p>
            Свяжитесь с нами любым удобным способом. Наши специалисты всегда
            готовы помочь.
          </p>
          <div class="cta-buttons">
            <router-link to="/contact" class="btn btn-outline-light btn-lg"
              >Контакты</router-link
            >
            <router-link to="/catalog" class="btn btn-outline-light btn-lg"
              >Каталог</router-link
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import api from '../api';

const base = import.meta.env.BASE_URL || '/';
const settings = ref<Record<string, string>>({});

function img(path: string) {
  return base + path.replace(/^\//, '');
}

onMounted(async () => {
  try {
    const { data } = await api.get('/settings');
    if (data.success) settings.value = data.data;
  } catch { /* settings are optional */ }
});
</script>

<style scoped>
.animate-page {
  animation: fadeInUp 0.6s ease;
}

/* Hero Banner */
.about-hero {
  background: linear-gradient(135deg, #2d5016, #4a7c24);
  color: white;
  text-align: center;
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
}

.about-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' opacity='0.05'%3E%3Cpath fill='white' d='M50 0C22.4 0 0 22.4 0 50c0 27.6 22.4 50 50 50s50-22.4 50-50C100 22.4 77.6 0 50 0z'/%3E%3C/svg%3E");
  pointer-events: none;
}

.about-hero h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
}

.hero-icon {
  font-size: 6rem;
  margin-top: 2rem;
}

/* Company Info */
.company-info {
  padding: 5rem 0;
}

.two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.text-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #2d5016;
}

.text-content p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 1rem;
}

.image-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-photo {
  width: 100%;
  max-width: 500px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  display: block;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #e8f5e9;
}

.stat-item {
  text-align: center;
}

.stat-item strong {
  display: block;
  font-size: 2rem;
  color: #2d5016;
}

.stat-item span {
  font-size: 0.9rem;
  color: #777;
}

/* Mission & Values */
.mission-values {
  padding: 5rem 0;
  background: #f8f9fa;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2d5016;
  margin-bottom: 1rem;
}

.value-card {
  padding: 2.5rem;
  background: white;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.value-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

.value-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.value-card h3 {
  font-size: 1.4rem;
  margin-bottom: 0.75rem;
  color: #2d5016;
}

.value-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.value-card ul {
  list-style: none;
  padding: 0;
}

.value-card li {
  padding: 0.5rem 0;
  font-size: 0.9rem;
  color: #555;
}

.value-card li::before {
  content: "✓ ";
  color: #4caf50;
  font-weight: bold;
}

/* Team */
.team-section {
  padding: 5rem 0;
}

.section-desc {
  text-align: center;
  color: #777;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.team-card {
  padding: 2rem;
  text-align: center;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.team-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 4px solid #e8f5e9;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.cert-photo {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  display: block;
}

.team-card h3 {
  color: #2d5016;
  margin-bottom: 0.25rem;
}

.team-role {
  display: block;
  color: #4caf50;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.team-bio {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
}

/* Certificates */
.certificates-section {
  padding: 5rem 0;
  background: #f8f9fa;
}

.certs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.cert-card {
  text-align: center;
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.cert-card p {
  font-weight: 600;
  color: #333;
}

/* Timeline */
.timeline-section {
  padding: 5rem 0;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #e8f5e9;
  transform: translateX(-50%);
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 3rem;
  position: relative;
}

.timeline-year {
  flex: 0 0 100px;
  text-align: right;
  padding-right: 2rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d5016;
}

.timeline-dot {
  position: absolute;
  left: 50%;
  width: 20px;
  height: 20px;
  background: #2d5016;
  border-radius: 50%;
  transform: translateX(-50%);
  border: 4px solid white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.timeline-content {
  flex: 1;
  padding-left: 2rem;
  margin-left: 50%;
}

.timeline-content h3 {
  color: #2d5016;
  margin-bottom: 0.5rem;
}

.timeline-content p {
  color: #666;
}

/* CTA */
.cta-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #2d5016, #4a7c24);
}

.cta-card {
  text-align: center;
  color: white;
}

.cta-card h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-card p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s ease forwards;
}

.zoom-in {
  animation: zoomIn 0.6s ease forwards;
}

.hover-lift {
  transition: transform 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-10px);
}

.delay-1 {
  animation-delay: 0.1s;
}
.delay-2 {
  animation-delay: 0.2s;
}
.delay-3 {
  animation-delay: 0.3s;
}

/* Responsive */
@media (max-width: 768px) {
  .about-hero h1 {
    font-size: 2rem;
  }
  .two-columns {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
  .certs-grid {
    grid-template-columns: 1fr;
  }
  .timeline::before {
    left: 20px;
  }
  .timeline-year {
    text-align: left;
    padding-right: 0;
    margin: 0;
  }
  .timeline-dot {
    left: 20px;
  }
  .timeline-content {
    margin-left: 0;
    padding-left: 3rem;
  }
}
</style>
