<script setup lang="ts">
import { usePortfolioStore } from '@/stores/portfolio';
import { defineComponent, h } from 'vue';
import { storeToRefs } from 'pinia';

const portfolioStore = usePortfolioStore();
const { data } = storeToRefs(portfolioStore);

const IconComponent = (d: string) =>
  defineComponent({
    name: 'CustomIcon',
    render() {
      return h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          fill: 'none',
          viewBox: '0 0 24 24',
          stroke: 'currentColor',
          class: 'w-full h-full',
        },
        [
          h('path', {
            d,
            stroke: 'currentColor',
            'stroke-width': 2,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
          }),
        ]
      );
    },
  });
</script>
<template>
  <section id="skills" class="section bg-gray-800">
    <div class="container">
      <h2 class="title">Skills & Expertise</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(skill, index) in data?.skills"
          :key="skill.name"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="index * 100"
          class="skill-card bg-gray-900/50 text-white"
        >
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 text-blue-400">
              <component :is="IconComponent(skill.icon)" />
            </div>
            <h3 class="text-base sm:text-lg font-semibold">{{ skill.name }}</h3>
            <div class="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div
                class="bg-gradient-to-r from-blue-500 to-violet-500 h-2 rounded-full transition-all duration-1000"
                :style="{ width: `${(parseFloat(skill.level) ?? 0) * 10}%` }"
              ></div>
            </div>
            <p class="text-gray-400 text-sm">{{ skill.experience }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
