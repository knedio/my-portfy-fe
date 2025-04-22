<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import FormInput from '@/components/forms/FormInput.vue';
import { sendMessage } from '@/services/contactService';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  message: yup.string().required('Message is required'),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    email: '',
    message: '',
  },
});

const isSubmitting = ref(false);

const onSubmit = handleSubmit(async (formValues) => {
  isSubmitting.value = true;

  try {
    await sendMessage(formValues);
    resetForm();
  } catch (error) {
    console.log('Error', error);
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <section id="contact" class="section bg-gray-800 text-white">
    <div class="container">
      <h2 class="title">Get in Touch</h2>
      <div class="max-w-lg mx-auto">
        <form
          @submit.prevent="onSubmit"
          class="p-6 sm:p-8 rounded-xl shadow-lg bg-gray-900/50 border border-gray-700 space-y-6"
        >
          <FormInput name="name" label="Name" placeholder="Enter name here" />
          <FormInput name="email" label="Email" placeholder="Enter email address here" />
          <FormInput
            name="message"
            label="Message"
            type="textarea"
            placeholder="Enter message here"
          />
          <button type="submit" class="btn-primary w-full" :disabled="isSubmitting">
            <span v-if="isSubmitting">Sending...</span>
            <span v-else>Send Message</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
