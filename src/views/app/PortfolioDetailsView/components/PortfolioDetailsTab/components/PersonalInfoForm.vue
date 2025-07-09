<script setup lang="ts">
import FormInput from '@/components/forms/FormInput.vue';
</script>

<template>
  <div id="personal-info-form" class="space-y-4 mb-5">
    <div class="flex gap-4">
      <FormInput class="w-full" name="firstName" label="First Name" placeholder="Your first name" />
      <FormInput class="w-full" name="lastName" label="Last Name" placeholder="Your last name" />
    </div>
    <FormInput
      name="contactEmail"
      label="Contact Email"
      type="email"
      placeholder="Your email address"
    />
    <FormInput name="location" label="Location" placeholder="Your location" />
  </div>
</template>
