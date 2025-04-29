<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { updateProfileSettings, uploadProfilePhoto } from '@/services/userService';
import { useAuthStore } from '@/stores/auth';
import { Loader2 } from 'lucide-vue-next';
import { useToast } from '@/composables/useToast';
import { getProfessions } from '@/services/professionService';
import BaseButton from '@/components/buttons/BaseButton/BaseButton.vue';
import FormSelect from '@/components/forms/FormSelect.vue';
import FormInput from '@/components/forms/FormInput.vue';
import { getUserProfile } from '@/services/authService';
import { ProfileForm } from '@/models/forms/profile-form.model';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const storageUrl = `${VITE_API_BASE_URL}/storage/`;

const auth = useAuthStore();
const { showToast } = useToast();

const isUploading = ref(false);
const isSaving = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const professionOptions = ref<{ label: string; value: number }[]>([]);

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  professionId: yup.number().nullable().required('Profession is required'),
  location: yup.string().nullable(),
});

const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    professionId: null,
    location: '',
  } as unknown as ProfileForm,
});

const onGetProfessions = async () => {
  try {
    const professions = await getProfessions();
    if (professions.data) {
      professionOptions.value = professions.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
    }
  } catch (error) {
    console.error('Failed', error);
    showToast('Failed.', 'error');
  }
};

const onGetUserProfile = async () => {
  try {
    const user = await getUserProfile();

    if (user.data) {
      setValues({
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        email: user.data.email,
        professionId: user.data.professionId ?? null,
        location: user.data.location ?? '',
      });
    }
  } catch (error) {
    console.error('Failed', error);
    showToast('Failed.', 'error');
  }
};

const onPhotoClick = () => {
  if (!isUploading.value) fileInput.value?.click();
};

const onFileSelected = async (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0];
  if (!file) return;

  try {
    isUploading.value = true;
    const { user } = await uploadProfilePhoto(file);
    auth.setUser(user);
    showToast('Upload successfully!', 'success');
  } catch (error) {
    console.error('Upload failed', error);
    showToast('Upload failed.', 'error');
  } finally {
    isUploading.value = false;
  }
};

const onSave = handleSubmit(async (values) => {
  try {
    isSaving.value = true;
    await updateProfileSettings(values);
    showToast('Profile updated successfully!', 'success');
  } catch (error) {
    console.error('Failed', error);
    showToast('Failed.', 'error');
  } finally {
    isSaving.value = false;
  }
});

onMounted(async () => {
  await onGetUserProfile();
  await onGetProfessions();
});
</script>

<template>
  <div class="bg-gray-800 rounded-lg p-8 mb-8">
    <div class="flex items-start gap-8">
      <div class="flex-shrink-0 relative">
        <img
          :src="
            auth.user?.image
              ? `${storageUrl}${auth.user.image}`
              : 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
          "
          alt="Profile"
          class="w-32 h-32 rounded-lg bg-gray-700 object-cover"
        />

        <div
          v-if="isUploading"
          class="absolute top-0 left-0 w-32 h-32 flex items-center justify-center bg-black/50 rounded-lg"
        >
          <Loader2 class="w-6 h-6 text-white animate-spin" />
        </div>

        <input
          type="file"
          ref="fileInput"
          class="hidden"
          @change="onFileSelected"
          accept="image/*"
        />

        <button
          @click="onPhotoClick"
          class="mt-4 w-full text-sm text-blue-400 hover:text-blue-300 disabled:opacity-50"
          :disabled="isUploading"
        >
          {{ isUploading ? 'Uploading...' : 'Change Photo' }}
        </button>
      </div>

      <div class="flex-grow">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            inputClass="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="firstName"
            label="First Name"
            placeholder="Your first name"
          />
          <FormInput
            inputClass="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="lastName"
            label="Last Name"
            placeholder="Your last name"
          />
          <FormInput
            inputClass="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            name="email"
            label="Email"
            placeholder="Enter Email"
          />
          <div class="hidden md:flex"></div>
          <FormSelect
            name="professionId"
            label="Profession"
            :options="professionOptions"
            inputClass="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FormInput
            inputClass="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="location"
            label="Location"
            placeholder="Enter Location"
          />
        </div>
      </div>
    </div>

    <div class="mt-5 flex justify-end">
      <BaseButton class="ml-auto" label="Save Changes" @click="onSave" />
    </div>
  </div>
</template>
