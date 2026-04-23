<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

const router = useRouter();

const form = ref({
    name: '',
    category: '',
    location: '',
    rating: '',
    image_url: '',
    description: ''
});

const submitting = ref(false);
const error = ref(null);

async function submitPlace() {
    error.value = null;
    submitting.value = true;
    try {
        const res = await fetch('http://localhost:3000/businesses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form.value)
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);
        router.push('/');
    } catch (err) {
        error.value = err.message;
    } finally {
        submitting.value = false;
    }
}
</script>

<template>
    <MainLayout>
      <div class="form-page">
        <!-- Page Header -->
        <div class="form-page__header">
          <div class="form-page__icon">⚠️</div>
          <div>
            <h1 class="form-page__title">Report a Business</h1>
            <p class="form-page__subtitle">Help your community by flagging businesses with "No Locals" policies.</p>
          </div>
        </div>

        <!-- Form Card -->
        <div class="form-card">
          <div class="form-card__body">
            <div class="field-group field-group--2">
              <div class="field">
                <label class="field__label">Business Name <span class="required">*</span></label>
                <input v-model="form.name" class="field__input" placeholder="e.g. The Seaside Restaurant" />
              </div>
              <div class="field">
                <label class="field__label">Category</label>
                <input v-model="form.category" class="field__input" placeholder="e.g. Restaurant, Hotel, Bar…" />
              </div>
            </div>

            <div class="field-group field-group--2">
              <div class="field">
                <label class="field__label">Location <span class="required">*</span></label>
                <input v-model="form.location" class="field__input" placeholder="City or address" />
              </div>
              <div class="field">
                <label class="field__label">Rating (1–5)</label>
                <input v-model="form.rating" class="field__input" placeholder="e.g. 2" type="number" min="1" max="5" />
              </div>
            </div>

            <div class="field">
              <label class="field__label">Image URL</label>
              <input v-model="form.image_url" class="field__input" placeholder="https://example.com/photo.jpg" />
            </div>

            <div class="field">
              <label class="field__label">Description <span class="required">*</span></label>
              <textarea
                v-model="form.description"
                class="field__input field__textarea"
                placeholder="Describe the 'No Locals' policy or incident…"
                rows="4"
              ></textarea>
            </div>

            <div v-if="error" class="form-error">
              ❌ {{ error }}
            </div>

            <div class="form-actions">
              <router-link to="/" class="btn-cancel">Cancel</router-link>
              <button @click="submitPlace" class="btn-submit" :disabled="submitting">
                <span v-if="submitting">Submitting…</span>
                <span v-else>Submit Report →</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Info Note -->
        <div class="info-note">
          <span>ℹ️</span>
          <p>All submissions are reviewed by the community. Providing accurate details helps other locals make informed decisions.</p>
        </div>
      </div>
    </MainLayout>
</template>

<style scoped>
  /* ── Page ─────────────────────────────────────────── */
  .form-page {
    max-width: 720px;
    margin: 0 auto;
  }

  .form-page__header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.75rem;
  }

  .form-page__icon {
    font-size: 2.25rem;
    line-height: 1;
    flex-shrink: 0;
  }

  .form-page__title {
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--text-primary);
    margin: 0 0 0.35rem;
  }

  .form-page__subtitle {
    margin: 0;
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  /* ── Card ─────────────────────────────────────────── */
  .form-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    margin-bottom: 1.25rem;
  }

  .form-card__body {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  /* ── Fields ───────────────────────────────────────── */
  .field-group {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: 1fr;
  }

  @media (min-width: 560px) {
    .field-group--2 {
      grid-template-columns: 1fr 1fr;
    }
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

  .field__textarea {
    resize: vertical;
    min-height: 100px;
  }

  /* ── Error ────────────────────────────────────────── */
  .form-error {
    padding: 0.75rem 1rem;
    background: rgba(252, 129, 129, 0.1);
    border: 1px solid rgba(252, 129, 129, 0.4);
    border-radius: var(--radius-sm);
    color: #c53030;
    font-size: 0.875rem;
  }

  /* ── Actions ──────────────────────────────────────── */
  .form-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.75rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border);
    margin-top: 0.25rem;
  }

  .btn-cancel {
    padding: 0.6rem 1.2rem;
    background: transparent;
    color: var(--text-secondary);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    transition: border-color 0.15s, color 0.15s;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
  }

  .btn-cancel:hover {
    border-color: var(--text-muted);
    color: var(--text-primary);
  }

  .btn-submit {
    padding: 0.6rem 1.5rem;
    background: var(--primary);
    color: var(--dark);
    border: none;
    border-radius: var(--radius-sm);
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
  }

  .btn-submit:hover:not(:disabled) {
    background: var(--primary-dark);
    transform: translateY(-1px);
  }

  .btn-submit:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  /* ── Info Note ────────────────────────────────────── */
  .info-note {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 0.9rem 1.1rem;
    background: var(--secondary-light);
    border: 1px solid rgba(168, 213, 186, 0.5);
    border-radius: var(--radius-sm);
    font-size: 0.825rem;
    color: var(--text-secondary);
  }

  .info-note span { font-size: 1rem; flex-shrink: 0; }

  .info-note p { margin: 0; }
</style>