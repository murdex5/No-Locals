<script setup>
import { ref, onMounted } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';

const businesses = ref([]);
const loading = ref(true);
const serverError = ref(false);

onMounted(async () => {
  try {
    const bizzResponse = await fetch('/api/businesses');
    const bizzData = await bizzResponse.json();
    businesses.value = bizzData;
  } catch (error) {
    serverError.value = true;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <MainLayout>
    <!-- Hero Banner -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">🏴 Community Watch</div>
        <h1 class="hero-title">Businesses Flagged for <span class="highlight">"No Locals"</span> Policies</h1>
        <p class="hero-subtitle">Help fellow locals identify businesses that prioritize tourists over residents. Browse reports, share experiences, and make informed decisions.</p>
        <div class="hero-actions">
          <router-link to="/post/business" class="btn-primary">⚠️ Report a Business</router-link>
          <router-link to="/about" class="btn-secondary">Learn More</router-link>
        </div>
      </div>
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-num">{{ businesses.length }}</span>
          <span class="stat-label">Businesses Reported</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-num">🔍</span>
          <span class="stat-label">Community Verified</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-num">🌍</span>
          <span class="stat-label">Multiple Regions</span>
        </div>
      </div>
    </section>

    <!-- Listings -->
    <section class="listings">
      <div class="listings-header">
        <h2 class="listings-title">Flagged Businesses</h2>
        <router-link to="/post/business" class="add-btn">+ Add Report</router-link>
      </div>

      <div v-if="loading" class="state-card">
        <span class="spinner">⏳</span>
        <p>Searching records…</p>
      </div>

      <div v-else-if="serverError" class="state-card state-card--error">
        <span>❌</span>
        <p>Could not connect to server. Please try again later.</p>
      </div>

      <div v-else-if="businesses.length === 0" class="state-card">
        <span>📭</span>
        <p>No businesses reported yet. Be the first to <router-link to="/post/business">submit a report</router-link>.</p>
      </div>

      <div v-else class="card-grid">
        <router-link
          v-for="biz in businesses"
          :key="biz.id"
          :to="'/business/' + biz.id"
          class="biz-card"
        >
          <div class="biz-card__image">
            <img v-if="biz.image_url" :src="biz.image_url" :alt="biz.name" />
            <div v-else class="biz-card__image-placeholder">🏢</div>
            <span class="biz-card__flag">⚠️ Flagged</span>
          </div>
          <div class="biz-card__body">
            <span class="biz-card__category">{{ biz.category || 'Business' }}</span>
            <h3 class="biz-card__name">{{ biz.name }}</h3>
            <p class="biz-card__location" v-if="biz.location">📍 {{ biz.location }}</p>
            <p class="biz-card__desc" v-if="biz.description">{{ biz.description }}</p>
            <div class="biz-card__footer">
              <span class="biz-card__cta">View Details →</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>
  </MainLayout>
</template>

<style scoped>
  /* ── Hero ─────────────────────────────────────────── */
  .hero {
    background: linear-gradient(135deg, var(--dark) 0%, var(--dark-secondary) 100%);
    border-radius: var(--radius-lg);
    padding: 3rem 2.5rem;
    margin-bottom: 2.5rem;
    color: var(--white);
    position: relative;
    overflow: hidden;
  }

  .hero::after {
    content: '';
    position: absolute;
    top: -60px;
    right: -60px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(244, 184, 96, 0.15) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 680px;
  }

  .hero-badge {
    display: inline-block;
    background: rgba(244, 184, 96, 0.2);
    color: var(--primary);
    border: 1px solid rgba(244, 184, 96, 0.4);
    padding: 0.3rem 0.9rem;
    border-radius: 99px;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .hero-title {
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    font-weight: 800;
    line-height: 1.2;
    margin: 0 0 1rem;
    color: var(--white);
  }

  .highlight {
    color: var(--primary);
  }

  .hero-subtitle {
    margin: 0 0 1.75rem;
    color: rgba(255,255,255,0.7);
    font-size: 1rem;
    line-height: 1.7;
  }

  .hero-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.65rem 1.4rem;
    background: var(--primary);
    color: var(--dark);
    border-radius: var(--radius-sm);
    font-weight: 700;
    text-decoration: none;
    font-size: 0.9rem;
    transition: background 0.15s, transform 0.1s;
  }

  .btn-primary:hover {
    background: var(--primary-dark);
    transform: translateY(-1px);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    padding: 0.65rem 1.4rem;
    background: rgba(255,255,255,0.1);
    color: var(--white);
    border-radius: var(--radius-sm);
    font-weight: 600;
    text-decoration: none;
    font-size: 0.9rem;
    border: 1px solid rgba(255,255,255,0.2);
    transition: background 0.15s;
  }

  .btn-secondary:hover {
    background: rgba(255,255,255,0.18);
  }

  .hero-stats {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255,255,255,0.1);
    position: relative;
    z-index: 1;
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .stat-num {
    font-size: 1.4rem;
    font-weight: 800;
    color: var(--primary);
    line-height: 1;
  }

  .stat-label {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .stat-divider {
    width: 1px;
    height: 36px;
    background: rgba(255,255,255,0.12);
  }

  /* ── Listings ─────────────────────────────────────── */
  .listings {}

  .listings-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .listings-title {
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
  }

  .add-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.45rem 1rem;
    background: var(--primary-light);
    color: var(--primary-dark);
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.15s;
  }

  .add-btn:hover {
    background: var(--primary);
    color: var(--dark);
  }

  /* ── State Cards ──────────────────────────────────── */
  .state-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 3rem;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    text-align: center;
    color: var(--text-muted);
    font-size: 0.95rem;
  }

  .state-card span {
    font-size: 2rem;
  }

  .state-card p {
    margin: 0;
  }

  .state-card a {
    color: var(--primary-dark);
    font-weight: 600;
  }

  .state-card--error {
    border-color: rgba(252, 129, 129, 0.4);
    background: rgba(252, 129, 129, 0.05);
  }

  /* ── Card Grid ────────────────────────────────────── */
  .card-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  @media (min-width: 640px) {
    .card-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .card-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* ── Business Card ────────────────────────────────── */
  .biz-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.2s, transform 0.15s;
    box-shadow: var(--shadow-sm);
  }

  .biz-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-3px);
  }

  .biz-card__image {
    position: relative;
    height: 160px;
    background: var(--light-gray);
    overflow: hidden;
  }

  .biz-card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  .biz-card:hover .biz-card__image img {
    transform: scale(1.04);
  }

  .biz-card__image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    background: linear-gradient(135deg, var(--light-gray) 0%, var(--secondary-light) 100%);
  }

  .biz-card__flag {
    position: absolute;
    top: 0.7rem;
    left: 0.7rem;
    background: rgba(26, 32, 44, 0.85);
    color: var(--primary);
    padding: 0.25rem 0.6rem;
    border-radius: 99px;
    font-size: 0.7rem;
    font-weight: 700;
    backdrop-filter: blur(4px);
  }

  .biz-card__body {
    padding: 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    flex: 1;
  }

  .biz-card__category {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--secondary-dark);
    background: var(--secondary-light);
    padding: 0.2rem 0.55rem;
    border-radius: 99px;
    align-self: flex-start;
  }

  .biz-card__name {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
    line-height: 1.3;
  }

  .biz-card__location {
    font-size: 0.825rem;
    color: var(--text-muted);
    margin: 0;
  }

  .biz-card__desc {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }

  .biz-card__footer {
    margin-top: 0.5rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border);
  }

  .biz-card__cta {
    font-size: 0.825rem;
    font-weight: 600;
    color: var(--primary-dark);
  }

  /* ── Mobile adjustments ───────────────────────────── */
  @media (max-width: 520px) {
    .hero {
      padding: 2rem 1.25rem;
    }

    .hero-stats {
      flex-wrap: wrap;
      gap: 1rem;
    }

    .stat-divider {
      display: none;
    }
  }
</style>