<script setup lang="ts">
import { ref } from 'vue';
import { Field } from 'vee-validate';

interface Option {
  label: string;
  value: string | number;
}

defineProps<{
  name: string;
  label?: string;
  options: Option[];
  inputClass?: string;
}>();

const isOpen = ref(false);

const onToggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const onCloseDropdown = () => {
  setTimeout(() => {
    isOpen.value = false;
  }, 150);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onSelectOption = (field: any, value: string | number) => {
  field.onChange(value);
  field.onBlur();
  isOpen.value = false;

  console.log('onSelectOption');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatError = (error: any): string => {
  if (Array.isArray(error)) {
    return error[0];
  }
  return error;
};
</script>

<template>
  <div class="form-field flex flex-col mb-2 relative">
    <label v-if="label" class="block text-sm text-gray-400 mb-1">{{ label }}</label>

    <Field :name="name" v-slot="{ field, meta, errors }">
      <div class="relative">
        <div
          role="button"
          tabindex="0"
          @click="onToggleDropdown"
          @blur="onCloseDropdown"
          :class="[
            'flex justify-between items-center text-left w-full',
            inputClass ||
              'p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500',
          ]"
        >
          <span :class="field.value ? 'text-white' : 'text-gray-400'">
            {{ options.find((option) => option.value === field.value)?.label || 'Select...' }}
          </span>
          <svg
            class="w-4 h-4 ml-2 transform"
            :class="{ 'rotate-180': isOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        <ul
          v-show="isOpen"
          class="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded shadow-lg max-h-60 overflow-auto"
        >
          <li
            v-for="option in options"
            :key="option.value"
            class="px-4 py-2 hover:bg-gray-700 cursor-pointer"
            :class="{ 'bg-gray-700': option.value === field.value }"
            @click="onSelectOption(field, option.value)"
          >
            {{ option.label }}
          </li>
        </ul>
      </div>

      <p v-if="formatError(errors) && meta.touched" class="text-red-400 text-sm mt-1">
        {{ formatError(errors) }}
      </p>
    </Field>
  </div>
</template>
