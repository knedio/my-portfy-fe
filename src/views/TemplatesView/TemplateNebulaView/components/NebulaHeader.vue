<script setup lang="ts">
import { usePortfolioStore } from '@/stores/portfolio';
import { ref, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { PORTFOLIO_SCROLL_CONTAINER_SELECTOR } from '@/models/constants/portfolio-form.constants';

const portfolioStore = usePortfolioStore();
const { data } = storeToRefs(portfolioStore);

const isScrolled = ref(false);

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const getPortfolioScrollElement = () => {
  return document.querySelector(`.${PORTFOLIO_SCROLL_CONTAINER_SELECTOR}`) as HTMLElement | null;
};

const onScroll = () => {
  const target = getPortfolioScrollElement();
  const scrollY = !target ? window?.scrollY : target?.scrollTop;

  if (scrollY) {
    isScrolled.value = scrollY > 50;
  }
};

const onScrollToSection = (selector: string) => {
  const el = document.querySelector(selector);

  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  const target = getPortfolioScrollElement();
  if (target) {
    target.addEventListener('scroll', onScroll);
  } else {
    window.addEventListener('scroll', onScroll);
  }
});

onUnmounted(() => {
  const target = getPortfolioScrollElement();
  if (!target) {
    window.removeEventListener('scroll', onScroll);
  } else {
    target?.removeEventListener('scroll', onScroll);
  }
});
</script>

<template>
  <header
    :class="[
      'fixed w-full z-50 transition-all duration-300',
      isScrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6',
    ]"
  >
    <nav class="container">
      <div class="flex justify-between items-center">
        <a
          class="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400"
          href="javascript:void(0)"
          @click="onScrollToSection('#banner')"
        >
          {{ data?.firstName }} {{ data?.lastName }}
        </a>
        <div class="hidden md:flex gap-6 text-sm sm:text-base">
          <a
            v-for="item in navItems"
            :key="item.name"
            href="javascript:void(0)"
            class="cursor-pointer nav-link"
            @click="onScrollToSection(item.href)"
          >
            {{ item.name }}
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>
