<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

const router = useRouter();
const form = ref({ email: '', password: '' });
const error = ref(null);

async function login() {
    error.value = null;
    try {
        const res = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form.value)
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);

        router.push('/');
    } catch (err) {
        error.value = err.message;
    }
}
</script>

<template>
    <MainLayout>
        <div>
            <h2>Login</h2>
            <input v-model="form.email" placeholder="Email" type="email" />
            <input v-model="form.password" placeholder="Password" type="password" />
            <button @click="login">Login</button>
            <p v-if="error" style="color: red;">{{ error }}</p>
            <p>Don't have an account? <router-link to="/register">Register</router-link></p>
        </div>
    </MainLayout>
</template>