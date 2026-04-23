<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
</script>

<template>
    <MainLayout>
      <!-- Hero -->
      <section class="about-hero">
        <div class="about-hero__content">
          <div class="about-badge">Our Mission</div>
          <h1 class="about-hero__title">Standing Up for <span class="text-yellow">Locals</span></h1>
          <p class="about-hero__text">
            We've all been there — turned away, overcharged, or ignored because the tourists were in town.
            <strong>NoLocals</strong> was built by a local, for locals: a community-powered directory to track which businesses
            truly stand by their community 365 days a year.
          </p>
        </div>
      </section>

      <!-- Problem Statement -->
      <section class="content-section">
        <div class="section-icon">🔄</div>
        <h2 class="section-title">The "Seasonal Friend" Cycle</h2>
        <div class="prose-card">
          <p>During the <strong>High Season</strong>, we can't get a table, our calls go unanswered, and the "locals' discount" mysteriously disappears. But the moment the tourists leave and the <strong>Off-Season</strong> hits, those same businesses come looking for our support to keep their lights on.</p>
          <p>We believe loyalty should be a two-way street — 365 days a year.</p>
        </div>
      </section>

      <!-- Features -->
      <section class="content-section">
        <div class="section-icon">⚡</div>
        <h2 class="section-title">How NoLocals Changes the Game</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-card__icon">📋</div>
            <h3 class="feature-card__title">The Year-Round List</h3>
            <p class="feature-card__text">A curated directory of businesses that have been flagged for their "No Locals" policies, even when the crowds are thick.</p>
          </div>
          <div class="feature-card">
            <div class="feature-card__icon">🔔</div>
            <h3 class="feature-card__title">Real-Time Alerts</h3>
            <p class="feature-card__text">Know which spots are currently employing "tourist-only" practices or charging seasonal surcharges before you leave the house.</p>
          </div>
          <div class="feature-card">
            <div class="feature-card__icon">🤝</div>
            <h3 class="feature-card__title">Community Voice</h3>
            <p class="feature-card__text">A space for us to share which businesses are ignoring the very community they rely on during the off-season.</p>
          </div>
        </div>
      </section>

      <!-- Bio -->
      <section class="content-section">
        <div class="section-icon">👤</div>
        <h2 class="section-title">Behind the Movement</h2>
        <div class="bio-card">
          <p>I'm a local just like you. I started <strong>NoLocals</strong> after being told there was "no room" at my favorite neighborhood pub, only to watch them seat a group of travelers five minutes later.</p>
          <p>I realized we needed a way to track who actually supports the people who live here year-round — not just when it's convenient.</p>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-section">
        <h2 class="cta-title">Done being the "backup plan"?</h2>
        <p class="cta-text">Help us build the ultimate local-first directory. Every report matters.</p>
        <div class="cta-actions">
          <router-link to="/post/business" class="cta-btn cta-btn--primary">⚠️ Submit a Report</router-link>
          <router-link to="/register" class="cta-btn cta-btn--secondary">Join the Community</router-link>
        </div>
      </section>
    </MainLayout>
</template>

<style scoped>
  /* ── About Hero ───────────────────────────────────── */
  .about-hero {
    background: linear-gradient(135deg, var(--dark) 0%, var(--dark-secondary) 100%);
    border-radius: var(--radius-lg);
    padding: 3rem 2.5rem;
    margin-bottom: 2.5rem;
    color: var(--white);
    position: relative;
    overflow: hidden;
  }

  .about-hero::after {
    content: '';
    position: absolute;
    bottom: -60px;
    left: -60px;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(168, 213, 186, 0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .about-hero__content {
    position: relative;
    z-index: 1;
    max-width: 640px;
  }

  .about-badge {
    display: inline-block;
    background: rgba(168, 213, 186, 0.2);
    color: var(--secondary);
    border: 1px solid rgba(168, 213, 186, 0.4);
    padding: 0.3rem 0.9rem;
    border-radius: 99px;
    font-size: 0.78rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .about-hero__title {
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    font-weight: 800;
    line-height: 1.2;
    margin: 0 0 1rem;
    color: var(--white);
  }

  .text-yellow { color: var(--primary); }

  .about-hero__text {
    margin: 0;
    color: rgba(255,255,255,0.72);
    font-size: 1rem;
    line-height: 1.75;
  }

  .about-hero__text strong {
    color: var(--white);
  }

  /* ── Content Sections ─────────────────────────────── */
  .content-section {
    margin-bottom: 2.5rem;
  }

  .section-icon {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }

  .section-title {
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 1.25rem;
  }

  /* ── Prose Card ───────────────────────────────────── */
  .prose-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-left: 4px solid var(--primary);
    border-radius: var(--radius-md);
    padding: 1.5rem 1.75rem;
    box-shadow: var(--shadow-sm);
  }

  .prose-card p {
    margin: 0 0 0.75rem;
    color: var(--text-secondary);
    line-height: 1.75;
    font-size: 0.95rem;
  }

  .prose-card p:last-child { margin-bottom: 0; }

  .prose-card strong { color: var(--text-primary); }

  /* ── Feature Grid ─────────────────────────────────── */
  .feature-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.1rem;
  }

  @media (min-width: 640px) {
    .feature-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .feature-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
    transition: box-shadow 0.2s, transform 0.15s;
  }

  .feature-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .feature-card__icon {
    font-size: 1.6rem;
    margin-bottom: 0.75rem;
  }

  .feature-card__title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 0.5rem;
  }

  .feature-card__text {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.875rem;
    line-height: 1.65;
  }

  /* ── Bio Card ─────────────────────────────────────── */
  .bio-card {
    background: linear-gradient(135deg, rgba(168, 213, 186, 0.1) 0%, rgba(168, 213, 186, 0.03) 100%);
    border: 1px solid rgba(168, 213, 186, 0.4);
    border-left: 4px solid var(--secondary-dark);
    border-radius: var(--radius-md);
    padding: 1.5rem 1.75rem;
  }

  .bio-card p {
    margin: 0 0 0.75rem;
    color: var(--text-secondary);
    line-height: 1.75;
    font-size: 0.95rem;
  }

  .bio-card p:last-child { margin-bottom: 0; }

  .bio-card strong { color: var(--text-primary); }

  /* ── CTA Section ──────────────────────────────────── */
  .cta-section {
    background: linear-gradient(135deg, var(--dark) 0%, var(--dark-secondary) 100%);
    border-radius: var(--radius-lg);
    padding: 3rem 2.5rem;
    text-align: center;
    color: var(--white);
  }

  .cta-title {
    font-size: clamp(1.4rem, 3vw, 2rem);
    font-weight: 800;
    margin: 0 0 0.75rem;
    color: var(--white);
  }

  .cta-text {
    margin: 0 0 2rem;
    color: rgba(255,255,255,0.65);
    font-size: 1rem;
  }

  .cta-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .cta-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.7rem 1.5rem;
    border-radius: var(--radius-sm);
    font-weight: 700;
    font-size: 0.9rem;
    text-decoration: none;
    transition: all 0.15s;
  }

  .cta-btn--primary {
    background: var(--primary);
    color: var(--dark);
  }

  .cta-btn--primary:hover {
    background: var(--primary-dark);
    transform: translateY(-1px);
  }

  .cta-btn--secondary {
    background: rgba(255,255,255,0.1);
    color: var(--white);
    border: 1px solid rgba(255,255,255,0.2);
  }

  .cta-btn--secondary:hover {
    background: rgba(255,255,255,0.18);
  }

  /* ── Mobile ───────────────────────────────────────── */
  @media (max-width: 520px) {
    .about-hero, .cta-section {
      padding: 2rem 1.25rem;
    }
  }
</style>
