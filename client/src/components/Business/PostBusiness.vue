<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

const router = useRouter();
const name = ref('');
const category = ref('');
const location = ref('');
const description = ref('');
const rating = ref(0);
const imageFile = ref(null);

const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const apiPath = import.meta.env.VITE_API_PATH;

const handleFileUpload = (event) => {
  imageFile.value = event.target.files[0];
};

const submitBusiness = async (event) => {
    const token = localStorage.getItem('token');

    if (!token) {
        errorMessage.value = 'Please login first';
        return;
    }

    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('category', category.value);
    formData.append('location', location.value);
    formData.append('rating', rating.value);
    formData.append('description', description.value);
    formData.append('is_local_friendly', true);

    const imageInput = document.querySelector('#imageInput');
    if (imageInput?.files[0]) {
        formData.append('image', imageInput.files[0]);
    }

    isLoading.value = true;
    errorMessage.value = '';
    successMessage.value = '';

    try {
        const response = await fetch(`${apiPath}/businesses`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            successMessage.value = 'Business created successfully!';
            setTimeout(() => {
                router.push(`/businesses/${result.id}`);
            }, 1000);
        } else {
            errorMessage.value = result.error || 'Failed to create business';
        }
    } catch (err) {
        console.error("Network Error:", err);
        errorMessage.value = 'Network error. Please try again.';
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
  <MainLayout>
    <section class="add-business-section">
      <div class="add-business-container">
        <div class="form-header">
          <h1 class="form-title">Report a Business</h1>
          <p class="form-subtitle">Help your community by reporting discriminatory businesses</p>
        </div>

        <div class="form-box">
          <form @submit.prevent="submitBusiness">
            <!-- Business Name -->
            <div class="form-group">
              <label for="businessName" class="form-label">Business Name</label>
              <input 
                id="businessName"
                v-model="name" 
                type="text" 
                required 
                placeholder="e.g. Mario's Pizza"
                class="form-input"
              >
            </div>

            <!-- Category -->
            <div class="form-group">
              <label for="category" class="form-label">Category</label>
              <input 
                id="category"
                v-model="category" 
                type="text" 
                required 
                placeholder="e.g. Restaurant, Hotel"
                class="form-input"
              >
            </div>

            <!-- Location -->
            <div class="form-group">
              <label for="location" class="form-label">Location</label>
              <input 
                id="location"
                v-model="location" 
                type="text" 
                required 
                placeholder="City, Country"
                class="form-input"
              >
            </div>

            <!-- Rating -->
            <div class="form-group">
              <label for="rating" class="form-label">Rating (1-5)</label>
              <input 
                id="rating"
                v-model="rating" 
                type="number" 
                min="0" 
                max="5" 
                step="0.1"
                required 
                placeholder="4.5"
                class="form-input"
              >
            </div>

            <!-- Description -->
            <div class="form-group">
              <label for="description" class="form-label">Description</label>
              <textarea 
                id="description"
                v-model="description" 
                placeholder="Describe your experience with this business..."
                class="form-textarea"
                rows="5"
              ></textarea>
            </div>

            <!-- File Input for Image -->
            <div class="form-group">
              <label for="imageInput" class="form-label">Business Image</label>
              <div class="file-input-wrapper">
                <input 
                  id="imageInput"
                  type="file" 
                  @change="handleFileUpload" 
                  accept="image/*" 
                  class="file-input"
                >
                <span class="file-label">
                  {{ imageFile?.name || 'Choose image...' }}
                </span>
              </div>
            </div>

            <!-- Messages -->
            <div v-if="errorMessage" class="message error-message">
               {{ errorMessage }}
            </div>
            <div v-if="successMessage" class="message success-message">
               {{ successMessage }}
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              class="submit-btn" 
              :disabled="isLoading"
            >
              {{ isLoading ? 'Uploading...' : 'Report Business →' }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<style scoped>
.add-business-section {
  font-family: 'Inter', sans-serif;
  padding: 60px 80px;
  background-color: #ffffff;
}

.add-business-container {
  max-width: 700px;
  margin: 0 auto;
}

/* Header */
.form-header {
  text-align: center;
  margin-bottom: 48px;
  border-bottom: 3px solid #000000;
  padding-bottom: 24px;
}

.form-title {
  font-size: 2.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  margin-bottom: 12px;
}

.form-subtitle {
  font-size: 0.95rem;
  font-weight: 500;
  color: #666;
  letter-spacing: 0.02em;
}

/* Form Box */
.form-box {
  background-color: #ffffff;
  padding: 0;
}

/* Form Group */
.form-group {
  margin-bottom: 28px;
}

.form-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
  color: #000;
}

/* Inputs */
.form-input,
.form-textarea {
  width: 100%;
  padding: 12px 0;
  border: none;
  border-bottom: 2px solid #000000;
  background: transparent;
  font-size: 1rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  outline: none;
  transition: border-color 0.3s;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #cccccc;
}

.form-input:focus,
.form-textarea:focus {
  border-bottom-color: #000;
  background-color: #f9f9f9;
}

.form-textarea {
  resize: vertical;
  padding: 12px;
  border: 2px solid #000;
  border-radius: 4px;
}

/* File Input */
.file-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: 2px dashed #000;
  padding: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.file-input-wrapper:hover {
  background-color: #f9f9f9;
}

.file-input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.file-label {
  font-size: 0.95rem;
  color: #666;
  text-decoration: underline;
}

/* Messages */
.message {
  padding: 12px 16px;
  margin-bottom: 20px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9rem;
}

.error-message {
  background-color: #000;
  color: #facc15;
  border-left: 4px solid #facc15;
}

.success-message {
  background-color: #10b981;
  color: #ffffff;
  border-left: 4px solid #059669;
}

/* Submit Button */
.submit-btn {
  width: 100%;
  padding: 16px;
  background-color: #000000;
  color: #ffffff;
  border: none;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 16px;
  border-radius: 0;
  letter-spacing: 0.05em;
}

.submit-btn:hover:not(:disabled) {
  background-color: #333;
  transform: translateY(-2px);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Tablet (768px and below) */
@media (max-width: 768px) {
  .add-business-section {
    padding: 40px 24px;
  }

  .add-business-container {
    max-width: 100%;
  }

  .form-header {
    margin-bottom: 32px;
    padding-bottom: 16px;
  }

  .form-title {
    font-size: 1.75rem;
  }

  .form-subtitle {
    font-size: 0.9rem;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-label {
    font-size: 0.7rem;
  }

  .form-input,
  .form-textarea {
    font-size: 0.95rem;
  }
}

/* Mobile (480px and below) */
@media (max-width: 480px) {
  .add-business-section {
    padding: 24px 16px;
  }

  .form-header {
    margin-bottom: 24px;
    padding-bottom: 12px;
  }

  .form-title {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }

  .form-subtitle {
    font-size: 0.85rem;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-label {
    font-size: 0.65rem;
    margin-bottom: 6px;
  }

  .form-input,
  .form-textarea {
    padding: 10px 0;
    font-size: 0.9rem;
  }

  .file-input-wrapper {
    padding: 12px;
  }

  .submit-btn {
    padding: 14px;
    font-size: 0.9rem;
  }

  .message {
    font-size: 0.85rem;
    padding: 10px 12px;
  }
}
</style>