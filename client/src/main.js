import { createApp } from 'vue'
import App from './App.vue'

// If App is undefined here, the page stays blank
console.log('Vue is starting...', App); 

createApp(App).mount('#app')