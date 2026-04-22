<script setup>
</script>

<template>
  <RouterView />
</template>

<style scoped>
  :global(:root) {
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --bg-tertiary: #334155;
    --border: #475569;
    --text-primary: #f1f5f9;
    --text-secondary: #cbd5e1;
    --accent: #00d9ff;
    --accent-hover: #00f0ff;
    --success: #10b981;
    --warning: #f59e0b;
    --error: #ef4444;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    color: var(--text-primary);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    background: linear-gradient(135deg, var(--bg-primary) 0%, #1a2332 100%);
    letter-spacing: 0.3px;
  }

  :global(#app) {
    min-height: 100vh;
  }
</style>