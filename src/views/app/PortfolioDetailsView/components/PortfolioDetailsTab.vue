<script setup lang="ts">
import { savePortfolioDetails, getPortfolioDetails } from '@/services/portfolioService';
import { onMounted, ref, watch } from 'vue';
import { useForm, useFieldArray } from 'vee-validate';
import * as yup from 'yup';
import { Save } from 'lucide-vue-next';
import { Education, PortfolioDetails, Project, Skill } from '@/models/portfolio.model';
import FormInput from '@/components/forms/FormInput.vue';
import BaseButton from '@/components/buttons/BaseButton/BaseButton.vue';
import {
  PORTFOLIO_FORM_EDUCATIONS,
  PORTFOLIO_FORM,
  PORTFOLIO_FORM_PROJECTS,
  PORTFOLIO_FORM_SKILLS,
} from '@/models/constants/portfolio-form.constants';

const emit = defineEmits<{
  (e: 'update', payload: PortfolioDetails): void;
}>();

const isSaving = ref(false);

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  contactEmail: yup.string().email('Invalid email').required('Email is required'),
  location: yup.string().required('Location is required'),
  about: yup.object({
    title: yup.string().required('About title is required'),
    description: yup.string().required('About description is required'),
    image: yup.string().nullable(), // can be a URL or base64 string
  }),
  banner: yup.object({
    title: yup.string().required('Banner title is required'),
    description: yup.string().required('Banner description is required'),
    btnLabel: yup.string().nullable(),
  }),

  educations: yup
    .array()
    .of(
      yup.object({
        school: yup.string().required('School is required'),
        degree: yup.string().required('Degree is required'),
        yearFrom: yup.string().required('Year from is required'),
        yearTo: yup.string().required('Year to is required'),
      })
    )
    .min(1, 'At least one education entry is required'),

  projects: yup
    .array()
    .of(
      yup.object({
        title: yup.string().required('Title is required'),
        description: yup.string().required('Description is required'),
        tech: yup.string().required('Tech is required'),
        image: yup.string().required('Image is required'),
        link: yup.string().url('Must be a valid URL').nullable().notRequired(),
      })
    )
    .min(1, 'At least one project is required'),

  skills: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required('Skill name is required'),
        level: yup
          .number()
          .typeError('Skill level must be a number')
          .min(0, 'Minimum level is 0')
          .max(10, 'Maximum level is 10')
          .nullable(),
        experience: yup.string().nullable(),
        icon: yup.string().nullable(),
        subSkills: yup.array().of(yup.string().required()).nullable(),
      })
    )
    .min(1, 'At least one skill is required'),
});

const { values, handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: PORTFOLIO_FORM,
});

watch(
  values,
  (newVal) => {
    emit('update', { ...newVal });
  },
  { deep: true, immediate: true }
);

const {
  fields: educations,
  remove: removeEducation,
  push: addEducation,
} = useFieldArray<Education>('educations');
const {
  fields: projects,
  remove: removeProject,
  push: addProject,
} = useFieldArray<Project>('projects');
const {
  fields: skills,
  remove: removeSkill,
  push: addSkill,
  update: updateSkill,
} = useFieldArray<Skill>('skills');

const onSubmit = handleSubmit(async (formValues) => {
  try {
    isSaving.value = true;
    await savePortfolioDetails(formValues);
  } catch (error) {
    console.log('Error:', error);
  } finally {
    isSaving.value = false;
  }
});

const onGetDetails = async () => {
  const { data } = await getPortfolioDetails();

  if (data) {
    setValues({
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      contactEmail: data?.contactEmail || '',
      location: data?.location || '',
      about: data?.about ?? { title: '', description: '', image: '' },
      banner: data?.banner ?? { title: '', description: '', btnLabel: '' },
      educations: data.educations?.length ? data.educations : [PORTFOLIO_FORM_EDUCATIONS],
      projects: data.projects?.length ? data.projects : [PORTFOLIO_FORM_PROJECTS],
      skills: data.skills?.length
        ? data.skills.map((skill) => ({
            ...skill,
            subSkillsText: (skill.subSkills ?? []).join(', '),
          }))
        : [PORTFOLIO_FORM_SKILLS],
    });
  }
};

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

onMounted(async () => {
  await onGetDetails();
});
</script>

<template>
  <div class="">
    <div id="personal-info-form" class="space-y-4 mb-5">
      <div class="flex gap-4">
        <FormInput
          class="w-full"
          name="firstName"
          label="First Name"
          placeholder="Your first name"
        />
        <FormInput class="w-full" name="lastName" label="Last Name" placeholder="Your last name" />
      </div>
      <FormInput
        name="contactEmail"
        label="Contact Email"
        type="email"
        placeholder="Your email address"
      />
      <FormInput name="location" label="Location" placeholder="Your location" />
    </div>

    <div id="banner-form" class="space-y-4 mb-5">
      <h2 class="text-xl font-semibold mb-2">Banner</h2>
      <FormInput name="banner.title" label="Title" placeholder="Banner title" />
      <FormInput
        name="banner.description"
        label="Description"
        type="textarea"
        placeholder="Write something banner yourself"
      />
      <FormInput
        name="banner.btnLabel"
        label="Button Label (optional)"
        placeholder="e.g. Get in Touch"
      />
    </div>

    <div id="about-form" class="space-y-4 mb-5">
      <h2 class="text-xl font-semibold mb-2">About</h2>
      <FormInput name="about.title" label="Title" placeholder="About title" />
      <FormInput
        name="about.description"
        label="Description"
        type="textarea"
        placeholder="Write something about yourself"
      />
      <FormInput name="about.image" label="Image URL (optional)" placeholder="e.g. https://..." />
    </div>

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
        <FormInput
          :name="`projects[${index}].category`"
          placeholder="Project category (optional)"
        />
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
        <FormInput :name="`skills[${index}].icon`" placeholder="Icon" />
        <FormInput
          :name="`skills[${index}].subSkillsText`"
          placeholder="Sub-skills (comma separated)"
          @blur="onSubSkillsBlur(index)"
        />

        <button @click="removeSkill(index)" class="text-red-400 hover:underline text-sm mt-1">
          Remove
        </button>
      </div>
      <button
        @click="addSkill(PORTFOLIO_FORM_SKILLS)"
        class="text-blue-400 hover:underline text-sm"
      >
        + Add Skill
      </button>
    </div>

    <div class="flex mb-5">
      <BaseButton
        class="ml-auto"
        :label="'Save'"
        :icon="Save"
        :isLoading="isSaving"
        @click="onSubmit"
      />
    </div>
  </div>
</template>
