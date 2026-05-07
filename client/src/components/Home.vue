<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
const apiPath = import.meta.env.VITE_API_PATH;
const businesses = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(`${apiPath}/businesses`);
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
          <router-link to="/businesses/submit" class="home-btn">
            Report a business
          </router-link>
        </div>

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
  padding: 40px 20px;
  display: flex;
  justify-content: center;
}

.content-home {
  display: flex;
  max-width: 1200px;
  gap: 40px;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
}

.home-text {
  flex: 1;
  min-width: 300px;
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
  transition: background-color 0.3s;
}

.home-btn:active {
  background-color: #333;
}

.home-image-container {
  flex: 1;
  min-width: 250px;
  display: flex;
  justify-content: center;
}

.img-home {
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: cover;
  display: block;
  border-radius: 8px;
}

/* Tablet (768px and below) */
@media (max-width: 768px) {
  .feature-home {
    padding: 30px 16px;
  }

  .content-home {
    gap: 24px;
  }

  .home-h3 {
    font-size: 32px;
    margin-bottom: 16px;
  }

  .home-p {
    font-size: 16px;
    margin-bottom: 24px;
  }

  .home-btn {
    padding: 12px 24px;
    font-size: 14px;
  }
}

/* Mobile (480px and below) */
@media (max-width: 480px) {
  .feature-home {
    padding: 20px 12px;
  }

  .content-home {
    gap: 16px;
    flex-direction: column;
  }

  .home-text {
    min-width: unset;
  }

  .home-h3 {
    font-size: 24px;
    margin-bottom: 12px;
  }

  .home-p {
    font-size: 14px;
    margin-bottom: 16px;
  }

  .home-btn {
    width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }

  .home-image-container {
    width: 100%;
    min-width: unset;
  }

  .img-home {
    max-width: 100%;
  }
}

</style>