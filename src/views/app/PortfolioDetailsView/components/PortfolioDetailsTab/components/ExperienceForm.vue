<script setup lang="ts">
import FormInput from '@/components/forms/FormInput.vue';
import { Experience } from '@/models/portfolio.model';
import { useFieldArray, useFormContext } from 'vee-validate';

const { values } = useFormContext();

const {
  fields: experiences,
  push: addExperience,
  remove: removeExperience,
  update: updateExperience,
} = useFieldArray<Experience>('experiences');

const addExperienceDescription = (index: number) => {
  const current = values.experiences?.[index];
  if (current) {
    const updated = {
      ...current,
      description: [...(current.description || []), ''],
    };
    updateExperience(index, updated);
  }
};

const removeExperienceDescription = (expIndex: number, descIndex: number) => {
  const current = values.experiences?.[expIndex];
  if (current) {
    const newDescriptions = [...(current.description || [])];
    newDescriptions.splice(descIndex, 1);
    const updated = {
      ...current,
      description: newDescriptions,
    };
    updateExperience(expIndex, updated);
  }
};
</script>

<template>
  <div id="experience-form" class="mb-5">
    <h2 class="text-xl font-semibold mb-2">Experience</h2>
    <div
      v-for="(exp, index) in experiences"
      :key="exp.key"
      class="space-y-2 mb-4 border-b border-gray-700 pb-4"
    >
      <FormInput :name="`experiences[${index}].position`" placeholder="Job Title" />
      <FormInput :name="`experiences[${index}].company`" placeholder="Company" />
      <FormInput :name="`experiences[${index}].duration`" placeholder="Duration (e.g. 2020–2022)" />

      <div class="space-y-2">
        <label class="text-sm font-medium text-white">Descriptions</label>
        <div
          v-for="(desc, descIdx) in values.experiences?.[index]?.description || []"
          :key="descIdx"
          class="flex gap-2 items-center"
        >
          <FormInput
            class="w-full"
            :name="`experiences[${index}].description[${descIdx}]`"
            placeholder="Description bullet"
          />
          <button
            class="text-red-400 hover:underline text-sm"
            @click="removeExperienceDescription(index, descIdx)"
          >
            Remove
          </button>
        </div>

        <button
          class="text-blue-400 hover:underline text-sm mt-1"
          @click="addExperienceDescription(index)"
        >
          + Add Description
        </button>
      </div>

      <button @click="removeExperience(index)" class="text-red-400 hover:underline text-sm mt-2">
        Remove Experience
      </button>
    </div>

    <button
      @click="addExperience({ position: '', company: '', duration: '', description: [''] })"
      class="text-blue-400 hover:underline text-sm"
    >
      + Add Experience
    </button>
  </div>
</template>
