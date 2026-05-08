<script setup>
import {ref, onMounted} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const apiPath = import.meta.env.VITE_API_PATH;

const business = ref(null);
const loading = ref(null);

onMounted (async () => {
    try {
        const response = await fetch(`${apiPath}/businesses/${id}`);
        if (!response.ok) throw new Error(`Business not found`);
        business.value = await response.json();
        //console.log(business.value.image_url);
    } catch (error) {
        console.error("Error fetching businesses", error);
    } finally {
        loading.value = false;
    }
});

</script>

<template>
  <MainLayout>
    <div class="business-container">
      
      <!--State: Business Not Found (After loading is done) -->
      <div v-if="!business && !loading" class="flex flex-col items-center justify-center min-h-screen text-center">
          <h3 class="font-extrabold text-2xl mb-2">Business Not Found</h3>
          <p class="text-gray-500 mb-4">This listing may have been removed or the link is incorrect.</p>
          <router-link to="/" class="bg-black text-white py-4 px-5 rounded-xl font-bold hover:bg-yellow-400 hover:text-black transition-colors duration-300"">Back to listings</router-link>
      </div>

      <!-- State: Loading -->
      <div v-else-if="loading" class="flex felx-col items-center justify-center min-h-screen text-center">
        <p class="text-black font-extrabold text-2xl mb-2">Loading business details...</p>
      </div>

      <div v-else class="flex flex-col items-start">
        <section class="pt-10">
          <h1 class="font-bold text-5xl mb-5">{{ business.name }}</h1>
            <div class="grid grid-cols-2 gap-5 pb-5">
              <span class="location-tag">📍 {{ business.location }}</span>
              <span class="rating-tag">⭐ {{ business.rating }} Ratings</span>
            </div>
        </section>

        <!-- Main Content Grid -->
        <div class="business-grid">
          <div class="w-full max-w-3xl mx-auto">
            <div v-if="business.image_url" class="w-full h-[400px]">
            <img class="w-full h-full object-cover rounded-2xl"
                :src="business.image_url" 
                alt="Business Image" 
            >
            </div>
            <!-- Show the gray box if there is no image -->
            <div class="image-placeholder" v-else>
            <p>No image available</p>
            </div>
            <div class="policy-card">
              <p class="description">{{ business.description }}</p>
            </div>
          </div>

          <aside class="sidebar">
            <div class="review-summary">
              <h3>Other Reviews</h3>
              <div class="review-item">
                <p>"They asked for my passport even though I live down the street."</p>
                <span>- Local User</span>
              </div>
              <button class="add-review-btn">Write a Review</button>
            </div>
          </aside>
        </div>
      </div>

    </div>
  </MainLayout>
</template>

