<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { ref, onMounted } from 'vue';

const apiPath = import.meta.env.VITE_API_PATH;

const businesses = ref([]);
const loading = ref(true);
const serverError = ref(false);
const search = ref('');

onMounted(async () => {
    //console.log('API Path:', apiPath);
    
    try {
        const url = `${apiPath}/businesses/`;
        //console.log('Fetching from:', url);
        
        const bizzResponse = await fetch(url);
        if (!bizzResponse.ok) {
            throw new Error(`HTTP error! status: ${bizzResponse.status}`);
        }
        const bizzData = await bizzResponse.json();
        businesses.value = bizzData;
    } catch (error) {
        console.error('Error fetching businesses:', error);
        serverError.value = false; 
    } finally {
        loading.value = false;
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

        <div v-if="loading" class="loader-container">
            <div class="loader"></div>
            <p>Loading Businesses...</p>
        </div>

        <div v-else-if="serverError" class="error-container">
            <p>❌ Error loading businesses. Please try again later.</p>
        </div>

        <section v-else class="businesses-grid">
            <div class="businesses-list" v-for="bizz in businesses" :key="bizz.id">
                <router-link :to="`/businesses/${bizz.id}`"><img :src="bizz.image_url" alt="Business Image" class="businesses-img"></router-link>
                <router-link :to="`/businesses/${bizz.id}`" class="businesses-title">{{ bizz.name }}</router-link>
                <p class="businesses-description">{{ bizz.description }}</p>
            </div>
        </section>
    </MainLayout>
</template>


<style scoped>

.businesses-grid {
    display: grid;
   
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    
    gap: 24px; 
    padding: 24px; 
    max-width: 1400px; 
    margin: 0 auto; 
}


.businesses-list {
    background-color: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden; 
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s; 
    

    display: flex;
    flex-direction: column;
}

.businesses-list:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
}

.businesses-img {
    width: 100%;
    height: 200px;
    object-fit: cover; 
}


.businesses-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a202c;
    text-decoration: none;
    padding: 16px 16px 8px 16px;
}

.businesses-title:hover {
    text-decoration: underline;
}

.businesses-description {
    font-size: 1rem;
    color: #4a5568;
    padding: 0 16px 16px 16px;
    margin: 0;
    flex-grow: 1; 
}
</style>