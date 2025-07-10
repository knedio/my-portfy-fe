<script setup lang="ts">
import { usePortfolioStore } from '@/stores/portfolio';
import { storeToRefs } from 'pinia';

const portfolioStore = usePortfolioStore();
const { data } = storeToRefs(portfolioStore);
</script>
<template>
  <section id="experience" class="experience">
    <div class="container">
      <h2 class="section-heading">Professional Experience</h2>

      <div class="experiences-grid grid grid-cols-2 gap-4 sm:grid-cols-1">
        <div
          v-for="(exp, index) in data?.experiences"
          :key="exp.position + exp.company"
          class="experience-card glass-card"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 300, delay: index * 50 } }"
        >
          <h3 class="text-lg font-semibold mb-1 text-foreground">
            {{ exp.position }}
          </h3>
          <p class="text-sm text-muted-foreground mb-0">
            {{ exp.company }}
          </p>
          <p class="text-xs italic text-muted-foreground mb-2">
            <span>{{ exp.duration }}</span>
          </p>
          <ul class="experience-list text-sm">
            <li v-for="(desc, i) in exp.description" :key="i">{{ desc }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.experience-card {
  padding: var(--space-4);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;

  ul.experience-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: var(--space-1) 0;
      color: var(--aether-text-secondary);
      position: relative;
      padding-left: var(--space-3);

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 6px;
        height: 6px;
        background-color: var(--aether-accent);
        border-radius: 50%;
      }
    }
  }
}
</style>
