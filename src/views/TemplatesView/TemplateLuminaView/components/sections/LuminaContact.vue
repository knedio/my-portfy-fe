<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { storeToRefs } from 'pinia';
import FormInput from '@/components/forms/FormInput.vue';
import { sendMessage } from '@/services/contactService';
import { usePortfolioStore } from '@/stores/portfolio';

const portfolioStore = usePortfolioStore();
const { data } = storeToRefs(portfolioStore);

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  message: yup.string().required('Message is required'),
});

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    email: '',
    message: '',
  },
});

const formSubmitted = ref(false);

const onSubmit = handleSubmit(async (formValues) => {
  isSubmitting.value = true;

  try {
    await sendMessage(formValues);
    resetForm();
  } catch (error) {
    console.log('Error', error);
  } finally {
    formSubmitted.value = true;
    isSubmitting.value = false;
  }
});
</script>

<template>
  <section id="contact" class="contact">
    <div class="container">
      <h2 class="section-heading">Get in Touch</h2>

      <div class="contact-container">
        <div
          class="contact-info"
          v-motion
          :initial="{ opacity: 0, x: -50 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 800 } }"
        >
          <h3>Let's Work Together</h3>
          <p>
            Have a project in mind or just want to say hello? Feel free to reach out to me. I'm
            always open to discussing new projects, creative ideas, or opportunities to be part of
            your vision.
          </p>

          <div class="contact-methods">
            <div class="contact-method">
              <div class="contact-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  ></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div class="contact-text">
                <span>Email</span>
                <a :href="`mailto:${data?.contactEmail}`">{{ data?.contactEmail }}</a>
              </div>
            </div>

            <div class="contact-method">
              <div class="contact-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div class="contact-text">
                <span>Location</span>
                <p>{{ data?.location }}</p>
              </div>
            </div>

            <div class="contact-method">
              <div class="contact-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  ></path>
                </svg>
              </div>
              <div class="contact-text">
                <span>Phone</span>
                <a :href="`tel:${data?.mobileNumber}`">{{ data?.mobileNumber }}</a>
              </div>
            </div>
          </div>
        </div>

        <div
          class="contact-form glass-card"
          v-motion
          :initial="{ opacity: 0, x: 50 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 800 } }"
        >
          <form @submit="onSubmit" v-if="!formSubmitted">
            <div class="form-group">
              <FormInput name="name" label="Name" placeholder="Enter name here" />
            </div>

            <div class="form-group">
              <FormInput name="email" label="Email" placeholder="Enter email address here" />
            </div>

            <div class="form-group">
              <FormInput
                name="message"
                label="Message"
                type="textarea"
                placeholder="Enter message here"
              />
            </div>

            <button type="submit" class="button submit-btn" :disabled="isSubmitting">
              <span v-if="isSubmitting">Sending...</span>
              <span v-else>Send Message</span>
            </button>
          </form>

          <div class="success-message" v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
            <button class="button" @click="formSubmitted = false">Send Another</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-5);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.contact-info {
  padding-right: var(--space-4);

  @media (max-width: 768px) {
    padding-right: 0;
  }

  h3 {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--space-3);
  }

  p {
    color: var(--lumina-text-secondary);
    margin-bottom: var(--space-5);
    font-size: var(--font-size-lg);
    line-height: 1.7;
  }
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.contact-method {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.contact-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--lumina-primary), var(--lumina-secondary));
  border-radius: var(--border-radius);

  svg {
    color: white;
  }
}

.contact-text {
  display: flex;
  flex-direction: column;

  span {
    font-size: var(--font-size-sm);
    color: var(--lumina-text-muted);
  }

  a,
  p {
    margin: var(--space-1) 0 0;
    font-size: var(--font-size-base);
  }
}

.contact-form {
  padding: var(--space-5);

  .input-error {
    border-color: var(--lumina-error);
  }
}

.form-group {
  margin-bottom: var(--space-4);

  label {
    display: block;
    margin-bottom: var(--space-1);
    font-size: var(--font-size-sm);
    color: var(--lumina-text-secondary);
  }
}

.submit-btn {
  width: 100%;
  margin-top: var(--space-3);
}

.success-message {
  text-align: center;
  padding: var(--space-5) 0;

  svg {
    color: var(--lumina-success);
    margin-bottom: var(--space-3);
  }

  h3 {
    margin-bottom: var(--space-3);
    font-size: var(--font-size-2xl);
  }

  p {
    margin-bottom: var(--space-4);
    color: var(--lumina-text-secondary);
  }
}
</style>
