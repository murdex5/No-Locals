<script setup>
</script>

<template>
  <RouterView />
</template>

<style scoped>
  :global(:root) {
    --primary: #F4B860;
    --primary-dark: #E09B3D;
    --primary-light: #FDE8C0;
    --secondary: #A8D5BA;
    --secondary-dark: #72BB95;
    --secondary-light: #D4EDE0;
    --white: #FFFFFF;
    --off-white: #F8F9FA;
    --light-gray: #F1F3F5;
    --border: #E2E8F0;
    --dark: #1A202C;
    --dark-secondary: #2D3748;
    --text-primary: #1A202C;
    --text-secondary: #4A5568;
    --text-muted: #718096;
    --success: #48BB78;
    --warning: #F4B860;
    --error: #FC8181;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
    --shadow-md: 0 4px 16px rgba(0,0,0,0.1);
    --shadow-lg: 0 8px 32px rgba(0,0,0,0.15);
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    color: var(--text-primary);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    background-color: var(--off-white);
    letter-spacing: 0.2px;
  }

  :global(#app) {
    min-height: 100vh;
  }
</style>