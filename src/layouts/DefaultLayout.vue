<script setup lang="ts">
import HeaderNavComponent from '@/components/navs/HeaderNavComponent/HeaderNavComponent.vue';
</script>

<template>
  <HeaderNavComponent />
  <main class="min-h-screen bg-gray-900 text-white mx-auto max-w-8xl px-10">
    <RouterView class="" />
  </main>
</template>

<style scoped></style>
