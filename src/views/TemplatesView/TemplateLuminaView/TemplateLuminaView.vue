<script setup lang="ts">
import Header from './components/layout/LuminaHeader.vue';
import Banner from './components/sections/LuminaBanner.vue';
import AboutSection from './components/sections/LuminaAbout.vue';
import SkillsSection from './components/sections/LuminaSkills.vue';
import ProjectsSection from './components/sections/LuminaProjects.vue';
import ContactSection from './components/sections/LuminaContact.vue';
import Footer from './components/layout/LuminaFooter.vue';
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
  <div class="lumina-template">
    <div class="lumina-gradient"></div>

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
