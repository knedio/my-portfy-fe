<script setup lang="ts">
import Header from './components/layout/OrionHeader.vue';
import Banner from './components/sections/OrionBanner.vue';
import AboutSection from './components/sections/OrionAbout.vue';
import SkillsSection from './components/sections/OrionSkills.vue';
import ProjectsSection from './components/sections/OrionProjects.vue';
import ContactSection from './components/sections/OrionContact.vue';
import Footer from './components/layout/OrionFooter.vue';
import { usePortfolioStore } from '@/stores/portfolio';

const portfolioStore = usePortfolioStore();
</script>

<template>
  <div class="orion-template">
    <div class="orion-gradient"></div>
    <Header />

    <div class="flex-1">
      <div v-if="!portfolioStore.isLoading">
        <Banner />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </div>

    <Footer />
  </div>
</template>

<style scoped lang="scss">
main {
  min-height: 100vh;
}
</style>
