<script setup lang="ts">
import AdminHeaderNavComponent from '@/components/navs/AdminHeaderNavComponent/AdminHeaderNavComponent.vue';
</script>

<template>
  <AdminHeaderNavComponent />
  <main class="min-h-screen bg-gray-900 text-white mx-auto max-w-8xl px-10">
    <RouterView class="" />
  </main>
</template>

<style scoped>
main {
  padding-top: 120px;
}
</style>
