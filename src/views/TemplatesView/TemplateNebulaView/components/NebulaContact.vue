<script setup lang="ts">
import { reactive, ref } from 'vue';

const form = reactive({
  name: '',
  email: '',
  message: '',
});

const errors = reactive({
  name: '',
  email: '',
  message: '',
});

const isSubmitting = ref(false);

const onValidateForm = () => {
  let isValid = true;

  if (!form.name.trim()) {
    errors.name = 'Name is required';
    isValid = false;
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email';
    isValid = false;
  }

  if (!form.message.trim()) {
    errors.message = 'Message is required';
    isValid = false;
  }

  return isValid;
};

const onSubmit = async () => {
  if (!onValidateForm()) return;

  isSubmitting.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form submitted:', form);

    // Reset form
    form.name = '';
    form.email = '';
    form.message = '';

    alert('Message sent successfully!');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    alert('Failed to send message. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section id="contact" class="section bg-gray-800 text-white">
    <div class="container">
      <h2 class="title">Get in Touch</h2>
      <div class="max-w-lg mx-auto">
        <form
          @submit.prevent="onSubmit"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0 }"
          class="p-6 sm:p-8 rounded-xl shadow-lg bg-gray-900/50 border border-gray-700"
        >
          <div class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                class="input-field w-full bg-gray-800 border-gray-700 text-white"
                :class="{ 'border-red-500': errors.name }"
                @focus="errors.name = ''"
              />
              <p v-if="errors.name" class="mt-1 text-sm text-red-400">{{ errors.name }}</p>
            </div>
            <div>
              <label for="email" class="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="input-field w-full bg-gray-800 border-gray-700 text-white"
                :class="{ 'border-red-500': errors.email }"
                @focus="errors.email = ''"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-400">{{ errors.email }}</p>
            </div>
            <div>
              <label for="message" class="block text-sm font-medium mb-1">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="4"
                class="input-field w-full bg-gray-800 border-gray-700 text-white"
                :class="{ 'border-red-500': errors.message }"
                @focus="errors.message = ''"
              ></textarea>
              <p v-if="errors.message" class="mt-1 text-sm text-red-400">{{ errors.message }}</p>
            </div>
            <button type="submit" class="btn-primary w-full" :disabled="isSubmitting">
              <span v-if="isSubmitting">Sending...</span>
              <span v-else>Send Message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
