<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  tabs: { label: string; key: string }[];
  modelValue?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const active = ref(props.modelValue || props.tabs[0]?.key);

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined) active.value = val;
  }
);

const onSwitchTab = (key: string) => {
  active.value = key;
  emit('update:modelValue', key);
};
</script>

<template>
  <div>
    <div class="flex border-b border-gray-700 mb-6">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="onSwitchTab(tab.key)"
        class="px-4 py-2 text-sm font-medium transition-colors duration-200"
        :class="{
          'text-purple-400 border-b-2 border-purple-500': active === tab.key,
          'text-gray-400 hover:text-purple-300': active !== tab.key,
        }"
      >
        {{ tab.label }}
      </button>
    </div>

    <slot :activeTab="active" />
  </div>
</template>
