<script setup lang="ts">
import { ref } from 'vue';
import { useMotion } from '@vueuse/motion';

const name = ref('');
const email = ref('');
const message = ref('');
const form = ref<HTMLFormElement | null>(null);
const successMessage = ref(false);

const onSubmit = () => {
  if (name.value && email.value && message.value) {
    successMessage.value = true;
    setTimeout(() => (successMessage.value = false), 3000);
    name.value = '';
    email.value = '';
    message.value = '';
  }
};

const contactForm = ref(null);

useMotion(contactForm, {
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
    <div ref="contactForm" class="max-w-lg w-full bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold text-center mb-6">Contact Us</h2>
      <form ref="form" @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="block text-gray-300 mb-2">Name</label>
          <input
            v-model="name"
            type="text"
            class="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label class="block text-gray-300 mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label class="block text-gray-300 mb-2">Message</label>
          <textarea
            v-model="message"
            rows="4"
            class="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300"
        >
          Send Message
        </button>
      </form>
      <p v-if="successMessage" class="text-center text-green-400 mt-4">
        Your message has been sent successfully!
      </p>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
