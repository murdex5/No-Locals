<script setup>
import { ref, onMounted } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';

const businesses = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:3000/businesses`);
    const bizzData = await response.json();
    businesses.value = bizzData;
  } catch (error) {
    console.error(`Failed to get businesses`);

  }
});

</script>

<template>
  <MainLayout>
    <section class="feature-home">
      <div class="content-home">
        <div class="home-text">
          <h3 class="home-h3">
            Exposing Discriminatory Hospitality
          </h3>
          <p class="home-p">
            <strong>No Locals</strong> is a website that helps locals to point out restaurants, hotels or accommodations that do not serve locals.
          </p>
          <button class="home-btn">
            Report a business
          </button>
        </div>

        <!-- Moved image_d64695.png outside of home-text for side-by-side layout -->
        <div class="home-image-container">
          <img src="https://res.cloudinary.com/dfeqksqvh/image/upload/v1777589936/IMG_0872_vwyw3z.jpg" alt="Hero Image" class="img-home">
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<style scoped>

.feature-home {
  font-family: inter;
  padding: 80px;
  display: flex;
  justify-content: center;
}

.content-home {
  display: flex;
  max-width: 1200px;
  gap: 80px; 
  align-items: center;
}

.home-text {
  flex: 1;
}

.home-h3 {
  font-size: 48px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
}

.home-p {
  font-size: 18px;
  color: #666;
  margin-bottom: 32px;
}


.home-btn {
  background-color: #000;
  color: #fff;
  padding: 16px 32px;
  border-radius: 12px;
  border: none;
  font-weight: bold;
  cursor: pointer;
}


.home-image-container {
  flex: 1;
}

.img-home {
  width: 80%;
  height: 80%;
  object-fit: cover;
  display: block;
}
</style>