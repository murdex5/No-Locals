import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Business from '../components/Business.vue';


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/business',
        name: 'BUsiness',
        component: Business
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router