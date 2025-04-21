<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAllTemplates } from '@/services/templateService';
import { updateUserTemplate } from '@/services/userService';
import { Template } from '@/models/template.model';
import { getUserProfile } from '@/services/authService';

const isLoading = ref(true);
const templates = ref<Template[]>([]);
const selectedTemplateId = ref<number | null>(null);
const router = useRouter();

const onGetTemplates = async () => {
  const response = await getAllTemplates();
  templates.value = response;
};

const onSelectTemplate = (templateId: number) => {
  selectedTemplateId.value = templateId;
};

const onSaveTemplate = async () => {
  if (!selectedTemplateId.value) return;

  try {
    await updateUserTemplate(selectedTemplateId.value);
    router.push('/app/dashboard');
  } catch (error) {
    console.error('Error:', error);
  }
};

onMounted(async () => {
  try {
    await onGetTemplates();
    const user = await getUserProfile();

    selectedTemplateId.value = user.data.templateId as number;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="">
    <h1 class="text-3xl font-bold mb-6">Choose a Template</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="template in templates"
        :key="template.id"
        class="border rounded-lg p-4 bg-gray-800 cursor-pointer hover:border-purple-500"
        :class="{ 'border-purple-500': selectedTemplateId === template.id }"
        @click="onSelectTemplate(template.id)"
      >
        <img :src="template.preview_image" alt="" class="w-full h-40 object-cover rounded mb-2" />
        <h2 class="text-xl font-semibold">{{ template.name }}</h2>
        <p class="text-gray-400 text-sm">{{ template.description }}</p>
      </div>
    </div>

    <button
      class="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      :disabled="!selectedTemplateId"
      @click="onSaveTemplate"
    >
      Save & Continue
    </button>
  </div>
</template>
