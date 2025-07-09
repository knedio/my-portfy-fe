<script setup lang="ts">
import FormInput from '@/components/forms/FormInput.vue';
import { Education } from '@/models/portfolio.model';
import { useFieldArray } from 'vee-validate';
import { PORTFOLIO_FORM_EDUCATIONS } from '@/models/constants/portfolio-form.constants';

const {
  fields: educations,
  remove: removeEducation,
  push: addEducation,
} = useFieldArray<Education>('educations');
</script>

<template>
  <div id="education-form" class="mb-5">
    <h2 class="text-xl font-semibold mb-2">Education</h2>
    <div
      v-for="(edu, index) in educations"
      :key="edu.key"
      class="space-y-2 mb-4 border-b border-gray-700 pb-4"
    >
      <FormInput :name="`educations[${index}].school`" placeholder="School name" />
      <FormInput :name="`educations[${index}].degree`" placeholder="Degree / Course" />
      <div class="flex gap-2">
        <FormInput
          :name="`educations[${index}].yearFrom`"
          placeholder="From (YYYY)"
          class="w-full"
        />
        <FormInput :name="`educations[${index}].yearTo`" placeholder="To (YYYY)" class="w-full" />
      </div>
      <button @click="removeEducation(index)" class="text-red-400 hover:underline text-sm mt-1">
        Remove
      </button>
    </div>
    <button
      @click="addEducation(PORTFOLIO_FORM_EDUCATIONS)"
      class="text-blue-400 hover:underline text-sm"
    >
      + Add Education
    </button>
  </div>
</template>
