<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUser } from '../../composables/useUser';
import MainLayout from '@/layouts/MainLayout.vue';

const router = useRouter();
const { login } = useUser();
const form = ref({ username: '', password: '' });  // Changed from email to username
const error = ref(null);

async function handleLogin() {
    error.value = null;
    try {
        const res = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form.value)
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        
        login({ username: data.username}, data.token);
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
            <input v-model="form.username" placeholder="Username" />  <!-- Changed from email -->
            <input v-model="form.password" placeholder="Password" type="password" />
            <button @click="handleLogin">Login</button>
            <p v-if="error" style="color: red;">{{ error }}</p>
            <p>Don't have an account? <router-link to="/register">Register</router-link></p>
        </div>
    </MainLayout>
</template>