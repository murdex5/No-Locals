import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Business from '../components/Business/Business.vue';
import About from '../components/About.vue';
import PostBusiness from '../components/Business/PostBusiness.vue';


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
    {
        path: '/post/business',
        name: PostBusiness,
        component: PostBusiness
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router