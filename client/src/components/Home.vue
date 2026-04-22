<script setup>
import { ref, onMounted } from 'vue';

const serverMessage = ref('Loading...');
const businesses = ref([]);

onMounted(async () => {
  try {
    const bizzResponse = await fetch('/api/businesses');
    const bizzData = await bizzResponse.json();
    businesses.value = bizzData;
    
  } catch (error) {
    serverMessage.value = "Server is offline ❌";
  }
})
</script>

<template>
  <header>
    <h1>No Locals?</h1>
    <p>Help people find businesses that value locals no matter the seasons</p>
  </header>

  <main>
    <section class="hero">
      <h2>Flagged Businesses</h2>
      <p>Search for Businesses that had or have "No Locals" policies.</p>
    </section>

    <section class="business-list">
      <div v-if="businesses.length > 0">
        <div v-for="biz in businesses" :key="biz.id" class="business-card">
          <h3>{{ biz.name }}</h3>
          <p><strong>Category:</strong> {{ biz.category }}</p>
        </div>
      </div>
      <p v-else-if="serverMessage !== 'Server is offline ❌'">Searching for records...</p>
    </section>
    
    <footer>
      <p>&copy; 2026 No-Locals?</p>
    </footer>
  </main>
</template>

<style scoped>
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

  header h1,
  header p {
    position: relative;
    z-index: 1;
  }

  header p {
    margin: 0.75rem auto 0;
    max-width: 56ch;
    color: var(--text-secondary);
    font-size: 1.05rem;
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

  h2 {
    font-family: inherit;
    color: var(--accent);
    margin: 0 0 0.75rem;
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  main {
    font-family: inherit;
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    color: var(--text-primary);
  }

  .hero {
    margin: 0 0 2rem;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(51, 65, 85, 0.3) 100%);
    border: 1px solid var(--border);
    border-radius: 16px;
    border-left: 4px solid var(--accent);
    backdrop-filter: blur(8px);
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 217, 255, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero p {
    margin: 0;
    color: var(--text-secondary);
    position: relative;
    z-index: 1;
  }

  .business-list {
    margin: 2rem 0;
  }

  .business-list > div {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .business-card {
    padding: 1.5rem;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(51, 65, 85, 0.4) 100%);
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(4px);
    position: relative;
    overflow: hidden;
  }

  .business-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 217, 255, 0) 0%, rgba(0, 217, 255, 0.05) 100%);
    opacity: 0;
    transition: opacity 200ms ease;
  }

  .business-card:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%);
    box-shadow: 0 8px 32px rgba(0, 217, 255, 0.1);
  }

  .business-card:hover::before {
    opacity: 1;
  }

  .business-card h3 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-primary);
    position: relative;
    z-index: 1;
  }

  .business-card p {
    margin: 0;
    color: var(--text-secondary);
    position: relative;
    z-index: 1;
    font-size: 0.95rem;
  }

  .business-card strong {
    color: var(--accent);
    font-weight: 600;
  }

  .status-box {
    margin: 2rem 0 0;
    padding: 1.5rem;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(51, 65, 85, 0.4) 100%);
    backdrop-filter: blur(4px);
  }

  .status-box h4 {
    margin: 0 0 0.5rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .status-box p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 1rem;
  }

  footer {
    margin-top: 3rem;
    padding-top: 1.5rem;
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
      padding: 2rem 1.25rem;
    }

    h1 {
      font-size: 2rem;
    }

    main {
      padding: 1.25rem;
    }

    .hero {
      padding: 1.5rem;
    }

    .business-card {
      padding: 1.25rem;
    }
  }

  @media (min-width: 720px) {
    .business-list > div {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.25rem;
    }
  }

  @media (min-width: 1024px) {
    .business-list > div {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
</style>