<script setup lang="ts">
import FormInput from '@/components/forms/FormInput.vue';
import { PORTFOLIO_FORM_PROJECTS } from '@/models/constants/portfolio-form.constants';
import { Project } from '@/models/portfolio.model';
import { useFieldArray } from 'vee-validate';

const {
  fields: projects,
  remove: removeProject,
  push: addProject,
} = useFieldArray<Project>('projects');
</script>

<template>
  <div id="project-form" class="mb-5">
    <h2 class="text-xl font-semibold mb-2">Projects</h2>
    <div
      v-for="(proj, index) in projects"
      :key="proj.key"
      class="space-y-2 mb-4 border-b border-gray-700 pb-4"
    >
      <FormInput :name="`projects[${index}].title`" placeholder="Project title" />
      <FormInput
        :name="`projects[${index}].description`"
        type="textarea"
        placeholder="Description"
      />
      <FormInput :name="`projects[${index}].tech`" placeholder="Technologies Used" />
      <FormInput :name="`projects[${index}].image`" placeholder="Thumbnail Image" />
      <FormInput :name="`projects[${index}].category`" placeholder="Project category (optional)" />
      <FormInput :name="`projects[${index}].link`" placeholder="Project Link (optional)" />

      <button @click="removeProject(index)" class="text-red-400 hover:underline text-sm mt-1">
        Remove
      </button>
    </div>
    <button
      @click="addProject(PORTFOLIO_FORM_PROJECTS)"
      class="text-blue-400 hover:underline text-sm"
    >
      + Add Project
    </button>
  </div>
</template>
