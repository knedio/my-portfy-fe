<script setup lang="ts">
import Loading from 'vue-loading-overlay';
import Header from './components/layout/LuminaHeader.vue';
import Banner from './components/sections/LuminaBanner.vue';
import AboutSection from './components/sections/LuminaAbout.vue';
import SkillsSection from './components/sections/LuminaSkills.vue';
import ProjectsSection from './components/sections/LuminaProjects.vue';
import ContactSection from './components/sections/LuminaContact.vue';
import Footer from './components/layout/LuminaFooter.vue';
import { usePortfolioStore } from '@/stores/portfolio';

const portfolioStore = usePortfolioStore();
</script>

<template>
  <div class="lumina-template">
    <div class="lumina-gradient"></div>

    <Header />

    <div class="flex-1">
      <Loading
        :active="portfolioStore.isLoading"
        loader="dots"
        :opacity="0.1"
        :is-full-page="false"
      />
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
