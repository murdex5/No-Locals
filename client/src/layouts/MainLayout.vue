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
    <header>
      <div class="header-top">
        <router-link :to="'/'">
          <h1>No Locals?</h1>
        </router-link>
        <div class="user-section">
          <span v-if="isLoggedIn" class="username">👤 {{ username }}</span>
          <button v-if="isLoggedIn" @click="handleLogout" class="logout-btn">Logout</button>
          <router-link v-else to="/login" class="login-link">Login</router-link>
        </div>
      </div>
      <p>Help people find businesses that value locals no matter the seasons</p>
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <p>&copy; 2026 No-Locals?</p>
    </footer>
  </div>
</template>

<style scoped>
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  header {
    text-align: center;
    padding: 3rem 1.5rem;
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%);
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
  }

  header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% -20%, rgba(0, 217, 255, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }

  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
  }

  .user-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .username {
    color: var(--accent);
    font-weight: 600;
  }

  .logout-btn {
    padding: 0.5rem 1rem;
    background: var(--accent);
    color: var(--bg-primary);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: 0.3s;
  }

  .logout-btn:hover {
    background: var(--accent-hover);
  }

  .login-link {
    padding: 0.5rem 1rem;
    color: var(--accent);
    text-decoration: none;
    border: 1px solid var(--accent);
    border-radius: 6px;
    transition: 0.3s;
  }

  .login-link:hover {
    background: rgba(0, 217, 255, 0.1);
  }

  h1 {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: var(--text-primary);
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.03em;
    margin: 0;
    background: linear-gradient(135deg, var(--accent) 0%, #00a8cc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  header p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 1.05rem;
    position: relative;
    z-index: 1;
  }

  main {
    flex: 1;
    font-family: inherit;
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    color: var(--text-primary);
    width: 100%;
  }

  footer {
    margin-top: auto;
    padding: 1.5rem;
    border-top: 1px solid var(--border);
    text-align: center;
  }

  footer p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.9rem;
    letter-spacing: 0.02em;
  }

  @media (max-width: 520px) {
    header {
      padding: 1.5rem 1.25rem;
    }

    .header-top {
      flex-direction: column;
      gap: 1rem;
    }

    h1 {
      font-size: 2rem;
    }

    main {
      padding: 1.25rem;
    }
  }
</style>