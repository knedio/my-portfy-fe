<script setup lang="ts">
import { usePortfolioStore } from '@/stores/portfolio';
import { storeToRefs } from 'pinia';

const portfolioStore = usePortfolioStore();
const { data } = storeToRefs(portfolioStore);
</script>

<template>
  <section id="home" class="hero">
    <div class="container">
      <div
        class="hero-content"
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
      >
        <h1 class="hero-title">
          <span class="text-gradient">{{ data?.banner.title }}</span>
        </h1>
        <p class="hero-subtitle">
          {{ data?.banner.description }}
        </p>
        <div
          class="hero-cta"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 600 } }"
        >
          <a href="#contact" class="button">Get in Touch</a>
          <a href="#projects" class="button button-outline">View My Work</a>
        </div>
      </div>
    </div>
    <div class="scroll-indicator">
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { duration: 500, delay: 1000 } }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 30%, rgba(110, 59, 204, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(59, 75, 204, 0.15) 0%, transparent 50%);
    z-index: -1;
  }
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-3);
}

.hero-title {
  font-size: var(--font-size-5xl);
  margin-bottom: var(--space-2);

  @media (max-width: 768px) {
    font-size: var(--font-size-4xl);
  }

  @media (max-width: 480px) {
    font-size: var(--font-size-3xl);
  }
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  color: var(--lumina-text-secondary);
  margin-bottom: var(--space-5);
  font-weight: var(--font-light);

  @media (max-width: 768px) {
    font-size: var(--font-size-lg);
  }
}

.hero-cta {
  display: flex;
  gap: var(--space-3);
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
  }
}

.button-outline {
  background: transparent;
  border: 1px solid var(--lumina-primary-light);

  &:hover {
    background: rgba(59, 75, 204, 0.2);
  }
}

.scroll-indicator {
  position: absolute;
  bottom: var(--space-5);
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
  color: var(--lumina-text-secondary);
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-20px) translateX(-50%);
  }
  60% {
    transform: translateY(-10px) translateX(-50%);
  }
}
</style>
