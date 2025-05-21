<script setup lang="ts">
import Header from './components/layout/OrionHeader.vue';
import Banner from './components/sections/OrionBanner.vue';
import AboutSection from './components/sections/OrionAbout.vue';
import SkillsSection from './components/sections/OrionSkills.vue';
import ProjectsSection from './components/sections/OrionProjects.vue';
import ContactSection from './components/sections/OrionContact.vue';
import Footer from './components/layout/OrionFooter.vue';
import { usePortfolioStore } from '@/stores/portfolio';
import { PortfolioDetails } from '@/models/portfolio.model';
import { onMounted, onUnmounted, watch } from 'vue';
import { getPortfolioDetails } from '@/services/portfolioService';

const portfolioStore = usePortfolioStore();

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
  }
});

onUnmounted(() => {
  portfolioStore.$reset();
});
</script>

<template>
  <div class="orion-template">
    <div class="orion-gradient"></div>

    <Header />

    <div>
      <Banner />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>

    <Footer />
  </div>
</template>

<style scoped lang="scss">
main {
  min-height: 100vh;
}
</style>
