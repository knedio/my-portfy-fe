<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '@/components/buttons/BaseButton/BaseButton.vue';
import { uploadProfilePhoto } from '@/services/userService';
import { useAuthStore } from '@/stores/auth';
import { Loader2 } from 'lucide-vue-next';
import { useToast } from '@/composables/useToast';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const storageUrl = `${VITE_API_BASE_URL}/storage/`;

const auth = useAuthStore();
const { showToast } = useToast();

const user = ref({
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'http://127.0.0.1:8000/storage/avatars/avatar_680b3b0ca9203.jpeg',
  profession: 'Full Stack Developer',
  location: 'San Francisco, CA',
});
const isUploading = ref(false);

const fileInput = ref<HTMLInputElement | null>(null);

const onPhotoClick = () => {
  if (!isUploading.value) fileInput.value?.click();
};

const onFileSelected = async (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0];
  if (!file) return;

  try {
    isUploading.value = true;
    const { user } = await uploadProfilePhoto(file);
    auth.setUser(user);
    showToast('Upload successfully!', 'success');
  } catch (error) {
    console.error('Upload failed', error);
    showToast('Upload failed.', 'error');
  } finally {
    isUploading.value = false;
  }
};
</script>

<template>
  <div class="bg-gray-800 rounded-lg p-8 mb-8">
    <div class="flex items-start gap-8">
      <div class="flex-shrink-0 relative">
        <img
          :src="
            auth.user?.image
              ? `${storageUrl}${auth.user.image}`
              : 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
          "
          alt="Profile"
          class="w-32 h-32 rounded-lg bg-gray-700 object-cover"
        />

        <!-- Loader on top of image -->
        <div
          v-if="isUploading"
          class="absolute top-0 left-0 w-32 h-32 flex items-center justify-center bg-black/50 rounded-lg"
        >
          <Loader2 class="w-6 h-6 text-white animate-spin" />
        </div>

        <input
          type="file"
          ref="fileInput"
          class="hidden"
          @change="onFileSelected"
          accept="image/*"
        />

        <button
          @click="onPhotoClick"
          class="mt-4 w-full text-sm text-blue-400 hover:text-blue-300 disabled:opacity-50"
          :disabled="isUploading"
        >
          {{ isUploading ? 'Uploading...' : 'Change Photo' }}
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

    <div class="mt-5 flex justify-end">
      <BaseButton class="ml-auto" label="Save Changes" />
    </div>
  </div>
</template>
