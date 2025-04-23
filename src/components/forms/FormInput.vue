<script setup lang="ts">
import { Field } from 'vee-validate';

defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 4,
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatError = (error: any): string => {
  if (Array.isArray(error)) {
    return error[0];
  }
  return error;
};
</script>

<template>
  <div class="form-field flex flex-col mb-2">
    <label v-if="label" class="block text-sm text-gray-400 mb-1">{{ label }}</label>
    <Field :name="name" v-slot="{ field, meta, errors }">
      <template v-if="type === 'textarea'">
        <textarea
          v-bind="field"
          :placeholder="placeholder"
          :rows="rows"
          class="w-full p-2 rounded bg-gray-800 border border-gray-700 resize-none"
        ></textarea>
      </template>
      <template v-else>
        <input
          v-bind="field"
          :type="type"
          :placeholder="placeholder"
          class="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />
      </template>
      <p v-if="formatError(errors) && meta.touched" class="text-red-400 text-sm mt-1">
        {{ formatError(errors) }}
      </p>
    </Field>
  </div>
</template>
