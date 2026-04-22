<script setup>
import { ref, onMounted } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
</script>

<template>
  <MainLayout>
    <section class="hero detail-hero">
      <div class="hero-content">
        <div class="title-area">
          <h2>Schokoladenherz</h2>
          <div class="rating-row">
            <span class="stars">★★★★★</span>
            <span class="rating-value">4.5</span>
            <span class="review-count">(128 Reviews)</span>
          </div>
        </div>
        <div class="status-badge flagged">
            <span class="warning-icon">⚠️</span> Local Alert
        </div>
      </div>
    </section>

    <div class="business-layout">
      <div class="biss-image">
        <img src="../assets/schokoladenherz.jpg" alt="Schokoladenherz interior">
        <div class="image-overlay">View all photos</div>
      </div>

      <div class="business-info">
        <div class="business-description">
          <h3>About this business</h3>
          <p>
            A cozy spot known for artisanal chocolates and seasonal treats. 
            While highly rated for quality, this establishment has been noted 
            for its inconsistent local entry policy during tourist surges.
          </p>
        </div>

        <div class="flagged-box">
          <h4>Community Report</h4>
          <p>This business has been reported by local residents for refusing entry or priority seating during high seasons.</p>
          <button class="report-btn">Submit updated info</button>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
/* Hero Header Adjustments */
.detail-hero {
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1rem;
}

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.stars { color: #00aa6c; font-size: 1.2rem; }
.rating-value { font-weight: bold; color: var(--text-primary); }
.review-count { color: var(--text-secondary); font-size: 0.9rem; }

/* Status Badge */
.status-badge {
  background: rgba(255, 71, 87, 0.2);
  color: #ff4757;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid #ff4757;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
}

/* Layout Grid */
.business-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .business-layout {
    grid-template-columns: 1.5fr 1fr; /* Image left, Info right */
  }
}

/* Image Box */
.biss-image {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 400px;
  border: 1px solid var(--border);
}

.biss-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: white;
  font-size: 0.8rem;
  backdrop-filter: blur(4px);
}

/* Info & Warning Box */
.business-description h3 {
  color: var(--accent);
  margin-bottom: 1rem;
}

.flagged-box {
  margin-top: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(255, 71, 87, 0.1) 0%, rgba(30, 41, 59, 0.4) 100%);
  border: 1px solid rgba(255, 71, 87, 0.3);
  border-radius: 12px;
}

.flagged-box h4 {
  color: #ff4757;
  margin-top: 0;
}

.report-btn {
  margin-top: 1rem;
  background: transparent;
  border: 1px solid var(--text-secondary);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.report-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}
</style>