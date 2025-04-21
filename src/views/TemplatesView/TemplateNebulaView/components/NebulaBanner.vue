<script setup lang="ts">
import { usePortfolioStore } from '@/stores/portfolio';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const portfolioStore = usePortfolioStore();
const { data } = storeToRefs(portfolioStore);

onMounted(async () => {});
</script>
<template>
  <section
    id="banner"
    class="min-h-screen flex items-center dark-gradient text-white overflow-hidden"
  >
    <div class="container mx-auto px-4 text-center relative">
      <div v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0 }" :delay="200">
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400"
            >{{ data?.banner.title }}</span
          >
        </h1>
      </div>
      <div v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0 }" :delay="400">
        <p class="text-base sm:text-lg md:text-2xl text-gray-300 mb-6 sm:mb-8">
          {{ data?.banner.description }}
        </p>
      </div>
      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.8 }"
        :enter="{ opacity: 1, scale: 1 }"
        :delay="600"
      >
        <a href="#contact" class="btn-primary"> Get in Touch </a>
      </div>
      <div
        class="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1 }"
        :delay="800"
      >
        <svg class="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  </section>
</template>
