<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

const router = useRouter();
const apiPath = import.meta.env.VITE_VITE_API_PATH;


const username = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
    try {
        errorMessage.value = '';

        if (!apiPath) {
            console.error("API Path is not defined! Check your .env and VITE_ prefix.");
        }

        const response = await fetch(`${apiPath}/users/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `Login Failed`);
        }
        console.log("Token received:", data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);

        router.push('/businesses');
    } catch (error) {
        errorMessage.value = error.message;
    }
};

</script>

<template>
    <MainLayout>
        <section class="login-container">
            <div class="login-box">
                <h2>Login</h2>
                
                <form @submit.prevent="handleLogin">
                    <div class="form-group">
                        <label>Username</label>
                        <input v-model="username" type="text" required placeholder="Enter username">
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input v-model="password" type="password" required placeholder="Enter password">
                    </div>

                    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

                    <button type="submit" class="login-btn">Sign In</button>
                </form>
            </div>
        </section>
    </MainLayout>
</template>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    padding: 50px;
}
.login-box {
    width: 300px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
}
.form-group { margin-bottom: 15px; }
input { width: 100%; padding: 8px; margin-top: 5px; }
.error { color: red; font-size: 0.8rem; }
.login-btn { width: 100%; cursor: pointer; }
</style>