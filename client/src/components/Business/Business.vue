<script setup>
import { ref, onMounted } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { useRoute, useRouter } from 'vue-router';
import { useUser } from '@/composables/useUser';

const route = useRoute();
const router = useRouter();
const { isLoggedIn } = useUser();
const id = route.params.id;

const business = ref(null);
const loading = ref(true);
const deleteConfirm = ref(false);
const googleMapsUri = ref(null);
const stars = ref(null);


const getStars = (value) => {
  const rating = Math.round(value);
  return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
};

onMounted(async () => {
    try {
        const response = await fetch(`/api/businesses/${id}`);
        if (!response.ok) throw new Error(`Business not found`);
        business.value = await response.json();
        const encoded = encodeURIComponent(business.value.location);
        googleMapsUri.value = `https://www.google.com/maps/search/?api=1&query=${encoded}`;
        stars.value = getStars(business.value.rating);
        console.log(stars.value);
    } catch (error) {
        console.error("Error fetching businesses.", error);
    } finally {
        loading.value = false;
    }
});

async function deleteBusiness(id) {
  try {
    const res = await fetch(`http://localhost:3000/businesses/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    router.push('/');
  } catch (err) {
    console.error('Delete failed:', err.message);
  }
}
</script>

<template>
  <MainLayout>
    <!-- Loading -->
    <div v-if="loading" class="state-card">
      <span class="spinner-icon">⏳</span>
      <p>Loading business details…</p>
    </div>

    <!-- Not Found -->
    <div v-else-if="!business" class="state-card state-card--error">
      <span>🔍</span>
      <h3>Business Not Found</h3>
      <p>This listing may have been removed or the link is incorrect.</p>
      <router-link to="/" class="back-link">← Back to listings</router-link>
    </div>

    <!-- Business Detail -->
    <div v-else class="detail-page">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <router-link to="/" class="breadcrumb-link">Home</router-link>
        <span class="breadcrumb-sep">›</span>
        <span class="breadcrumb-current">{{ business.name }}</span>
      </nav>

      <!-- Header Card -->
      <div class="detail-header">
        <div class="detail-header__info">
          <div class="detail-header__tags">
            <span class="tag tag--category">{{ business.category || 'Business' }}</span>
            <span class="tag tag--flagged">⚠️ Flagged</span>
          </div>
          <h1 class="detail-title">{{ business.name }}</h1>
          <a 
            :href="googleMapsUri"
            target="_blank" 
            rel="noopener noreferrer"
            class="detail-location" 
            v-if="business?.location"
          >
            📍 {{ business.location }}
          </a>
          <div class="rating-row" v-if="business.rating">
            <span class="stars">{{ stars }}</span>
            <span class="rating-val">{{ business.rating }}</span>
            <span class="rating-label">/ 5</span>
          </div>
        </div>
        <div class="alert-badge">
          <span class="alert-icon">🚨</span>
          <div>
            <div class="alert-title">Local Alert</div>
            <div class="alert-sub">Community Reported</div>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="detail-grid">
        <!-- Image -->
        <div class="detail-image-wrap">
          <img
            v-if="business.image_url"
            :src="business.image_url"
            :alt="business.name"
            class="detail-image"
          />
          <div v-else class="detail-image-placeholder">🏢</div>
        </div>

        <!-- Info Panel -->
        <div class="detail-info">
          <!-- Description -->
          <div class="info-card">
            <h2 class="info-card__title">About This Business</h2>
            <p class="info-card__text">{{ business.description || 'No description available for this business yet.' }}</p>
          </div>

          <!-- Community Report -->
          <div class="report-card">
            <div class="report-card__header">
              <span class="report-icon">📋</span>
              <h3 class="report-card__title">Community Report</h3>
            </div>
            <p class="report-card__text">
              This business in <strong>{{ business.location || 'an unknown location' }}</strong> has been reported by locals for implementing a <strong>"No Locals"</strong> policy — prioritizing tourists while excluding or disadvantaging regular residents.
            </p>
          </div>

          <!-- Admin Actions (if logged in) -->
          <div class="admin-card" v-if="isLoggedIn">
            <h3 class="admin-card__title">⚙️ Admin Actions</h3>
            <div v-if="!deleteConfirm">
              <button @click="deleteConfirm = true" class="btn-danger">🗑 Remove Listing</button>
            </div>
            <div v-else class="confirm-row">
              <p class="confirm-text">Are you sure you want to remove this listing?</p>
              <div class="confirm-actions">
                <button @click="deleteBusiness(business.id)" class="btn-danger">Yes, Remove</button>
                <button @click="deleteConfirm = false" class="btn-cancel">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
  /* ── State Cards ──────────────────────────────────── */
  .state-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 4rem 2rem;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    text-align: center;
    color: var(--text-muted);
  }

  .state-card span {
    font-size: 2.5rem;
  }

  .state-card h3 {
    margin: 0;
    color: var(--text-primary);
    font-size: 1.2rem;
  }

  .state-card p { margin: 0; }

  .state-card--error {
    border-color: rgba(252, 129, 129, 0.4);
  }

  .back-link {
    margin-top: 0.5rem;
    color: var(--primary-dark);
    font-weight: 600;
    text-decoration: none;
  }

  .back-link:hover { text-decoration: underline; }

  /* ── Breadcrumb ───────────────────────────────────── */
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 1.5rem;
  }

  .breadcrumb-link {
    color: var(--primary-dark);
    text-decoration: none;
    font-weight: 500;
  }

  .breadcrumb-link:hover { text-decoration: underline; }

  .breadcrumb-sep { color: var(--border); }

  /* ── Detail Header ────────────────────────────────── */
  .detail-header {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 1.75rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: var(--shadow-sm);
    flex-wrap: wrap;
  }

  .detail-header__tags {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }

  .tag {
    padding: 0.25rem 0.7rem;
    border-radius: 99px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .tag--category {
    background: var(--secondary-light);
    color: var(--secondary-dark);
  }

  .tag--flagged {
    background: rgba(252, 129, 129, 0.15);
    color: #e53e3e;
  }

  .detail-title {
    font-size: clamp(1.4rem, 3vw, 2rem);
    font-weight: 800;
    color: var(--text-primary);
    margin: 0 0 0.5rem;
  }

  .detail-location {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin: 0 0 0.75rem;
  }

  .rating-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .stars { color: var(--primary); font-size: 1.1rem; }
  .rating-val { font-weight: 700; color: var(--text-primary); font-size: 1rem; }
  .rating-label { color: var(--text-muted); font-size: 0.875rem; }

  .alert-badge {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: linear-gradient(135deg, var(--dark) 0%, var(--dark-secondary) 100%);
    color: var(--white);
    padding: 0.9rem 1.25rem;
    border-radius: var(--radius-sm);
    flex-shrink: 0;
  }

  .alert-icon { font-size: 1.5rem; }

  .alert-title {
    font-weight: 700;
    font-size: 0.875rem;
    color: var(--primary);
  }

  .alert-sub {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.6);
  }

  /* ── Detail Grid ──────────────────────────────────── */
  .detail-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (min-width: 768px) {
    .detail-grid {
      grid-template-columns: 1.5fr 1fr;
    }
  }

  /* ── Image ────────────────────────────────────────── */
  .detail-image-wrap {
    border-radius: var(--radius-md);
    overflow: hidden;
    height: 380px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
  }

  .detail-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .detail-image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    background: linear-gradient(135deg, var(--light-gray) 0%, var(--secondary-light) 100%);
  }

  /* ── Info Panel ───────────────────────────────────── */
  .detail-info {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .info-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
  }

  .info-card__title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 0.75rem;
  }

  .info-card__text {
    margin: 0;
    color: var(--text-secondary);
    line-height: 1.7;
    font-size: 0.9rem;
  }

  /* ── Community Report Card ────────────────────────── */
  .report-card {
    background: linear-gradient(135deg, rgba(168, 213, 186, 0.15) 0%, rgba(168, 213, 186, 0.05) 100%);
    border: 1px solid rgba(168, 213, 186, 0.5);
    border-left: 4px solid var(--secondary-dark);
    border-radius: var(--radius-md);
    padding: 1.5rem;
  }

  .report-card__header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.75rem;
  }

  .report-icon { font-size: 1.1rem; }

  .report-card__title {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
  }

  .report-card__text {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.875rem;
    line-height: 1.7;
  }

  .report-card__text strong {
    color: var(--text-primary);
  }

  /* ── Admin Card ───────────────────────────────────── */
  .admin-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 1.25rem;
    box-shadow: var(--shadow-sm);
  }

  .admin-card__title {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text-secondary);
    margin: 0 0 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .btn-danger {
    padding: 0.55rem 1.1rem;
    background: #e53e3e;
    color: white;
    border: none;
    border-radius: var(--radius-sm);
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background 0.15s;
  }

  .btn-danger:hover { background: #c53030; }

  .btn-cancel {
    padding: 0.55rem 1.1rem;
    background: var(--light-gray);
    color: var(--text-secondary);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background 0.15s;
  }

  .btn-cancel:hover { background: var(--border); }

  .confirm-text {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0 0 0.75rem;
  }

  .confirm-actions {
    display: flex;
    gap: 0.6rem;
  }
</style>