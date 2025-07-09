<script setup lang="ts">
import Header from './components/layout/AetherHeader.vue';
import Banner from './components/sections/AetherBanner.vue';
import AboutSection from './components/sections/AetherAbout.vue';
import SkillsSection from './components/sections/AetherSkills.vue';
import ExperienceSection from './components/sections/AetherExperience.vue';
import ProjectsSection from './components/sections/AetherProjects.vue';
import ContactSection from './components/sections/AetherContact.vue';
import Footer from './components/layout/AetherFooter.vue';
import { usePortfolioStore } from '@/stores/portfolio';

const portfolioStore = usePortfolioStore();
</script>

<template>
  <div class="aether-template">
    <div class="aether-gradient"></div>

    <Header />

    <div class="flex-1">
      <div v-if="!portfolioStore.isLoading">
        <Banner />
        <AboutSection />
        <ExperienceSection />
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
