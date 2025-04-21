<script setup lang="ts">
import { Project } from '@/models/portfolio.model';
import { usePortfolioStore } from '@/stores/portfolio';
import { storeToRefs } from 'pinia';

const portfolioStore = usePortfolioStore();
const { data } = storeToRefs(portfolioStore);

const onGetTechs = (value: Project) => {
  return value.tech ? value.tech.split(',') : [];
};
</script>
<template>
  <section id="projects" class="section bg-gray-900 text-white">
    <div class="container">
      <h2 class="title">Featured Projects</h2>
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(project, index) in data?.projects"
          :key="project.title"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="index * 200"
          class="project-card bg-gray-800 border-gray-700"
        >
          <div class="relative overflow-hidden group">
            <img
              :src="project.image"
              :alt="project.title"
              class="full h-40 sm:h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
            >
              <div class="p-4">
                <a
                  :href="project.link ?? ''"
                  target="_blank"
                  class="text-sm text-blue-400 hover:text-blue-300"
                  >View Project →</a
                >
              </div>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">{{ project.title }}</h3>
            <p class="text-gray-400 mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="row in onGetTechs(project)"
                :key="row"
                class="px-3 py-1 bg-blue-900/50 text-blue-300 text-sm rounded-full"
              >
                {{ row }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
