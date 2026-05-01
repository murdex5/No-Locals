<script setup>
import MainLayout from '../layouts/MainLayout.vue'
</script>

<template>
  <MainLayout>
    <div class="minimal-about">
      <!-- Simple Hero -->
      <header class="hero-simple">
        <h1 class="title">Standing Up for <span class="accent">Locals</span></h1>
        <p class="subtitle">A community-powered directory tracking business loyalty 365 days a year.</p>
      </header>

      <div class="content-grid">
        <!-- Text Block -->
        <section class="text-block">
          <h2>The Mission</h2>
          <p>We've all been there, ignored or overcharged because the tourists were in town. NoLocals was built to bridge the gap between high-season profits and off-season reality.</p>
          <p>We believe local loyalty should be a two-way street.</p>
        </section>

        <!-- Feature List -->
        <section class="feature-list">
          <div class="mini-card">
            <span class="dot"></span>
            <h3>Year-Round Lists</h3>
            <p>Track businesses flagged for "No Locals" policies during peak seasons.</p>
          </div>
          <div class="mini-card">
            <span class="dot"></span>
            <h3>Real-Time Alerts</h3>
            <p>Immediate updates on tourist-only practices or surcharges.</p>
          </div>
          <div class="mini-card">
            <span class="dot"></span>
            <h3>Community Voice</h3>
            <p>A direct channel for locals to share their experiences.</p>
          </div>
        </section>
      </div>

      <!-- Minimal CTA -->
      <footer class="footer-cta">
        <router-link to="/post/business" class="link-btn">Submit a Report →</router-link>
        <router-link to="/register" class="link-btn secondary">Join Us</router-link>
      </footer>
    </div>
  </MainLayout>
</template>

<style scoped>


.minimal-about {
  max-width: 800px;
  margin: 0 auto;
  padding: 6rem 1.5rem;
  color: #000000; 
  background-color: #FFFFFF;
  font-family: 'Inter', sans-serif;
}

.accent { 
  color: #000000; 
  background-color: #facc15; 
  padding: 0 0.5rem;
}

/* Hero */
.hero-simple {
  margin-bottom: 5rem;
  border-bottom: 3px solid #000000; /* Thick black line */
  padding-bottom: 2rem;
}

.title {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  margin-bottom: 1rem;
  text-transform: uppercase;
  color: #000000;
}

.subtitle {
  font-size: 1.25rem;
  font-weight: 600;
  color: #000000;
}

/* Layout Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 5rem;
}

.text-block h2 {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #000000;
  margin-bottom: 2rem;
  font-weight: 800;
}

.text-block p {
  line-height: 1.6;
  color: #000000;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

/* Feature Items */
.feature-list {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.mini-card {
  position: relative;
  padding-left: 2rem;
}

.dot {
  position: absolute;
  left: 0;
  top: 0.4rem;
  width: 10px;
  height: 10px;
  background: #000000; 
}

.mini-card h3 {
  font-size: 1.1rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.mini-card p {
  font-size: 1rem;
  color: #000000;
  line-height: 1.4;
}

/* CTA */
.footer-cta {
  border-top: 3px solid #000000;
  padding-top: 3rem;
  display: flex;
  gap: 3rem;
}

.link-btn {
  font-size: 1.1rem;
  font-weight: 900;
  text-decoration: none;
  color: #000000;
  text-transform: uppercase;
  border-bottom: 2px solid transparent;
}

.link-btn:hover {
  border-bottom: 2px solid #000000;
}

.link-btn.secondary {
  background-color: #facc15;
  padding: 0.2rem 0.5rem;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  .title { font-size: 2.2rem; }
}
</style>