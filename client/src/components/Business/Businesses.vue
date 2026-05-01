<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { ref, onMounted } from 'vue';


const businesses = ref([]);
const loading = ref(true);
const serverError = ref(false);
const search = ref('');

onMounted(async () => {
    try {
        const bizzResponse = await fetch('/api/businesses');
        const bizzData = await bizzResponse.json();
        businesses.value = bizzData;
    } catch (error) {
        serverError.value = true;
    } finally {
        loading.value = true;
    }
});

</script>


<template>
    <MainLayout>
        <section class="feature-businesses">
            <div class="content-businesses">
                <h3 class="businesses-h3">Search for businesses</h3>
                <input v-model="search" type="search" placeholder="Business name" class="search-businesses">
                <button class="search-btn">Search</button>
            </div>
        </section>
        <section class="businesses-grid">
            <div class="businesses-list" v-for="bizz in businesses">
                <img :src="bizz.image_url" alt="Business Image" class="businesses-img">
                <router-link :to="'/businesses/ + bizz.id'" class="businesses-title">{{ bizz.name }}</router-link>
                <p class="businesses-description">{{ bizz.description  }}</p>
            </div>
        </section>
    </MainLayout>
</template>