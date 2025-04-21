<script setup lang="ts">
import { usePortfolioStore } from '@/stores/portfolio';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const portfolioStore = usePortfolioStore();
const { data } = storeToRefs(portfolioStore);

onMounted(async () => {});
</script>
<template>
  <section id="about" class="section bg-gray-900 text-white">
    <div class="container">
      <h2 class="title">{{ data?.about.title }}</h2>
      <div class="max-w-3xl mx-auto">
        <div class="grid gap-12 md:grid-cols-2 items-center">
          <div
            v-motion
            :initial="{ opacity: 0, x: -100 }"
            :enter="{ opacity: 1, x: 0 }"
            class="space-y-6 sm:space-y-8"
          >
            <div
              class="text-lg text-gray-300 leading-relaxed"
              v-html="data?.about.description"
            ></div>

            <div class="flex space-x-4">
              <a href="#" class="btn-primary !px-6">Resume</a>
              <a
                href="#projects"
                class="btn-primary !px-6 !bg-transparent !from-transparent !to-transparent border-2 border-blue-500"
              >
                View Work
              </a>
            </div>
          </div>
          <div
            v-motion
            :initial="{ opacity: 0, x: 100 }"
            :enter="{ opacity: 1, x: 0 }"
            class="relative"
          >
            <div
              class="aspect-square rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-pink-500"
            >
              <img :src="data?.about.image" alt="Profile" class="rounded-full p-1 bg-gray-900" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
