<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);
const username = ref('');
const mobileMenuOpen = ref(false);

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
  mobileMenuOpen.value = false;
  router.push('/login');
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

</script>

<template>
  <header class="home-header">
    <div class="logo">
      <router-link to="/" @click="mobileMenuOpen = false">
        <img src="https://res.cloudinary.com/dfeqksqvh/image/upload/v1777574904/No_Locals_1_lgu0n2.png" alt="No Locals Logo" class="home-logo">
      </router-link>
    </div>

    <!-- Mobile Menu Toggle -->
    <button class="mobile-menu-btn" @click="toggleMobileMenu" v-if="mobileMenuOpen">
      ✕
    </button>
    <button class="mobile-menu-btn" @click="toggleMobileMenu" v-else>
      ☰
    </button>

    <!-- Desktop Navigation -->
    <div class="nav nav-desktop">
      <router-link to="/about" class="nav-link">About</router-link>
      <router-link to="/businesses" class="nav-link">Businesses</router-link>
      <div v-if="isLoggedIn" class="user-section">
        <span>Logged in as: <strong>{{ username }}</strong></span>
        <button @click="handleLogout" class="logout-btn">Logout</button>
      </div>
      <router-link v-else to="/register" class="nav-link">Register</router-link>
    </div>

    <!-- Mobile Navigation -->
    <div v-if="mobileMenuOpen" class="nav nav-mobile">
      <router-link to="/about" class="nav-link" @click="mobileMenuOpen = false">About</router-link>
      <router-link to="/businesses" class="nav-link" @click="mobileMenuOpen = false">Businesses</router-link>
      <div v-if="isLoggedIn" class="user-section-mobile">
        <span>Logged in as: <strong>{{ username }}</strong></span>
        <button @click="handleLogout" class="logout-btn">Logout</button>
      </div>
      <router-link v-else to="/register" class="nav-link" @click="mobileMenuOpen = false">Register</router-link>
    </div>
  </header>

  <main class="site-main">
    <slot />
  </main>

  <footer class="home-footer">
    <div class="footer-content">
      <div class="footer-brand">
        <router-link to="/">
          <img src="https://res.cloudinary.com/dfeqksqvh/image/upload/v1777574904/No_Locals_1_lgu0n2.png" alt="Logo" class="footer-logo">
        </router-link>
        <p>Exposing discriminatory practices in hospitality to ensure fair access for everyone.</p>
      </div>
      
      <div class="footer-links">
        <div class="link-group">
          <h4>Platform</h4>
          <router-link to="/businesses">
            <p>Find Businesses</p>
          </router-link>
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
      <p>&copy; 2026 No Locals. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
/* Header styles */
.home-header {
  font-family: inter;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 80px;
  position: relative;
  background-color: #fff;
  border-bottom: 1px solid #e2e8f0;
}

.home-logo {
  height: 40px;
  width: auto;
}

.nav-desktop {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-mobile {
  display: none;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
}

.nav-link {
  color: black;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #666;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}

.logout-btn {
  background-color: #000;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #333;
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
  filter: brightness(0) invert(1);
  margin-bottom: 20px;
  width: auto;
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

/* Tablet (768px and below) */
@media (max-width: 768px) {
  .home-header {
    padding: 16px 20px;
  }

  .mobile-menu-btn {
    display: block;
  }

  .nav-desktop {
    display: none;
  }

  .nav-mobile {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: #fff;
    border-bottom: 1px solid #e2e8f0;
    padding: 16px 20px;
    gap: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .nav-link {
    padding: 8px 0;
  }

  .user-section-mobile {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px 0;
    border-top: 1px solid #e2e8f0;
  }

  .footer-content {
    flex-direction: column;
    gap: 32px;
  }

  .footer-links {
    gap: 40px;
    flex-wrap: wrap;
  }

  .home-footer {
    padding: 40px 20px 20px 20px;
    margin-top: 60px;
  }
}

/* Mobile (480px and below) */
@media (max-width: 480px) {
  .home-header {
    padding: 12px 16px;
  }

  .home-logo {
    height: 32px;
  }

  .mobile-menu-btn {
    font-size: 20px;
  }

  .nav-mobile {
    top: 50px;
    padding: 12px 16px;
    gap: 8px;
  }

  .user-section-mobile {
    padding: 8px 0;
    font-size: 12px;
  }

  .logout-btn {
    padding: 6px 12px;
    font-size: 12px;
  }

  .footer-brand {
    max-width: 100%;
  }

  .footer-logo {
    height: 24px;
  }

  .footer-brand p {
    font-size: 13px;
  }

  .footer-links {
    flex-direction: column;
    gap: 24px;
  }

  .link-group h4 {
    font-size: 14px;
    margin-bottom: 12px;
  }

  .link-group p {
    font-size: 13px;
    margin-bottom: 8px;
  }

  .footer-bottom {
    margin: 40px auto 0 auto;
    padding-top: 20px;
  }

  .footer-bottom p {
    font-size: 11px;
  }

  .home-footer {
    padding: 30px 16px 16px 16px;
    margin-top: 40px;
  }
}
</style>