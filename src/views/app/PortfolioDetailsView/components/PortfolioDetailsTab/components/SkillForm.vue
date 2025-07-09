<script setup lang="ts">
import FormInput from '@/components/forms/FormInput.vue';
import { PORTFOLIO_FORM_SKILLS } from '@/models/constants/portfolio-form.constants';
import { Skill } from '@/models/portfolio.model';
import { useFieldArray, useFormContext } from 'vee-validate';

const { values } = useFormContext();

const {
  fields: skills,
  remove: removeSkill,
  push: addSkill,
  update: updateSkill,
} = useFieldArray<Skill>('skills');

const onSubSkillsBlur = (index: number) => {
  const skill = values.skills?.[index];
  const raw = skill?.subSkillsText;
  const parsed = raw
    ? raw
        .split(',')
        .map((s: string) => s.trim())
        .filter(Boolean)
    : [];

  updateSkill(index, { ...skill, subSkills: parsed });
};
</script>

<template>
  <div id="skills-form" class="mb-5">
    <h2 class="text-xl font-semibold mb-2">Skills</h2>
    <div
      v-for="(proj, index) in skills"
      :key="proj.key"
      class="space-y-2 mb-4 border-b border-gray-700 pb-4"
    >
      <FormInput :name="`skills[${index}].name`" placeholder="Skill name" />
      <FormInput :name="`skills[${index}].level`" placeholder="Skill level (0-10)" />
      <FormInput :name="`skills[${index}].experience`" placeholder="Skill experience" />
      <!-- <FormInput :name="`skills[${index}].icon`" placeholder="Icon" /> -->
      <FormInput
        :name="`skills[${index}].subSkillsText`"
        placeholder="Sub-skills (comma separated)"
        @blur="onSubSkillsBlur(index)"
      />

      <button @click="removeSkill(index)" class="text-red-400 hover:underline text-sm mt-1">
        Remove
      </button>
    </div>

    <button @click="addSkill(PORTFOLIO_FORM_SKILLS)" class="text-blue-400 hover:underline text-sm">
      + Add Skill
    </button>
  </div>
</template>
