<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

const router = useRouter();
const form = ref({ username: '', email: '', password: '' });
const error = ref(null);

async function register() {
    error.value = null;
    try {
        const res = await fetch('http://localhost:3000/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form.value)
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        router.push('/login');
    } catch (err) {
        console.log("Error Msg:", err);
        error.value = err.message;
    }
}
</script>

<template>
    <MainLayout>
        <div>
            <h2>Register</h2>
            <input v-model="form.username" placeholder="Username" />
            <input v-model="form.email" placeholder="Email" type="email" />
            <input v-model="form.password" placeholder="Password" type="password" />
            <button @click="register">Register</button>
            <p v-if="error" style="color: red;">{{ error }}</p>
        </div>
    </MainLayout>
</template>