<script setup lang="ts">
import { ref } from 'vue';
import { useMotion } from '@vueuse/motion';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { registerUser } from '@/services/authService';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const { defineField, errors, handleSubmit, resetForm } = useForm({ validationSchema: schema });
const [nameField] = defineField('name');
const [emailField] = defineField('email');
const [passwordField] = defineField('password');
const [confirmPasswordField] = defineField('confirmPassword');

const successMessage = ref('');
const errorMessage = ref('');
const isSubmitting = ref(false);

const onRegister = handleSubmit(async (values) => {
  try {
    isSubmitting.value = true;
    await registerUser(values.name, values.email, values.password);
    successMessage.value = 'Registered successfully!';
    setTimeout(() => (successMessage.value = ''), 3000);

    errorMessage.value = '';
    resetForm();
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;
    errorMessage.value = err.response?.data?.message || 'Registration failed';
  } finally {
    isSubmitting.value = false;
  }
});

const registrationForm = ref(null);
useMotion(registrationForm, {
  initial: { opacity: 0, y: 50 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 500 },
  },
});
</script>

<template>
  <div class="flex items-center justify-center">
    <div ref="registrationForm" class="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold text-center mb-6">Sign Up</h2>
      <form @submit.prevent="onRegister" class="space-y-4">
        <div>
          <label class="block text-gray-300 mb-2">Name</label>
          <input
            v-model="nameField"
            type="text"
            class="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-red-400 mt-1">{{ errors.name }}</p>
        </div>
        <div>
          <label class="block text-gray-300 mb-2">Email</label>
          <input
            v-model="emailField"
            type="email"
            class="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-red-400 mt-1">{{ errors.email }}</p>
        </div>
        <div>
          <label class="block text-gray-300 mb-2">Password</label>
          <input
            v-model="passwordField"
            type="password"
            class="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-red-400 mt-1">{{ errors.password }}</p>
        </div>
        <div>
          <label class="block text-gray-300 mb-2">Confirm Password</label>
          <input
            v-model="confirmPasswordField"
            type="password"
            class="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-red-400 mt-1">{{ errors.confirmPassword }}</p>
        </div>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300"
        >
          <span v-if="isSubmitting">Signing Up...</span>
          <span v-else>Sign Up</span>
        </button>
      </form>
      <p v-if="successMessage" class="text-green-400 text-center mt-4">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-danger-400 text-center mt-4">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
