import Business from "@/components/Business/Business.vue";
import Home from "@/components/Home.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/businesses/:id',
        name: "Business",
        component: Business
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;