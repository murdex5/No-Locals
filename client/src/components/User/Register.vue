<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

const router = useRouter();
const form = ref({ username: '', email: '', full_name: '', password: ''});
const error = ref(null);
const loading = ref(null);

async function register() {
   error.value = null;
   loading.value = true;
   
   try {
    const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form.value)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    router.push('/login');
   } catch (err) {
    error.value = err.message;
   } finally {
    loading.value = false;
   }
};


</script>

<template>
    <MainLayout>
        <p>Login</p>
    </MainLayout>
</template>