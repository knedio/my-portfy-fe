<script setup lang="ts">
import { savePortfolioDetails, getPortfolioDetails } from '@/services/portfolioService';
import { onMounted, ref, watch } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { Save } from 'lucide-vue-next';
import { PortfolioDetails } from '@/models/portfolio.model';
import BaseButton from '@/components/buttons/BaseButton/BaseButton.vue';
import {
  PORTFOLIO_FORM_EDUCATIONS,
  PORTFOLIO_FORM,
  PORTFOLIO_FORM_PROJECTS,
  PORTFOLIO_FORM_SKILLS,
  PORTFOLIO_FORM_EXPERIENCES,
} from '@/models/constants/portfolio-form.constants';
import PersonalInfoForm from './components/PersonalInfoForm.vue';
import AboutForm from './components/AboutForm.vue';
import BannerForm from './components/BannerForm.vue';
import EducationForm from './components/EducationForm.vue';
import ExperienceForm from './components/ExperienceForm.vue';
import ProjectForm from './components/ExperienceForm.vue';
import SkillForm from './components/SkillForm.vue';

const emit = defineEmits<{
  (e: 'update', payload: PortfolioDetails): void;
}>();

const isSaving = ref(false);

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  contactEmail: yup.string().email('Invalid email').required('Email is required'),
  location: yup.string().required('Location is required'),
  mobileNumber: yup.string().required('Mobile Number is required'),
  resumeUrl: yup.string().required('Resume is required'),
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

  experiences: yup
    .array()
    .of(
      yup.object({
        position: yup.string().required('Position is required'),
        company: yup.string().required('Company is required'),
        duration: yup.string().required('Duration is required'),
        description: yup.array(),
        // .of(yup.string().required('Description item is required'))
        // .min(1, 'At least one description is required'),
      })
    )
    .min(1, 'At least one experience is required'),
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

const onSubmit = handleSubmit(
  async (formValues) => {
    try {
      isSaving.value = true;
      await savePortfolioDetails(formValues);
    } catch (error) {
      console.log('Error:', error);
    } finally {
      isSaving.value = false;
    }
  },
  (errors) => {
    console.warn('❌ Validation errors:', errors);
  }
);

const onGetDetails = async () => {
  const { data } = await getPortfolioDetails();

  if (data) {
    console.log('data', data);
    setValues({
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      contactEmail: data?.contactEmail || '',
      location: data?.location || '',
      mobileNumber: data?.mobileNumber || '',
      resumeUrl: data?.resumeUrl || '',
      about: data?.about ?? { title: '', description: '', image: '' },
      banner: data?.banner ?? { title: '', description: '', btnLabel: '' },
      educations: data.educations?.length ? data.educations : [PORTFOLIO_FORM_EDUCATIONS],
      projects: data.projects?.length ? data.projects : [PORTFOLIO_FORM_PROJECTS],
      experiences: data.experiences?.length ? data.experiences : [PORTFOLIO_FORM_EXPERIENCES],
      skills: data.skills?.length
        ? data.skills.map((skill) => ({
            ...skill,
            subSkillsText: (skill.subSkills ?? []).join(', '),
          }))
        : [PORTFOLIO_FORM_SKILLS],
    });
  }
};

onMounted(async () => {
  await onGetDetails();
});
</script>

<template>
  <div class="">
    <PersonalInfoForm />

    <BannerForm />

    <AboutForm />

    <EducationForm />

    <ProjectForm />

    <SkillForm />

    <ExperienceForm />

    <div class="flex mb-5">
      <BaseButton
        class="ml-auto"
        :label="'Save'"
        :icon="Save"
        :isLoading="isSaving"
        @click="onSubmit()"
      />
    </div>
  </div>
</template>
