<script setup lang="ts">
import { User, LogOut, UserCircle, Users, ShieldCheck } from 'lucide-vue-next';
import { RouterLink, useRouter } from 'vue-router';
import { useMotion } from '@vueuse/motion';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import PortfyLogo from '@/assets/portfy.png';
import DropdownMenu from '@/components/buttons/DropdownMenu/DropdownMenu.vue';

const router = useRouter();

const nav = ref(null);

useMotion(nav, {
  initial: { opacity: 0, y: -20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 500 },
  },
});

const authStore = useAuthStore();

const onLogout = () => {
  authStore.logout();
  router.push('/sign-in');
};
</script>

<template>
  <header class="pb-6">
    <nav ref="nav" class="nav px-10">
      <RouterLink
        :to="!authStore.isAuthenticated ? '/' : '/admin/dashboard'"
        class="text-2xl font-bold text-white tracking-wide"
      >
        <img :src="PortfyLogo" alt="Portfy Logo" class="h-10 w-auto" />
      </RouterLink>

      <div class="flex items-center gap-4">
        <RouterLink v-if="!authStore.isAuthenticated" to="/" class="flex items-center"
          >Home</RouterLink
        >

        <template v-if="authStore.isAuthenticated">
          <RouterLink to="/admin/dashboard" class="nav-item-link">Dashboard</RouterLink>

          <DropdownMenu
            label="Manage"
            :items="[
              { label: 'Users', to: '/admin/users', icon: Users },
              { label: 'Roles', to: '/admin/roles', icon: ShieldCheck },
            ]"
          />
          <DropdownMenu
            :icon="User"
            :items="[
              {
                label: 'Profile',
                to: '/admin/profile',
                icon: UserCircle,
              },
              {
                label: 'Sign Out',
                to: '',
                icon: LogOut,
                action: () => {
                  onLogout();
                },
              },
            ]"
          />
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
