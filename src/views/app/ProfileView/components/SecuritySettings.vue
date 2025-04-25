<script setup lang="ts">
import { ref } from 'vue';
import { updatePassword } from '@/services/userService';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import BaseButton from '@/components/buttons/BaseButton/BaseButton.vue';
import FormInput from '@/components/forms/FormInput.vue';
import { useToast } from '@/composables/useToast';
import { encryptAES } from '@/utils/crypto';

const { showToast } = useToast();

const schema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup.string().required('New password is required').min(8, 'Minimum of 8 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm your new password'),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const isSubmitting = ref(false);

const onUpdatePassword = handleSubmit(async (values) => {
  isSubmitting.value = true;
  try {
    await updatePassword({
      currentPassword: encryptAES(values.currentPassword),
      newPassword: encryptAES(values.newPassword),
      confirmPassword: encryptAES(values.confirmPassword),
    });

    showToast('Password updated successfully!', 'success');
    resetForm();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    showToast(error?.response?.data?.message || 'Failed to update password.', 'error');
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <div class="bg-gray-800 rounded-lg p-8 mb-10">
    <h2 class="text-xl font-bold mb-6">Security Settings</h2>
    <div class="space-y-6">
      <FormInput
        type="password"
        inputClass="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="currentPassword"
        label="Current Password"
        placeholder="Enter Current Password"
        toggleable
      />
      <FormInput
        type="password"
        inputClass="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="newPassword"
        label="New Password"
        placeholder="Enter New Password"
        toggleable
      />
      <FormInput
        type="password"
        inputClass="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="confirmPassword"
        label="Confirm New Password"
        placeholder="Enter Confirm New Password"
        toggleable
      />
    </div>

    <div class="mt-5 flex justify-end">
      <BaseButton class="ml-auto" label="Update Password" @click="onUpdatePassword" />
    </div>
  </div>
</template>
