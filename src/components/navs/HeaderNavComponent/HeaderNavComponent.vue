<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { useMotion } from '@vueuse/motion';
import { computed, ref } from 'vue';
import PortfyLogo from '@/assets/portfy.png';
import { ChevronDown, User } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();

const nav = ref(null);
const copied = ref(false);

useMotion(nav, {
  initial: { opacity: 0, y: -20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 500 },
  },
});

const authStore = useAuthStore();

const profileUrl = computed(() => {
  const user = authStore.user;
  const username = user?.username;
  const baseUrl = window.location.origin;
  const url = `${baseUrl}/profile/${username}`;

  return url;
});

const copyProfileUrl = async () => {
  try {
    await navigator.clipboard.writeText(profileUrl.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

const onLogout = () => {
  authStore.logout();
  router.push('/sign-in');
};
</script>

<template>
  <header class="pb-6">
    <nav ref="nav" class="nav px-10">
      <RouterLink
        :to="!authStore.isAuthenticated ? '/' : '/app/dashboard'"
        class="text-2xl font-bold text-white tracking-wide"
      >
        <img :src="PortfyLogo" alt="Portfy Logo" class="h-10 w-auto" />
      </RouterLink>

      <div class="flex items-center gap-6">
        <!-- Share Profile Button -->
        <!-- Share Profile Copy Button -->
        <div class="relative">
          <button
            @click="copyProfileUrl"
            class="flex items-center gap-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-full text-sm shadow-sm transition duration-300"
            title="Copy profile URL"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 8a3 3 0 00-6 0v1a3 3 0 006 0V8zm6 8v-2a4 4 0 00-3-3.87M3 16v-2a4 4 0 013-3.87M15 12a4 4 0 11-6-3.87"
              />
            </svg>
            <span>Share</span>
          </button>
          <span
            v-if="copied"
            class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-green-400 bg-gray-900 px-2 py-1 rounded transition-opacity duration-300"
          >
            Copied!
          </span>
        </div>

        <RouterLink v-if="!authStore.isAuthenticated" to="/" class="flex items-center"
          >Home</RouterLink
        >

        <template v-if="authStore.isAuthenticated">
          <RouterLink to="/app/dashboard" class="flex items-center">Dashboard</RouterLink>
          <RouterLink to="/app/portfolio-details" class="flex items-center">Portfolio</RouterLink>

          <div class="relative group">
            <button class="flex items-center gap-1 text-white h-10">
              <User class="w-4 h-10" />
              <ChevronDown
                class="w-4 h-10 transition-transform duration-300 group-hover:rotate-180"
              />
            </button>

            <div
              class="absolute right-0 mt-0 hidden group-hover:block bg-gray-700 rounded shadow-lg text-white z-50 w-45"
            >
              <button
                @click="router.push('/app/profile')"
                class="block px-4 py-2 w-full text-left hover:bg-gray-600 text-center"
              >
                Profile
              </button>
              <button
                @click="onLogout"
                class="block px-4 py-2 w-full text-left hover:bg-gray-600 text-center"
              >
                Sign Out
              </button>
            </div>
          </div>
        </template>

        <template v-else>
          <RouterLink to="/contact" class="flex items-center">Contact</RouterLink>
          <RouterLink to="/sign-in" class="flex items-center">Sign In</RouterLink>
        </template>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.group:hover .group-hover\:block {
  display: block;
}

header {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  padding: 1rem 0;
  z-index: 100;
}

.nav {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  font-size: 1rem;
}

.nav a {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease-in-out;
}

.nav a:hover {
  color: #8e44ad;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  text-align: center;
  color: white;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
}

.highlight {
  color: #8e44ad;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin: 1rem 0;
  color: #b2bec3;
}

.cta-button {
  padding: 10px 20px;
  background: #8e44ad;
  border-radius: 10px;
  font-size: 1rem;
  color: white;
  transition: transform 0.2s;
}

.cta-button:hover {
  transform: scale(1.05);
}
</style>
