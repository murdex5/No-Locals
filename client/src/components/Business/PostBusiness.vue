<script setup>
import { ref } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';

const name = ref('');
const category = ref('');
const location = ref('');
const description = ref('');
const rating = ref(5); // Default rating
const imageFile = ref(null);

const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

// Capture the file when the user selects it
const handleFileUpload = (event) => {
  imageFile.value = event.target.files[0];
};
const submitBusiness = async (event) => {
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('category', category.value);
    formData.append('location', location.value);
    formData.append('rating', rating.value);
    formData.append('description', description.value);

    const imageFile = document.querySelector('#imageInput').files[0];
    if (imageFile) {
        formData.append('image', imageFile.value);
    }

    try {
        const response = await fetch('/api/businesses', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            console.log("Business created!", result);
        } else {
            console.error("Upload failed", result.error);
        }
    } catch (err) {
        console.error("Network Error:", err);
    };
}
</script>

<template>
  <MainLayout>
    <section class="add-business-container">
      <div class="form-box">
        <h2>Add New Business</h2>

        <form @submit.prevent="submitBusiness">
          <!-- Text Inputs -->
          <div class="form-group">
            <label>Business Name</label>
            <input v-model="name" type="text" required placeholder="e.g. Mario's Pizza">
          </div>

          <div class="form-group">
            <label>Category</label>
            <input v-model="category" type="text" required placeholder="e.g. Restaurant">
          </div>

          <div class="form-group">
            <label>Location</label>
            <input v-model="location" type="text" required placeholder="City, Street">
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea v-model="description" placeholder="Tell us about your business"></textarea>
          </div>

          <!-- File Input for Image -->
          <div class="form-group">
            <label>Business Image</label>
            <input type="file" @change="handleFileUpload" accept="image/*" class="file-input">
          </div>

          <!-- Feedback Messages -->
          <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
          <p v-if="successMessage" class="success-msg">{{ successMessage }}</p>

          <button type="submit" class="submit-btn" :disabled="isLoading">
            {{ isLoading ? 'Uploading...' : 'Create Business' }}
          </button>
        </form>
      </div>
    </section>
  </MainLayout>
</template>