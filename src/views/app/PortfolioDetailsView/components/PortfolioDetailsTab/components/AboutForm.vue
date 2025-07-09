<script setup lang="ts">
import FormInput from '@/components/forms/FormInput.vue';
</script>

<template>
  <div id="about-form" class="space-y-4 mb-5">
    <h2 class="text-xl font-semibold mb-2">About</h2>
    <FormInput name="about.title" label="Title" placeholder="About title" />
    <FormInput
      name="about.description"
      label="Description"
      type="textarea"
      placeholder="Write something about yourself"
    />
    <FormInput name="about.image" label="Image URL (optional)" placeholder="e.g. https://..." />
  </div>
</template>
