<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const isScrolled = ref(false);
const mobileMenuOpen = ref(false);

const checkScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
  checkScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMenu = () => {
  mobileMenuOpen.value = false;
};
</script>

<template>
  <header :class="{ scrolled: isScrolled }">
    <div class="container header-container">
      <a href="#" class="logo">aether</a>

      <button class="mobile-menu-button" @click="toggleMobileMenu" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav :class="{ 'mobile-open': mobileMenuOpen }">
        <ul class="nav-links">
          <li v-for="link in navLinks" :key="link.name">
            <a :href="link.href" @click="closeMenu">{{ link.name }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: var(--z-elevated);
  padding: var(--space-3) 0;
  transition:
    background-color var(--transition-base),
    box-shadow var(--transition-base);

  &.scrolled {
    background-color: rgba(11, 16, 31, 0.85);
    backdrop-filter: blur(10px);
    box-shadow: var(--shadow-md);
  }
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: var(--font-size-xl);
  font-weight: var(--font-semibold);
  background: linear-gradient(90deg, var(--aether-accent-light), var(--aether-primary-light));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: var(--space-4);

  a {
    color: var(--aether-text-primary);
    font-weight: var(--font-semibold);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--border-radius);
    transition:
      color var(--transition-fast),
      background-color var(--transition-fast);

    &:hover {
      color: var(--aether-accent-light);
      background-color: rgba(255, 255, 255, 0.05);
    }
  }
}

.mobile-menu-button {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  span {
    display: block;
    height: 2px;
    width: 100%;
    background-color: var(--aether-text-primary);
    transition:
      transform var(--transition-fast),
      opacity var(--transition-fast);
  }
}

@media (max-width: 768px) {
  .mobile-menu-button {
    display: flex;
    z-index: 11;
  }

  .mobile-open {
    .mobile-menu-button {
      span:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }

      span:nth-child(2) {
        opacity: 0;
      }

      span:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
    }
  }

  nav {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 70%;
    max-width: 300px;
    background-color: var(--aether-bg-card);
    box-shadow: var(--shadow-lg);
    transform: translateX(100%);
    transition: transform var(--transition-base);
    padding: var(--space-7) var(--space-4);
    z-index: 10;

    &.mobile-open {
      transform: translateX(0);
    }

    .nav-links {
      flex-direction: column;
      gap: var(--space-3);

      a {
        display: block;
        padding: var(--space-2);
      }
    }
  }
}
</style>
