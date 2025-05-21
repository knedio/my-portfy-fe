<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMotion } from '@vueuse/motion';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { loginUser } from '@/services/authService';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const auth = useAuthStore();

const schema = yup.object({
  login: yup.string().required('Email or username is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const { defineField, errors, handleSubmit } = useForm({ validationSchema: schema });
const [login] = defineField('login');
const [password] = defineField('password');

const errorMessage = ref('');
const successMessage = ref('');

const isLoading = ref(false);

const onLogin = handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    const { user, token } = await loginUser(values.login, values.password);

    auth.login(token, user);

    successMessage.value = 'Signed in successfully!';
    errorMessage.value = '';

    router.push('/app/dashboard');
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;
    errorMessage.value = err.response?.data?.message || 'Login failed';
  } finally {
    isLoading.value = false;
  }
});

const onLoginGoogle = () => {
  console.log('Signing in with Google...');
};

const onLoginFacebook = () => {
  console.log('Signing in with Facebook...');
};

const onRedirectRegister = () => {
  router.push('/sign-up');
};

const signInForm = ref(null);

useMotion(signInForm, {
  initial: { opacity: 0, y: 50 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 500 },
  },
});
</script>

<template>
  <div class="flex justify-center">
    <div ref="signInForm" class="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold text-center mb-6">Sign In</h2>
      <form @submit.prevent="onLogin" class="space-y-4">
        <div>
          <label class="block text-gray-300 mb-2">Email or Username</label>
          <input
            v-model="login"
            type="text"
            class="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-red-400 mt-1">{{ errors.login }}</p>
        </div>
        <div>
          <label class="block text-gray-300 mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-red-400 mt-1">{{ errors.password }}</p>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300"
        >
          Sign In
        </button>
      </form>
      <p v-if="errorMessage" class="text-red-400 text-center mt-4">{{ errorMessage }}</p>
      <p v-if="successMessage" class="text-green-400 text-center mt-4">{{ successMessage }}</p>

      <div class="mt-6 text-center">
        <p class="text-gray-400">Or sign in with</p>
        <div class="flex flex-col space-y-4 mt-4">
          <button
            @click="onLoginGoogle"
            class="flex items-center justify-center w-full bg-white text-gray-700 font-semibold py-3 px-6 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 transition duration-300"
          >
            <div class="flex gap-2 w-54">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google Logo"
                class="w-6 h-6"
              />
              Continue with Google
            </div>
          </button>
          <button
            @click="onLoginFacebook"
            class="flex items-center justify-center w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md border border-blue-700 hover:bg-blue-700 transition duration-300"
          >
            <div class="flex gap-2 w-54">
              <img
                src="https://www.svgrepo.com/show/452197/facebook.svg"
                alt="Facebook Logo"
                class="w-6 h-6 rounded-full bg-white"
              />
              Continue with Facebook
            </div>
          </button>
        </div>
      </div>

      <div class="text-center mt-4">
        <p class="text-gray-400">Don't have an account?</p>
        <button
          @click="onRedirectRegister"
          class="mt-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition duration-300"
        >
          Sign Up
        </button>
      </div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
