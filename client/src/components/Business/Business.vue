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
      <div v-if="!business && !loading">
          <span>🔍</span>
          <h3>Business Not Found</h3>
          <p>This listing may have been removed or the link is incorrect.</p>
          <router-link to="/" class="back-link">← Back to listings</router-link>
      </div>

      <!-- State: Loading -->
      <div v-else-if="loading">
          <p>Loading business details...</p>
      </div>

      <div v-else>
        <!-- Header Section -->
        <section class="business-hero">
          <div class="hero-content">
            <h1 class="biz-name">{{ business.name }}</h1>
            <div class="biz-meta">
              <span class="location-tag">📍 {{ business.location }}</span>
              <span class="rating-tag">⭐ {{ business.rating }} Ratings</span>
            </div>
          </div>
        </section>

        <!-- Main Content Grid -->
        <div class="business-grid">
          <div class="main-info">
            <div class="image-placeholder" v-if="business.image_url">
            <img 
                :src="business.image_url" 
                alt="Business Image" 
                class="biz-image"
            >
            </div>
            <!-- Show the gray box if there is no image -->
            <div class="image-placeholder" v-else>
            <p>No image available</p>
            </div>
            <div class="policy-card">
              <h3>No Locals Policy</h3>
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

<style scoped>
.business-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Inter', sans-serif;
}

/* Hero Styling */
.business-hero {
  border-bottom: 1px solid #eee;
  padding-bottom: 30px;
  margin-bottom: 40px;
}

.biz-name {
  font-size: 3.5rem;
  font-weight: 900;
  letter-spacing: -2px;
  margin: 0;
}

.biz-meta {
  display: flex;
  gap: 20px;
  margin-top: 10px;
  color: #666;
}

/* Grid Layout */
.business-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 40px;
}

/* Left Side */
.image-placeholder {
  width: 100%;
  height: 400px; 
  border-radius: 20px;
  overflow: hidden; 
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  margin-bottom: 30px;
  background-color: #f0f0f0;
}

.biz-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.policy-card {
  background: #f9f9f9;
  padding: 30px;
  border-radius: 16px;
}

.policy-card h3 {
  margin-top: 0;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1px;
  color: #ff4444; /* Highlighting the policy */
}

.description {
  line-height: 1.7;
  color: #333;
}

/* Sidebar */
.review-summary {
  background: #fff;
  border: 1px solid #eee;
  padding: 24px;
  border-radius: 16px;
  position: sticky;
  top: 20px;
}

.review-item {
  font-style: italic;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.add-review-btn {
  width: 100%;
  margin-top: 20px;
  padding: 14px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .business-grid {
    grid-template-columns: 1fr;
  }
  .biz-name {
    font-size: 2.5rem;
  }
}
</style>