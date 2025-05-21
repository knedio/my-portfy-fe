<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import Header from './components/MistHeader.vue';
import Banner from './components/MistBanner.vue';
import About from './components/MistAbout.vue';
import Skills from './components/MistSkills.vue';
import Projects from './components/MistProjects.vue';
import Contact from './components/MistContact.vue';
import { usePortfolioStore } from '@/stores/portfolio';
import { PortfolioDetails } from '@/models/portfolio.model';
import { getPortfolioDetails } from '@/services/portfolioService';

const portfolioStore = usePortfolioStore();
const isLoaded = ref(false);

const props = defineProps<{
  data?: PortfolioDetails;
}>();

watch(
  () => props.data,
  (newData) => {
    if (newData) {
      portfolioStore.setPortfolio(newData);
    }
  },
  { immediate: true, deep: true }
);

const onGetDetails = async () => {
  portfolioStore.setLoading(true);
  const { data } = await getPortfolioDetails();

  portfolioStore.setPortfolio(data);
  portfolioStore.setLoading(false);
};

onMounted(async () => {
  if (!portfolioStore.data) {
    // if no prop and no existing data, fetch from API
    await onGetDetails();
    isLoaded.value = true;
  }
});

onUnmounted(() => {
  portfolioStore.$reset();
});
</script>

<template>
  <div class="portfolio-container" :class="{ loaded: isLoaded }">
    <Header />
    <div>
      <Banner />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
    <footer class="footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} | Designed with 💖</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.portfolio-container {
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.portfolio-container.loaded {
  opacity: 1;
}

.footer {
  padding: 2rem 0;
  text-align: center;
  background: linear-gradient(to bottom, rgba(108, 29, 152, 0.05), rgba(108, 29, 152, 0.2));
  color: #f5f5f7;
  font-size: 0.875rem;
  margin-top: 4rem;
}
</style>
