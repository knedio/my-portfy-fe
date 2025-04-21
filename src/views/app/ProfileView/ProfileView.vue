<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref({
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  profession: 'Full Stack Developer',
  location: 'San Francisco, CA',
});

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

      <div class="bg-gray-800 rounded-lg p-8 mb-8">
        <div class="flex items-start gap-8">
          <div class="flex-shrink-0">
            <img :src="user.avatar" alt="Profile" class="w-32 h-32 rounded-lg bg-gray-700" />
            <button class="mt-4 w-full text-sm text-blue-400 hover:text-blue-300">
              Change Photo
            </button>
          </div>
          <div class="flex-grow">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  v-model="user.name"
                  class="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  v-model="user.email"
                  class="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-2">Profession</label>
                <input
                  type="text"
                  v-model="user.profession"
                  class="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-2">Location</label>
                <input
                  type="text"
                  v-model="user.location"
                  class="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-800 rounded-lg p-8">
        <h2 class="text-xl font-bold mb-6">Security Settings</h2>
        <div class="space-y-6">
          <div>
            <label class="block text-sm text-gray-400 mb-2">Current Password</label>
            <input
              type="password"
              class="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">New Password</label>
            <input
              type="password"
              class="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Confirm New Password</label>
            <input
              type="password"
              class="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div class="mt-8 flex justify-end">
        <button class="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg transition">
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>
