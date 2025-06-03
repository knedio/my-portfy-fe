<script setup lang="ts">
import Header from './components/MistHeader.vue';
import Banner from './components/MistBanner.vue';
import About from './components/MistAbout.vue';
import Skills from './components/MistSkills.vue';
import Projects from './components/MistProjects.vue';
import Contact from './components/MistContact.vue';
import { usePortfolioStore } from '@/stores/portfolio';

const portfolioStore = usePortfolioStore();
</script>

<template>
  <div class="portfolio-container">
    <Header />

    <div class="flex-1">
      <div v-if="!portfolioStore.isLoading">
        <Banner />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </div>
    <footer v-if="!portfolioStore.isLoading" class="footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} | Designed with 💖</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* .portfolio-container {
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.portfolio-container.loaded {
  opacity: 1;
} */

.footer {
  padding: 2rem 0;
  text-align: center;
  background: linear-gradient(to bottom, rgba(108, 29, 152, 0.05), rgba(108, 29, 152, 0.2));
  color: #f5f5f7;
  font-size: 0.875rem;
  margin-top: 4rem;
}
</style>
