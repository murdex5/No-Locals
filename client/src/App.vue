<script setup>
import { ref, onMounted } from 'vue';

const serverMessage = ref('Loading...');
const businesses = ref([]);

onMounted(async () => {
  try {
    // /api/test redirects to http://localhost:3000/test
    const response = await fetch('/api/test');
    const data = await response.json();
    serverMessage.value = data.message;

    // Businness
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

    <div class="body">
      <h4>Connection Status:</h4>
      <p>{{ serverMessage }}</p>
    </div>
    
    <footer>
      <p>&copy; 2026 No-Locals?</p>
    </footer>
  </main>
</template>

<style scoped>
  :global(:root) {
    
    --bg: #f8f9fa;
    --border: #e9ecef;
    --text: #2c3e50;
    --accent: #42b983;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    color: var(--text);
    font-family: sans-serif;
    line-height: 1.5;
    background: linear-gradient(180deg, var(--bg) 0%, transparent 60%);
  }

  :global(#app) {
    min-height: 100vh;
  }

  header {
    text-align: center;
    padding: 2.25rem 1.25rem;
    background-color: var(--bg);
    border-bottom: 2px solid var(--border);
    font-family: sans-serif;
  }

  header p {
    margin: 0.5rem auto 0;
    max-width: 56ch;
    color: var(--text);
  }

  h1 {
    font-family: sans-serif;
    color: var(--text);
    font-size: 2.25rem;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0;
  }

  h2 {
    font-family: sans-serif;
    color: var(--accent);
    margin: 0 0 0.5rem;
    font-size: 1.35rem;
  }

  main {
    font-family: sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 1.25rem;
    color: var(--text);
  }

  .hero {
    margin: 1.25rem 0;
    padding: 1.25rem;
    background-color: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    border-left: 4px solid var(--accent);
  }

  .hero p {
    margin: 0;
  }

  .business-list {
    margin: 1.25rem 0;
  }


  .business-list > div {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .business-card {
    padding: 1rem 1.1rem;
    border: 1px solid var(--border);
    border-radius: 12px;
    background-color: var(--bg);
    transition: border-color 140ms ease, transform 140ms ease;
  }

  .business-card:hover {
    border-color: var(--accent);
    transform: translateY(-1px);
  }

  .business-card h3 {
    margin: 0 0 0.35rem;
    font-size: 1.1rem;
    color: var(--text);
  }

  .business-card p {
    margin: 0;
  }

  .business-card strong {
    color: var(--accent);
    font-weight: 700;
  }

  .body {
    margin-top: 1.25rem;
    padding: 1rem 1.1rem;
    border: 1px solid var(--border);
    border-radius: 12px;
    background-color: var(--bg);
  }

  .body h4 {
    margin: 0 0 0.25rem;
    font-size: 1rem;
  }

  .body p {
    margin: 0;
  }

  footer {
    margin-top: 1.75rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
    text-align: center;
  }

  footer p {
    margin: 0;
    color: var(--text);
  }

  @media (max-width: 520px) {
    header {
      padding: 1.75rem 1rem;
    }

    h1 {
      font-size: 1.9rem;
    }

    main {
      padding: 1rem;
    }
  }

  @media (min-width: 720px) {
    .business-list > div {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }
  }
</style>