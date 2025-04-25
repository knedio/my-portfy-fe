<script setup lang="ts">
import { useRouter } from 'vue-router';
import SecuritySettings from './components/SecuritySettings.vue';
import ProfileSettings from './components/ProfileSettings.vue';

const router = useRouter();

const onRedirectDashboard = () => {
  router.push('/app/dashboard');
};
</script>

<template>
  <div class="">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Profile Settings</h1>
        <button
          @click="onRedirectDashboard"
          class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
        >
          Back to Dashboard
        </button>
      </div>

      <ProfileSettings />

      <SecuritySettings />
    </div>
  </div>
</template>
