<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const stats = ref([
  { title: 'Total Users', value: 120 },
  { title: 'Active Admins', value: 5 },
  { title: 'Roles Available', value: 3 },
]);

const users = ref([
  { id: 1, name: 'John Doe', email: 'admin@portfy.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@portfy.com', role: 'user' },
]);

const onManageUsers = () => router.push('/admin/users');
const onManageRoles = () => router.push('/admin/roles');
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Admin Dashboard</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div v-for="s in stats" :key="s.title" class="bg-gray-800 p-6 rounded-lg">
        <h3 class="text-gray-400 mb-2">{{ s.title }}</h3>
        <p class="text-3xl font-bold">{{ s.value }}</p>
      </div>
    </div>

    <div class="flex gap-4 mb-8">
      <button @click="onManageUsers" class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg">
        Manage Users
      </button>
      <button @click="onManageRoles" class="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg">
        Manage Roles
      </button>
    </div>

    <div class="bg-gray-800 rounded-lg p-6">
      <h2 class="text-xl font-bold mb-4">Recent Users</h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left border-b border-gray-700">
              <th class="pb-3">Name</th>
              <th class="pb-3">Email</th>
              <th class="pb-3">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="border-b border-gray-700">
              <td class="py-4">{{ user.name }}</td>
              <td class="py-4">{{ user.email }}</td>
              <td class="py-4 capitalize">{{ user.role }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
