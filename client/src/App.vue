<script setup>
import { ref } from 'vue'

const count = ref(0)

// You can also add functions easily here
const increment = () => {
  count.value++
}
</script>

<template>
  <header>
    <h1>No Locals</h1>
    <p>Businesses that value locals no matter the seasons</p>
  </header>

  <main>
    <section class="hero">
      <h2>Flagged Businesses</h2>
      <p>Search for Businesses that had or have "No Locals" policies.</p>
    </section>

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
  }

  h1 {
    color: #2c3e50;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    color: #42b983;
  }

  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}
</style>