<script setup lang="ts">
import { ref, type Component } from 'vue';
import { ChevronDown } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';

interface DropdownItem {
  label: string;
  to?: string;
  icon?: Component;
  action?: () => void;
}

const props = defineProps<{
  label?: string;
  icon?: Component;
  items?: DropdownItem[];
}>();

const isOpen = ref(false);

const toggle = () => {
  isOpen.value = true;
};

const close = () => {
  isOpen.value = false;
};

const handleClick = (item: DropdownItem) => {
  if (item.action) item.action();
  close();
};
</script>

<template>
  <div class="relative group" @mouseenter="toggle" @mouseleave="close">
    <button class="nav-item-link">
      <component :is="props.icon" class="w-4 h-4" v-if="props.icon" />
      <span class="capitalize" v-if="props.label">{{ props.label }}</span>
      <ChevronDown
        class="w-4 h-4 ml-auto transition-transform duration-300"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-0 bg-gray-700 rounded shadow-lg text-white z-50 min-w-[150px]"
    >
      <template v-if="props.items?.length">
        <template v-for="(item, i) in props.items" :key="i">
          <RouterLink
            v-if="item.to"
            :to="item.to"
            class="flex items-center gap-2 px-4 py-2 hover:bg-gray-600 text-sm"
            @click="close"
          >
            <component :is="item.icon" class="w-4 h-4" v-if="item.icon" />
            <span>{{ item.label }}</span>
          </RouterLink>
          <button
            v-else
            @click="handleClick(item)"
            class="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-600 text-sm"
          >
            <component :is="item.icon" class="w-4 h-4" v-if="item.icon" />
            <span>{{ item.label }}</span>
          </button>
        </template>
      </template>

      <slot v-else />
    </div>
  </div>
</template>
