<script setup>
import { onMounted, ref } from 'vue';

const isLoggedIn = ref(false);
const username = ref('');

onMounted(() => {
  const token = localStorage.getItem('token');
  const storedName = localStorage.getItem('username');
  if (token && storedName) {
    isLoggedIn.value = true;
    username.value = storedName;
  }
});

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  isLoggedIn.value = false;
  router.push('/login');
};

</script>

<template>
      <header class="home-header">
    <div class="logo">
      <router-link to="/"><img  src="https://res.cloudinary.com/dfeqksqvh/image/upload/v1777574904/No_Locals_1_lgu0n2.png" alt="No Locals Logo" class="home-logo"></router-link>
    </div>
    <div class="nav">
      <router-link to="/about" class="nav-link">About</router-link>
      <router-link to="/businesses" class="nav-link">Businesses</router-link>
      <div v-if="isLoggedIn" class="user-section">
        <span>Logged in as: <strong>{{  username }}</strong></span>
        <button @click="handleLogout">Logout</button>
      </div>
      <router-link v-else to="/login">Login</router-link>
    </div>
  </header>

  <main class="site-main">
      <slot />
    </main>

  <footer class="home-footer">
    <div class="footer-content">
      <div class="footer-brand">
        <router-link to="/"><img src="https://res.cloudinary.com/dfeqksqvh/image/upload/v1777574904/No_Locals_1_lgu0n2.png" alt="Logo" class="footer-logo"></router-link>
        <p>Exposing discriminatory practices in hospitality to ensure fair access for everyone.</p>
      </div>
      
      <div class="footer-links">
        <div class="link-group">
          <h4>Platform</h4>
          <p>Find Businesses</p>
          <p>Report an Incident</p>
          <p>Global Map</p>
        </div>
        <div class="link-group">
          <h4>Community</h4>
          <p>Resources</p>
          <p>Contribute</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 No Locals. All rights rights reserved.</p>
    </div>
  </footer>
</template>

<style>
/* Header styles */
.home-header {
  font-family: inter;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 80px;
}

.home-logo {
  height: 40px; 
  width: auto;
}

.nav {
  display: flex;
  gap: 32px;
}

.nav-link {
  color: black;
  text-decoration: none;
}

.site-main {
  position: relative; 
  width: 100%;
  max-width: 1200px; 
  margin: 0 auto;
  min-height: 80vh; 
}

/* Footer Styles */
.home-footer {
  background-color: #000; 
  color: #fff;
  padding: 80px 80px 40px 80px;
  margin-top: 100px;

}

.footer-content {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  gap: 40px;
}

.footer-brand {
  max-width: 300px;
}

.footer-logo {
  height: 30px;
  filter: brightness(0) invert(1); /* Turns a dark logo white */
  margin-bottom: 20px;
}

.footer-brand p {
  color: #aaa;
  font-size: 14px;
  line-height: 1.6;
}

.footer-links {
  display: flex;
  gap: 80px;
}

.link-group h4 {
  font-size: 16px;
  margin-bottom: 20px;
  font-weight: 600;
}

.link-group p {
  color: #aaa;
  font-size: 14px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.link-group p:hover {
  color: #fff;
}

.footer-bottom {
  max-width: 1200px;
  margin: 60px auto 0 auto;
  padding-top: 30px;
  border-top: 1px solid #333;
  text-align: center;
}

.footer-bottom p {
  color: #666;
  font-size: 12px;
}

/* Quick Responsive Adjustment */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }
  .footer-links {
    gap: 40px;
    flex-wrap: wrap;
  }
}
</style>