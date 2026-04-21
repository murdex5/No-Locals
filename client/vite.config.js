import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Any request starting with /api will be sent to Express
      '/api': {
        target: 'http://localhost:3000', 
        changeOrigin: true,
        // This removes /api from the start before sending to Express
        rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
})
