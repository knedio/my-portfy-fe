<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';
import { defineProps, computed } from 'vue';

const props = defineProps<{
  isLoading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any; // lucide-vue icon component
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  label?: string;
}>();
const isDisabled = computed(() => props.disabled || props.isLoading);
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="isDisabled"
    class="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
  >
    <span>{{ label }}</span>
    <Loader2 v-if="isLoading" class="animate-spin w-4 h-4" />
    <component :is="icon" v-if="icon && !isLoading" class="w-4 h-4" />
  </button>
</template>
