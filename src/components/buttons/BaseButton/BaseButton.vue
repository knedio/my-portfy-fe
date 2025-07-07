<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps<{
  isLoading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  label?: string;
  variant?: 'primary' | 'danger' | 'success' | 'secondary';
  customClass?: string;
}>();

const isDisabled = computed(() => props.disabled || props.isLoading);

// default variant-based classes
const baseClasses =
  'flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed';

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'danger':
      return 'text-white bg-red-500 hover:bg-red-600';
    case 'success':
      return 'text-white bg-green-500 hover:bg-green-600';
    case 'secondary':
      return 'text-gray-700 bg-gray-200 hover:bg-gray-300';
    case 'primary':
    default:
      return 'text-white bg-blue-500 hover:bg-blue-600';
  }
});

const finalClass = computed(() =>
  [baseClasses, variantClasses.value, props.customClass].filter(Boolean).join(' ')
);
</script>

<template>
  <button :type="type || 'button'" :disabled="isDisabled" :class="finalClass">
    <span>{{ label }}</span>
    <Loader2 v-if="isLoading" class="animate-spin w-4 h-4" />
    <component :is="icon" v-if="icon && !isLoading" class="w-4 h-4" />
  </button>
</template>
