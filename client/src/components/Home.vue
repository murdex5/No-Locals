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
    <section class="flex justify-center px-10 py-10 font-sans">
      <div class="flex flex-wrap items-center gap-16 w-full max-w-6xl">

        <div class="flex-1 min-w-[300px] ">
          <h3 class="text-5xl font-bold leading-tight mb-6">
            Exposing Discriminatory Hospitality
          </h3>
          <p class="text-lg text-gray-500 mb-8 ">
            <strong>No Locals</strong> is a website that helps locals to point out
            restaurants, hotels or accommodations that do not serve locals.
          </p>
          <router-link
            to="/businesses/submit"
            class="bg-black text-white px-8 py-4 rounded-xl font-bold transition-colors duration-300 hover:bg-yellow-400 hover:text-black"
          >
            Report a business
          </router-link>
        </div>

        <div class="flex-1 min-w-[250px] flex justify-center overflow-hidden">
          <img
            src="https://res.cloudinary.com/dfeqksqvh/image/upload/v1777589936/IMG_0872_vwyw3z.jpg"
            alt="Hero Image"
            class="w-full max-w-[350px] h-auto object-cover rounded-lg"
          />
        </div>

      </div>
    </section>
  </MainLayout>
</template>