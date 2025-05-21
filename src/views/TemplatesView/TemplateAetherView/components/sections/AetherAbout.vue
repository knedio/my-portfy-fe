<script setup lang="ts">
import { usePortfolioStore } from '@/stores/portfolio';
import { storeToRefs } from 'pinia';

const portfolioStore = usePortfolioStore();
const { data } = storeToRefs(portfolioStore);
</script>

<template>
  <section id="about" class="about">
    <div class="container">
      <h2 class="section-heading">About Me</h2>

      <div class="about-content">
        <div
          class="about-text"
          v-motion
          :initial="{ opacity: 0, x: -50 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 800 } }"
        >
          <div v-html="data?.about.description"></div>

          <!-- <div class="about-stats">
            <div class="stat">
              <span class="stat-number">5+</span>
              <span class="stat-label">Years Experience</span>
            </div>
            <div class="stat">
              <span class="stat-number">50+</span>
              <span class="stat-label">Projects Completed</span>
            </div>
            <div class="stat">
              <span class="stat-number">15+</span>
              <span class="stat-label">Happy Clients</span>
            </div>
          </div> -->
        </div>

        <div
          class="about-image"
          v-motion
          :initial="{ opacity: 0, x: 50 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 800 } }"
        >
          <div class="image-container">
            <img :src="data?.about.image" alt="Northern Lights - aether Borealis" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-5);
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.about-text {
  p {
    margin-bottom: var(--space-3);
    color: var(--aether-text-secondary);
    font-size: var(--font-size-lg);
    line-height: 1.7;
  }
}

.about-stats {
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-5);

  @media (max-width: 640px) {
    flex-direction: column;
    gap: var(--space-3);
  }
}

.stat {
  display: flex;
  flex-direction: column;

  .stat-number {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-semibold);
    background: linear-gradient(90deg, var(--aether-primary-light), var(--aether-accent-light));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .stat-label {
    font-size: var(--font-size-sm);
    color: var(--aether-text-secondary);
  }
}

.about-image {
  position: relative;

  .image-container {
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    // aspect-ratio: 4/5;
    width: 100%;
    height: 360px;

    &::before {
      content: '';
      position: absolute;
      top: -20px;
      left: -20px;
      width: 70%;
      height: 70%;
      border: 2px solid var(--aether-primary);
      border-radius: var(--border-radius-lg);
      z-index: -1;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -20px;
      right: -20px;
      width: 70%;
      height: 70%;
      border: 2px solid var(--aether-accent);
      border-radius: var(--border-radius-lg);
      z-index: -1;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: transform var(--transition-slow);

      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
</style>
