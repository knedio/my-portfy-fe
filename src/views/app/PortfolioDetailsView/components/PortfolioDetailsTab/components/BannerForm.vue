<script setup lang="ts">
import FormInput from '@/components/forms/FormInput.vue';
</script>

<template>
  <div id="banner-form" class="space-y-4 mb-5">
    <h2 class="text-xl font-semibold mb-2">Banner</h2>
    <FormInput name="banner.title" label="Title" placeholder="Banner title" />
    <FormInput
      name="banner.description"
      label="Description"
      type="textarea"
      placeholder="Write something banner yourself"
    />
    <FormInput
      name="banner.btnLabel"
      label="Button Label (optional)"
      placeholder="e.g. Get in Touch"
    />
  </div>
</template>
