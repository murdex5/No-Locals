<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

const router = useRouter();
const form = ref({ username: '', email: '', full_name: '', password: '' });
const error = ref(null);
const loading = ref(false);

async function register() {
    error.value = null;
    loading.value = true;
    try {
        const res = await fetch('http://localhost:3000/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form.value)
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        router.push('/login');
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <MainLayout>
      <div class="auth-page">
        <div class="auth-card">
          <!-- Header -->
          <div class="auth-card__header">
            <div class="auth-icon">✈️</div>
            <h1 class="auth-title">Join NoLocals</h1>
            <p class="auth-subtitle">Create your free account and help your community</p>
          </div>

          <!-- Form -->
          <div class="auth-card__body">
            <div class="field">
              <label class="field__label">Full Name</label>
              <input
                v-model="form.full_name"
                class="field__input"
                placeholder="Your full name"
                autocomplete="name"
              />
            </div>

            <div class="field">
              <label class="field__label">Username <span class="required">*</span></label>
              <input
                v-model="form.username"
                class="field__input"
                placeholder="Choose a username"
                autocomplete="username"
              />
            </div>

            <div class="field">
              <label class="field__label">Email <span class="required">*</span></label>
              <input
                v-model="form.email"
                class="field__input"
                type="email"
                placeholder="your@email.com"
                autocomplete="email"
              />
            </div>

            <div class="field">
              <label class="field__label">Password <span class="required">*</span></label>
              <input
                v-model="form.password"
                class="field__input"
                type="password"
                placeholder="Choose a strong password"
                autocomplete="new-password"
                @keydown.enter="register"
              />
            </div>

            <div v-if="error" class="auth-error">
              ❌ {{ error }}
            </div>

            <button @click="register" class="btn-auth" :disabled="loading">
              <span v-if="loading">Creating account…</span>
              <span v-else>Create Account →</span>
            </button>
          </div>

          <!-- Footer -->
          <div class="auth-card__footer">
            <p>Already have an account? <router-link to="/login" class="auth-link">Sign in</router-link></p>
          </div>
        </div>
      </div>
    </MainLayout>
</template>

<style scoped>
  .auth-page {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 2rem 0;
  }

  .auth-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    width: 100%;
    max-width: 440px;
    overflow: hidden;
  }

  .auth-card__header {
    background: linear-gradient(135deg, var(--dark) 0%, var(--dark-secondary) 100%);
    padding: 2rem;
    text-align: center;
    color: var(--white);
  }

  .auth-icon {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
  }

  .auth-title {
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0 0 0.4rem;
    color: var(--white);
  }

  .auth-subtitle {
    margin: 0;
    color: rgba(255,255,255,0.6);
    font-size: 0.875rem;
  }

  .auth-card__body {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .field__label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .required {
    color: #e53e3e;
    margin-left: 2px;
  }

  .field__input {
    padding: 0.65rem 0.9rem;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    font-size: 0.9rem;
    color: var(--text-primary);
    background: var(--off-white);
    transition: border-color 0.15s, box-shadow 0.15s;
    font-family: inherit;
    width: 100%;
  }

  .field__input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(244, 184, 96, 0.2);
    background: var(--white);
  }

  .field__input::placeholder {
    color: var(--text-muted);
  }

  .auth-error {
    padding: 0.7rem 0.9rem;
    background: rgba(252, 129, 129, 0.1);
    border: 1px solid rgba(252, 129, 129, 0.4);
    border-radius: var(--radius-sm);
    color: #c53030;
    font-size: 0.85rem;
  }

  .btn-auth {
    width: 100%;
    padding: 0.75rem;
    background: var(--primary);
    color: var(--dark);
    border: none;
    border-radius: var(--radius-sm);
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
    margin-top: 0.25rem;
  }

  .btn-auth:hover:not(:disabled) {
    background: var(--primary-dark);
    transform: translateY(-1px);
  }

  .btn-auth:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .auth-card__footer {
    padding: 1.25rem 2rem;
    border-top: 1px solid var(--border);
    text-align: center;
    background: var(--off-white);
  }

  .auth-card__footer p {
    margin: 0;
    font-size: 0.875rem;
    color: var(--text-muted);
  }

  .auth-link {
    color: var(--primary-dark);
    font-weight: 600;
    text-decoration: none;
  }

  .auth-link:hover { text-decoration: underline; }
</style>