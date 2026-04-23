import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Business from '../components/Business/Business.vue';
import About from '../components/About.vue';
import PostBusiness from '../components/Business/PostBusiness.vue';
import User from '../components/User/User.vue';
import Register from '../components/User/Register.vue';
import Login from '../components/User/Login.vue';


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
        name: 'Business',
        component: Business
    },
    {
        path: '/post/business',
        name: 'PostBusiness',
        component: PostBusiness
    },
    {
        path: '/:username',
        name: 'User',
        component: User
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router