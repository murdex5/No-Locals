<script setup>
import { useUser } from '@/composables/useUser';
import { useRouter } from 'vue-router';

const { isLoggedIn, username, logout } = useUser();
const router = useRouter();

const handleLogout = () => {
  logout();
  router.push('/');
};
</script>

<template>
  <div class="layout">
    <header class="site-header">
      <div class="header-inner">
        <router-link to="/" class="logo">
          <span class="logo-icon">🗺️</span>
          <span class="logo-text">No<span class="logo-accent">Locals</span></span>
        </router-link>

        <nav class="main-nav">
          <router-link to="/" class="nav-link">Explore</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
          <router-link to="/post/business" class="nav-link nav-link--cta">+ Report Business</router-link>
        </nav>

        <div class="user-section">
          <template v-if="isLoggedIn">
            <span class="username">👤 {{ username }}</span>
            <button @click="handleLogout" class="btn btn--outline btn--sm">Log out</button>
          </template>
          <template v-else>
            <router-link to="/login" class="btn btn--ghost btn--sm">Sign in</router-link>
            <router-link to="/register" class="btn btn--primary btn--sm">Join free</router-link>
          </template>
        </div>
      </div>
    </header>

    <main class="site-main">
      <slot />
    </main>

    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="logo-icon">🗺️</span>
          <span class="footer-name">NoLocals</span>
          <p class="footer-tagline">Empowering locals, one review at a time.</p>
        </div>
        <div class="footer-links">
          <router-link to="/" class="footer-link">Home</router-link>
          <router-link to="/about" class="footer-link">About</router-link>
          <router-link to="/post/business" class="footer-link">Report Business</router-link>
        </div>
        <p class="footer-copy">&copy; 2026 No-Locals. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
  /* ── Layout Shell ─────────────────────────────────── */
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* ── Header ───────────────────────────────────────── */
  .site-header {
    background: var(--white);
    border-bottom: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 64px;
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  /* ── Logo ─────────────────────────────────────────── */
  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    flex-shrink: 0;
  }

  .logo-icon {
    font-size: 1.4rem;
  }

  .logo-accent {
    color: var(--primary);
  }

  /* ── Nav ──────────────────────────────────────────── */
  .main-nav {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    flex: 1;
  }

  .nav-link {
    padding: 0.4rem 0.75rem;
    border-radius: var(--radius-sm);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-secondary);
    transition: color 0.15s, background 0.15s;
  }

  .nav-link:hover {
    color: var(--text-primary);
    background: var(--light-gray);
  }

  .nav-link.router-link-active {
    color: var(--primary-dark);
    background: var(--primary-light);
  }

  .nav-link--cta {
    color: var(--primary-dark);
    background: var(--primary-light);
    font-weight: 600;
    margin-left: 0.5rem;
  }

  .nav-link--cta:hover {
    background: var(--primary);
    color: var(--white);
  }

  /* ── User Section ─────────────────────────────────── */
  .user-section {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
  }

  .username {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-secondary);
  }

  /* ── Buttons ──────────────────────────────────────── */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.15s ease;
  }

  .btn--sm {
    padding: 0.35rem 0.9rem;
    font-size: 0.875rem;
  }

  .btn--primary {
    background: var(--primary);
    color: var(--dark);
    border-color: var(--primary);
  }

  .btn--primary:hover {
    background: var(--primary-dark);
    border-color: var(--primary-dark);
  }

  .btn--outline {
    background: transparent;
    color: var(--text-secondary);
    border-color: var(--border);
  }

  .btn--outline:hover {
    border-color: var(--primary);
    color: var(--primary-dark);
  }

  .btn--ghost {
    background: transparent;
    color: var(--text-secondary);
  }

  .btn--ghost:hover {
    color: var(--text-primary);
    background: var(--light-gray);
  }

  /* ── Main ─────────────────────────────────────────── */
  .site-main {
    flex: 1;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  /* ── Footer ───────────────────────────────────────── */
  .site-footer {
    background: var(--dark);
    color: var(--white);
    margin-top: auto;
  }

  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    text-align: center;
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
  }

  .footer-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--primary);
  }

  .footer-tagline {
    margin: 0;
    color: rgba(255,255,255,0.5);
    font-size: 0.875rem;
  }

  .footer-links {
    display: flex;
    gap: 1.5rem;
  }

  .footer-link {
    color: rgba(255,255,255,0.65);
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.15s;
  }

  .footer-link:hover {
    color: var(--primary);
  }

  .footer-copy {
    margin: 0;
    color: rgba(255,255,255,0.35);
    font-size: 0.8rem;
  }

  /* ── Mobile ───────────────────────────────────────── */
  @media (max-width: 640px) {
    .main-nav {
      display: none;
    }

    .header-inner {
      justify-content: space-between;
    }

    .site-main {
      padding: 1.25rem;
    }
  }
</style>