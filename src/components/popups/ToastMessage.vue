<!-- components/shared/ToastMessage.vue -->
<script setup lang="ts">
import { X, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-vue-next';
import { ToastType } from '@/composables/useToast';
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  id: number;
  message: string;
  title: string;
  type: ToastType;
}>();

const emit = defineEmits(['close']);

const iconComponent = computed(() => {
  switch (props.type) {
    case 'success':
      return CheckCircle;
    case 'error':
      return AlertCircle;
    case 'warning':
      return AlertTriangle;
    default:
      return CheckCircle;
  }
});

const typeColor = computed(() => {
  return {
    success: 'bg-green-600',
    error: 'bg-red-600',
    warning: 'bg-yellow-500',
  }[props.type];
});
</script>

<template>
  <div
    class="flex items-start w-full max-w-sm p-4 rounded-lg text-white shadow-md"
    :class="typeColor"
  >
    <component :is="iconComponent" class="w-5 h-5 mt-1 mr-3 shrink-0" />
    <div class="flex-1">
      <h4 class="font-bold mb-1">{{ title }}</h4>
      <p class="text-sm leading-tight">{{ message }}</p>
    </div>
    <X class="w-4 h-4 ml-4 cursor-pointer" @click="emit('close')" />
  </div>
</template>
