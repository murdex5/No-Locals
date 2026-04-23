<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

const router = useRouter();

const form = ref({
    name: '',
    category: '',
    location: '',
    rating: '',
    image_url: '',
    description: ''
});

const response = ref(null);
const error = ref(null);

async function submitPlace() {
    console.log("submitPlace called", form.value);
    error.value = null;
    try {
        const res = await fetch('http://localhost:3000/businesses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form.value)
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);
        response.value = data;
        router.push('/');
    } catch (err) {
        error.value = err.message;
    }
}
</script>

<template>
    <MainLayout>
        <div>
            <input v-model="form.name" placeholder="Name" />
            <input v-model="form.category" placeholder="Category" />
            <input v-model="form.location" placeholder="Location" />
            <input v-model="form.rating" placeholder="Rating" type="number" />
            <input v-model="form.image_url" placeholder="Image URL" />
            <textarea v-model="form.description" placeholder="Description"></textarea>
            <button @click="submitPlace">Submit</button>
            <p v-if="error" style="color: red;">{{ error }}</p>
            <pre v-if="response">{{ response }}</pre>
        </div>
    </MainLayout>
</template>