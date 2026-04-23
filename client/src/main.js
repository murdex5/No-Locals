import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useUser } from './composables/useUser'

const app = createApp(App)


const { initializeUser } = useUser();
initializeUser();

app.use(router)
app.mount('#app')