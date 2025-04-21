<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, defineAsyncComponent } from 'vue';

const route = useRoute();

const layout = computed(() => {
  const layoutName = route.meta.layout || 'DefaultLayout';
  return defineAsyncComponent(() => import(`@/layouts/${layoutName}.vue`));
});
</script>

<template>
  <component :is="layout"></component>
</template>

<style scoped></style>
