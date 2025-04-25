<script setup lang="ts">
import { Field } from 'vee-validate';
import { ref, computed } from 'vue';
import { Eye, EyeOff } from 'lucide-vue-next';

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  rows: { type: Number, default: 4 },
  inputClass: { type: String, default: '' },
  toggleable: { type: Boolean, default: false }, // supports show/hide password
});

const showPassword = ref(false);

const inputType = computed(() => {
  if (props.toggleable) {
    return showPassword.value ? 'text' : 'password';
  }
  return props.type;
});

const formatError = (error: unknown): string => {
  return Array.isArray(error) ? error[0] : (error as string);
};
</script>

<template>
  <div class="form-field flex flex-col mb-2">
    <label v-if="label" class="block text-sm text-gray-400 mb-1">{{ label }}</label>

    <Field :name="name" v-slot="{ field, meta, errors }">
      <!-- Textarea -->
      <template v-if="type === 'textarea'">
        <textarea
          v-bind="field"
          :placeholder="placeholder"
          :rows="rows"
          :class="[
            'w-full resize-none',
            inputClass || 'p-2 rounded bg-gray-800 border border-gray-700',
          ]"
        />
      </template>

      <!-- Input  -->
      <template v-else>
        <div class="relative">
          <input
            v-bind="field"
            :type="inputType"
            :placeholder="placeholder"
            :class="[
              'w-full pr-10',
              inputClass || 'p-2 rounded bg-gray-800 border border-gray-700',
            ]"
          />
          <button
            v-if="toggleable"
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <Eye v-if="!showPassword" class="w-4 h-4" />
            <EyeOff v-else class="w-4 h-4" />
          </button>
        </div>
      </template>

      <p v-if="formatError(errors) && meta.touched" class="text-red-400 text-sm mt-1">
        {{ formatError(errors) }}
      </p>
    </Field>
  </div>
</template>
