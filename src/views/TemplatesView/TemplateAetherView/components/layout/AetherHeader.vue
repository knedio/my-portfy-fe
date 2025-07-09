<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Menu, X } from 'lucide-vue-next';
import { scrollToSection } from '@/utils/helpers';

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const onHandleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const onScrollToSection = (href: string) => {
  isMobileMenuOpen.value = false;
  scrollToSection(href);
};

onMounted(() => {
  window.addEventListener('scroll', onHandleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onHandleScroll);
});
</script>

<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <span class="logo-text"></span>
        </div>

        <!-- Desktop Menu -->
        <nav class="nav-desktop">
          <ul>
            <li v-for="link in links" :key="link.name">
              <a :href="link.href" @click.prevent="onScrollToSection(link.href)">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- Mobile Menu Toggle -->
        <button
          class="mobile-toggle"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          aria-label="Toggle menu"
        >
          <Menu v-if="!isMobileMenuOpen" :size="24" />
          <X v-else :size="24" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div class="mobile-menu" :class="{ 'mobile-menu-open': isMobileMenuOpen }">
        <nav>
          <ul>
            <li v-for="link in links" :key="link.name">
              <a :href="link.href" @click.prevent="scrollToSection(link.href)">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: var(--space-3) 0;
  /* background: rgba(25, 15, 35, 0.3); */
  /* backdrop-filter: blur(8px); */
}

.header.scrolled {
  /* background: rgba(25, 15, 35, 0.8);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); */

  background-color: #f9f9fb;
  border-bottom: 1px solid #ddd;
}

.container {
  margin: 0 auto;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-text {
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(to right, #ff79c6, #bd93f9);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
}

.nav-desktop ul {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
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

.nav-desktop a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, #ff79c6, #bd93f9);
  transition: width 0.3s ease;
}

.nav-desktop a:hover::after {
  width: 100%;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.mobile-menu {
  display: none;
}

@media (max-width: 768px) {
  .nav-desktop {
    display: none;
  }

  .mobile-toggle {
    display: block;
  }

  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(25, 15, 35, 0.95);
    padding: 1rem 0;
    display: none;
    transform: translateY(-1rem);
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }

  .mobile-menu-open {
    display: block;
    transform: translateY(0);
    opacity: 1;
  }

  .mobile-menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .mobile-menu li {
    margin: 0;
  }

  .mobile-menu a {
    display: block;
    padding: 1rem 2rem;
    color: white;
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }

  .mobile-menu a:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}
</style>
