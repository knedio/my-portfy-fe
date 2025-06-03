<script setup lang="ts">
import { ref } from 'vue';
import { useMotion } from '@vueuse/motion';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { registerUser } from '@/services/authService';
import { RegistrationForm } from '@/models/forms/registration-form.model';
import FormInput from '@/components/forms/FormInput.vue';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const { handleSubmit, resetForm } = useForm<RegistrationForm>({
  validationSchema: schema,
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  },
});

const successMessage = ref('');
const errorMessage = ref('');
const isSubmitting = ref(false);

const onRegister = handleSubmit(async (values) => {
  try {
    isSubmitting.value = true;
    await registerUser(values);
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
    <div ref="registrationForm" class="max-w-lg w-full bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold text-center mb-6">Sign Up</h2>
      <form @submit.prevent="onRegister" class="space-y-4">
        <div class="flex gap-4 mb-0">
          <FormInput
            inputClass="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="firstName"
            label="First Name"
            placeholder="Enter first name"
          />
          <FormInput
            inputClass="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="lastName"
            label="Last Name"
            placeholder="Enter last name"
          />
        </div>
        <FormInput
          inputClass="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="email"
          label="Email"
          placeholder="Enter email"
        />
        <FormInput
          inputClass="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="username"
          label="Username"
          placeholder="Enter username"
        />
        <FormInput
          inputClass="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter password"
        />
        <FormInput
          inputClass="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Enter confirm Password"
        />

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 mt-4"
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
