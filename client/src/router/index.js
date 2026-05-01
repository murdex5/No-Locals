import About from "@/components/About.vue";
import Business from "@/components/Business/Business.vue";
import Businesses from "@/components/Business/Businesses.vue";
import PostBusiness from "@/components/Business/PostBusiness.vue";
import Home from "@/components/Home.vue";
import Login from "@/components/User/Login.vue";
import Register from "@/components/User/Register.vue";
import { createRouter, createWebHistory } from "vue-router";

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
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/businesses/:id',
        name: "Business",
        component: Business
    },
    {
        path: '/businesses',
        name: 'Businesses',
        component: Businesses
    },
    {
        path: '/businesses/submit',
        name: 'PostBusiness',
        component: PostBusiness
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;