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
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 1000, delay: 200 } }"
      >
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="gradient-text">{{ data?.banner.title }}</span>
          </h1>
          <p class="hero-subtitle">
            {{ data?.banner.description }}
          </p>
          <div
            class="hero-cta"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 800 } }"
          >
            <a href="#contact" class="button">Let's Create Together</a>
            <a href="#projects" class="button button-outline">View Portfolio</a>
          </div>
        </div>

        <div
          class="hero-decoration"
          v-motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 1000, delay: 400 } }"
        >
          <div class="decoration-circle"></div>
          <div class="decoration-dots"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: var(--space-8) 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background:
      radial-gradient(circle at 90% 10%, rgba(255, 143, 171, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 10% 90%, rgba(184, 192, 255, 0.15) 0%, transparent 50%);
    z-index: -1;
  }
}

.hero-content {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: var(--space-6);
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.hero-text {
  max-width: 600px;

  @media (max-width: 968px) {
    margin: 0 auto;
  }
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  margin-bottom: var(--space-4);

  .gradient-text {
    background: linear-gradient(135deg, var(--aether-primary), var(--aether-accent));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  color: var(--aether-text-secondary);
  margin-bottom: var(--space-6);
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: var(--font-size-lg);
  }
}

.hero-cta {
  display: flex;
  gap: var(--space-3);

  @media (max-width: 968px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
}

.button-outline {
  background: transparent;
  border: 2px solid var(--aether-primary);
  color: var(--aether-primary);

  &:hover {
    background: linear-gradient(135deg, var(--aether-primary), var(--aether-accent));
    color: white;
    border-color: transparent;
  }
}

.hero-decoration {
  position: relative;
  height: 500px;

  @media (max-width: 968px) {
    display: none;
  }
}

.decoration-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 143, 171, 0.2), rgba(184, 192, 255, 0.2));
  backdrop-filter: blur(8px);
  animation: float 6s ease-in-out infinite;
}

.decoration-dots {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(var(--aether-primary) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.3;
}

@keyframes float {
  0%,
  100% {
    transform: translate(-50%, -50%);
  }
  50% {
    transform: translate(-50%, -60%);
  }
}
</style>
