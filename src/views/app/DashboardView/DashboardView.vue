<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const projects = ref([
  { id: 1, name: 'Personal Portfolio', status: 'Published', views: 1234 },
  { id: 2, name: 'Photography Gallery', status: 'Draft', views: 0 },
  { id: 3, name: 'Design Portfolio', status: 'In Progress', views: 567 },
]);

const onRedirectProfile = () => {
  router.push('/app/profile');
};
</script>

<template>
  <div class="">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <button
        @click="onRedirectProfile"
        class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
      >
        Profile Settings
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-gray-800 p-6 rounded-lg">
        <h3 class="text-gray-400 mb-2">Total Projects</h3>
        <p class="text-3xl font-bold">{{ projects.length }}</p>
      </div>
      <div class="bg-gray-800 p-6 rounded-lg">
        <h3 class="text-gray-400 mb-2">Total Views</h3>
        <p class="text-3xl font-bold">
          {{ projects.reduce((sum, project) => sum + project.views, 0) }}
        </p>
      </div>
      <div class="bg-gray-800 p-6 rounded-lg">
        <h3 class="text-gray-400 mb-2">Published Projects</h3>
        <p class="text-3xl font-bold">
          {{ projects.filter((p) => p.status === 'Published').length }}
        </p>
      </div>
    </div>

    <div class="bg-gray-800 rounded-lg p-6">
      <h2 class="text-xl font-bold mb-4">Your Projects</h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left border-b border-gray-700">
              <th class="pb-3">Project Name</th>
              <th class="pb-3">Status</th>
              <th class="pb-3">Views</th>
              <th class="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.id" class="border-b border-gray-700">
              <td class="py-4">{{ project.name }}</td>
              <td class="py-4">
                <span
                  :class="{
                    'px-2 py-1 rounded text-sm': true,
                    'bg-green-500/20 text-green-400': project.status === 'Published',
                    'bg-yellow-500/20 text-yellow-400': project.status === 'In Progress',
                    'bg-gray-500/20 text-gray-400': project.status === 'Draft',
                  }"
                >
                  {{ project.status }}
                </span>
              </td>
              <td class="py-4">{{ project.views }}</td>
              <td class="py-4">
                <button class="text-blue-400 hover:text-blue-300 mr-3">Edit</button>
                <button class="text-red-400 hover:text-red-300">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
