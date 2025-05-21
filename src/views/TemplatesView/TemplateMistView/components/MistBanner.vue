<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMotion } from '@vueuse/motion';
import { usePortfolioStore } from '@/stores/portfolio';
import { storeToRefs } from 'pinia';

const portfolioStore = usePortfolioStore();
const { data } = storeToRefs(portfolioStore);

const title = ref(null);
const subtitle = ref(null);
const ctaButton = ref(null);

useMotion(title, {
  initial: {
    opacity: 0,
    y: 100,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 300,
      duration: 800,
    },
  },
});

useMotion(subtitle, {
  initial: {
    opacity: 0,
    y: 50,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 800,
      duration: 800,
    },
  },
});

useMotion(ctaButton, {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 1300,
      duration: 600,
    },
  },
});

// Particle animation
const canvas = ref<HTMLCanvasElement | null>(null);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let animationFrameId = 0;

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speed: number;
  directionX: number;
  directionY: number;
  opacity: number;
}

const particles: Particle[] = [];

const createParticles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const particleCount = 100;

  for (let i = 0; i < particleCount; i++) {
    const radius = Math.random() * 2 + 0.5;
    const x = Math.random() * width;
    const y = Math.random() * height;

    // Pink, purple, and blue color scheme
    const colors = ['rgba(255, 121, 198, ', 'rgba(189, 147, 249, ', 'rgba(139, 233, 253, '];

    const colorIndex = Math.floor(Math.random() * colors.length);
    const opacity = Math.random() * 0.5 + 0.1;
    const color = colors[colorIndex] + opacity + ')';

    particles.push({
      x,
      y,
      radius,
      color,
      speed: Math.random() * 0.5 + 0.1,
      directionX: Math.random() * 2 - 1,
      directionY: Math.random() * 2 - 1,
      opacity,
    });
  }
};

const drawParticles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.clearRect(0, 0, width, height);

  particles.forEach((particle) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();

    // Update position
    particle.x += particle.directionX * particle.speed;
    particle.y += particle.directionY * particle.speed;

    // Boundary check
    if (particle.x < 0 || particle.x > width) {
      particle.directionX = -particle.directionX;
    }

    if (particle.y < 0 || particle.y > height) {
      particle.directionY = -particle.directionY;
    }
  });

  animationFrameId = requestAnimationFrame(() => drawParticles(ctx, width, height));
};

onMounted(() => {
  if (canvas.value) {
    const ctx = canvas.value.getContext('2d');
    if (ctx) {
      const updateCanvasSize = () => {
        const bannerElement = document.querySelector('.banner');
        if (bannerElement) {
          const { width, height } = bannerElement.getBoundingClientRect();
          canvas.value!.width = width;
          canvas.value!.height = height;

          // Clear particles and create new ones based on new dimensions
          particles.length = 0;
          createParticles(ctx, width, height);
        }
      };

      // Initial setup
      updateCanvasSize();
      drawParticles(ctx, canvas.value.width, canvas.value.height);

      // Handle resize
      window.addEventListener('resize', updateCanvasSize);
    }
  }
});
</script>

<template>
  <section id="home" class="banner">
    <canvas ref="canvas" class="particles-canvas"></canvas>
    <div class="container">
      <div class="banner-content">
        <h1 ref="title" class="banner-title">
          <span class="highlight">{{ data?.banner.title }}</span>
        </h1>
        <p ref="subtitle" class="banner-subtitle">
          {{ data?.banner.description }}
        </p>
        <!-- <h1 ref="title" class="banner-title">
          Creative Designer & <span class="highlight">Developer</span>
        </h1>
        <p ref="subtitle" class="banner-subtitle">
          Crafting beautiful digital experiences with a feminine touch
        </p> -->
        <div ref="ctaButton" class="cta-container">
          <a href="#contact" class="cta-button">Get In Touch</a>
          <a href="#projects" class="cta-button cta-secondary">View Projects</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.banner {
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(135deg, #190f23 0%, #301b48 50%, #44244d 100%);
  overflow: hidden;
}

.particles-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

.banner-content {
  max-width: 800px;
  color: #fff;
}

.banner-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.highlight {
  background: linear-gradient(to right, #ff79c6, #bd93f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.banner-subtitle {
  font-size: 1.5rem;
  margin-bottom: 3rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.cta-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(to right, #ff79c6, #bd93f9);
  color: #fff;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(189, 147, 249, 0.4);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(189, 147, 249, 0.6);
}

.cta-secondary {
  background: transparent;
  border: 2px solid rgba(189, 147, 249, 0.8);
  box-shadow: none;
}

.cta-secondary:hover {
  background: rgba(189, 147, 249, 0.1);
  box-shadow: 0 10px 20px rgba(189, 147, 249, 0.2);
}

@media (max-width: 768px) {
  .banner-title {
    font-size: 2.5rem;
  }

  .banner-subtitle {
    font-size: 1.2rem;
  }

  .cta-button {
    padding: 0.8rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .banner-title {
    font-size: 2rem;
  }

  .banner-subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .cta-container {
    flex-direction: column;
    width: 100%;
  }

  .cta-button {
    text-align: center;
    width: 100%;
  }
}
</style>
