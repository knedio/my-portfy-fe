<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useMotion } from '@vueuse/motion';
import FormInput from '@/components/forms/FormInput.vue';
import { sendMessage } from '@/services/contactService';
import { usePortfolioStore } from '@/stores/portfolio';
import { storeToRefs } from 'pinia';

const portfolioStore = usePortfolioStore();
const { data } = storeToRefs(portfolioStore);

const contactForm = ref(null);
const contactInfo = ref(null);

useMotion(contactForm, {
  initial: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 800,
    },
  },
});

useMotion(contactInfo, {
  initial: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 800,
      delay: 200,
    },
  },
});

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
const submitSuccess = ref(false);
const submitError = ref(false);

const onSubmit = handleSubmit(async (formValues) => {
  isSubmitting.value = true;
  submitSuccess.value = false;
  submitError.value = false;

  try {
    await sendMessage(formValues);
    submitSuccess.value = true;
    resetForm();
  } catch (error) {
    submitError.value = true;
    console.log('Error', error);
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="section-title">
        <h2>Contact Me</h2>
        <div class="title-underline"></div>
      </div>

      <div class="contact-content">
        <div ref="contactForm" class="contact-form-container">
          <h3>Get In Touch</h3>

          <form @submit="onSubmit" class="contact-form">
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

            <button type="submit" class="submit-button" :disabled="isSubmitting">
              <span v-if="isSubmitting">Sending...</span>
              <span v-else>Send Message</span>
            </button>
          </form>
        </div>

        <div ref="contactInfo" class="contact-info">
          <h3>Contact Information</h3>

          <div class="info-items">
            <div class="info-item">
              <div class="info-icon">
                <span class="icon">✉️</span>
              </div>
              <div class="info-content">
                <h4>Email Address</h4>
                <p>
                  <a :href="`mailto:${data?.contactEmail}`">{{ data?.contactEmail }}</a>
                </p>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon">
                <span class="icon">📱</span>
              </div>
              <div class="info-content">
                <h4>Phone Number</h4>
                <p>
                  <a :href="`tel:${data?.mobileNumber}`">{{ data?.mobileNumber }}</a>
                </p>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon">
                <span class="icon">📍</span>
              </div>
              <div class="info-content">
                <h4>Location</h4>
                <p>{{ data?.location }}</p>
              </div>
            </div>
          </div>

          <div class="social-links">
            <h4>Follow Me</h4>
            <div class="social-icons">
              <a href="#" class="social-icon" aria-label="Instagram">
                <span>Instagram</span>
              </a>
              <a href="#" class="social-icon" aria-label="Twitter">
                <span>Twitter</span>
              </a>
              <a href="#" class="social-icon" aria-label="LinkedIn">
                <span>LinkedIn</span>
              </a>
              <a href="#" class="social-icon" aria-label="GitHub">
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.contact-section {
  padding: 6rem 0;
  background: linear-gradient(to bottom, #44244d 0%, #190f23 100%);
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title h2 {
  font-size: 2.5rem;
  color: #fff;
  font-weight: 700;
  margin-bottom: 1rem;
}

.title-underline {
  height: 4px;
  width: 70px;
  background: linear-gradient(to right, #ff79c6, #bd93f9);
  margin: 0 auto;
  border-radius: 2px;
}

.contact-content {
  display: grid;
  grid-template-columns: 6fr 4fr;
  gap: 3rem;
}

.contact-form-container,
.contact-info {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2.5rem;
  backdrop-filter: blur(5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.contact-form-container h3,
.contact-info h3 {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 2rem;
  text-align: center;
}

.form-alert {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-alert.success {
  background: rgba(80, 250, 123, 0.2);
  color: #50fa7b;
  border: 1px solid rgba(80, 250, 123, 0.4);
}

.form-alert.error {
  background: rgba(255, 85, 85, 0.2);
  color: #ff5555;
  border: 1px solid rgba(255, 85, 85, 0.4);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: rgba(189, 147, 249, 0.6);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 3px rgba(189, 147, 249, 0.2);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.error-message {
  color: #ff5555;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  display: block;
}

.submit-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(to right, #ff79c6, #bd93f9);
  color: #fff;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(189, 147, 249, 0.4);
  font-size: 1rem;
}

.submit-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(189, 147, 249, 0.6);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.info-icon {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 1.5rem;
}

.info-content h4 {
  font-size: 1.1rem;
  color: #fff;
  margin-bottom: 0.5rem;
}

.info-content p {
  color: rgba(255, 255, 255, 0.7);
}

.social-links h4 {
  font-size: 1.1rem;
  color: #fff;
  margin-bottom: 1.5rem;
  text-align: center;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-icon {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50px;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.social-icon:hover {
  background: rgba(255, 121, 198, 0.2);
  transform: translateY(-3px);
  border-color: rgba(255, 121, 198, 0.3);
}

@media (max-width: 992px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .section-title h2 {
    font-size: 2rem;
  }

  .contact-form-container,
  .contact-info {
    padding: 2rem;
  }

  .contact-form-container h3,
  .contact-info h3 {
    font-size: 1.3rem;
  }
}
</style>
