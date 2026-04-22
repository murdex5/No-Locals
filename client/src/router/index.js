import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Business from '../components/Business.vue';
import About from '../components/About.vue';


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/business/:id',
        name: 'BUsiness',
        component: Business
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router