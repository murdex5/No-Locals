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
      <p>&copy; 2026 No-Locals</p>
    </footer>
  </main>
</template>

<style scoped>
  /* Scoped means these styles ONLY affect this file */
  header {
    text-align: center;
    padding: 2rem;
    background-color: #f8f9fa;
    border-bottom: 2px solid #e9ecef;
    font-family: sans-serif;
  }

  h1 {
    font-family: sans-serif;
    color: #2c3e50;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    font-family: sans-serif;
    color: #42b983;
  }

  main {
    font-family: sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}
</style>