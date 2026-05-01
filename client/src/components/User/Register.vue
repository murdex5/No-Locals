<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue'; // Updated path for reliability

const router = useRouter();
const form = ref({ username: '', email: '', full_name: '', password: ''});
const error = ref(null);
const loading = ref(false);

async function register() {
   error.value = null;
   loading.value = true;
   
   try {
    const res = await fetch('/api/users/register', { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form.value)
    });

    // 1. Check if the response is empty first
    const text = await res.text(); 
    const data = text ? JSON.parse(text) : {}; 

    if (!res.ok) {
        throw new Error(data.error || `Server Error: ${res.status}`);
    }

    router.push('/login');
   } catch (err) {
    error.value = err.message;
   } finally {
    loading.value = false;
   }
};

</script>

<template>
    <MainLayout>
      <div class="auth-page">
        <div class="auth-card">
          <!-- Header -->
          <div class="auth-header">
            <h1 class="auth-title">Join <span class="highlight">NoLocals</span></h1>
            <p class="auth-subtitle">CREATE AN ACCOUNT TO REPORT BUSINESSES IN YOUR COMMUNITY.</p>
          </div>

          <!-- Form -->
          <div class="auth-body">
            <div class="field">
              <label>FULL NAME</label>
              <input v-model="form.full_name" type="text" placeholder="REQUIRED" />
            </div>

            <div class="field">
              <label>USERNAME</label>
              <input v-model="form.username" type="text" placeholder="REQUIRED" />
            </div>

            <div class="field">
              <label>EMAIL</label>
              <input v-model="form.email" type="email" placeholder="YOUR@EMAIL.COM" />
            </div>

            <div class="field">
              <label>PASSWORD</label>
              <input v-model="form.password" type="password" placeholder="MIN 8 CHARACTERS" @keydown.enter="register" />
            </div>

            <div v-if="error" class="error-box">
              ERROR: {{ error.toUpperCase() }}
            </div>

            <button @click="register" class="btn-black" :disabled="loading">
              <span v-if="loading">PROCESSING...</span>
              <span v-else>CREATE ACCOUNT →</span>
            </button>
          </div>

          <!-- Footer -->
          <div class="auth-footer">
            <p>ALREADY HAVE AN ACCOUNT? <router-link to="/login" class="link">SIGN IN</router-link></p>
          </div>
        </div>
      </div>
    </MainLayout>
</template>

<style scoped>
/* PURE BLACK AND WHITE MINIMALISM */
.auth-page {
  display: flex;
  justify-content: center;
  padding: 4rem 1rem;
  background-color: #FFFFFF;
  color: #000000;
  font-family: 'Inter', sans-serif;
}

.auth-card {
  width: 100%;
  max-width: 450px;
}

/* Header */
.auth-header {
  border-bottom: 3px solid #000000;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
}

.auth-title {
  font-size: 2.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  margin-bottom: 0.5rem;
}

.highlight {
  background-color: #facc15;
  padding: 0 0.4rem;
}

.auth-subtitle {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

/* Form Fields */
.field {
  margin-bottom: 1.5rem;
}

.field label {
  display: block;
  font-size: 0.75rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
}

.field input {
  width: 100%;
  padding: 0.75rem 0;
  border: none;
  border-bottom: 2px solid #000000;
  background: transparent;
  font-size: 1rem;
  font-weight: 600;
  outline: none;
  border-radius: 0;
}

.field input::placeholder {
  color: #cccccc; /* Subtle placeholder but text stays black */
}

/* Error Box */
.error-box {
  background-color: #000000;
  color: #facc15;
  padding: 1rem;
  font-weight: 900;
  font-size: 0.8rem;
  margin-bottom: 1.5rem;
}

/* Button */
.btn-black {
  width: 100%;
  padding: 1rem;
  background-color: #000000;
  color: #FFFFFF;
  border: none;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.1s;
}

.btn-black:active {
  transform: scale(0.98);
}

.btn-black:disabled {
  opacity: 0.5;
}

/* Footer */
.auth-footer {
  margin-top: 2rem;
  font-size: 0.8rem;
  font-weight: 700;
}

.link {
  color: #000000;
  text-decoration: underline;
  text-underline-offset: 4px;
}
</style>