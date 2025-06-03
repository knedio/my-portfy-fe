<script setup lang="ts">
import Header from './components/NebulaHeader.vue';
import Banner from './components/NebulaBanner.vue';
import About from './components/NebulaAbout.vue';
import Skills from './components/NebulaSkills.vue';
import Projects from './components/NebulaProjects.vue';
import Contact from './components/NebulaContact.vue';
import { usePortfolioStore } from '@/stores/portfolio';
import Loading from 'vue-loading-overlay';

const portfolioStore = usePortfolioStore();
</script>

<template>
  <div class="overflow-y-auto nebula-template flex flex-col">
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
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
