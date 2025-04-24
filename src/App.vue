<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, defineAsyncComponent } from 'vue';
import { useToast } from '@/composables/useToast';
import ToastMessage from '@/components/popups/ToastMessage.vue';

const { toastList } = useToast();
const route = useRoute();

const layout = computed(() => {
  const layoutName = route.meta.layout || 'DefaultLayout';
  return defineAsyncComponent(() => import(`@/layouts/${layoutName}.vue`));
});
</script>

<template>
  <component :is="layout"></component>

  <!-- global toast -->
  <div class="fixed top-4 right-4 z-[9999] space-y-2">
    <ToastMessage
      v-for="toast in toastList"
      :key="toast.id"
      :id="toast.id"
      :title="toast.title"
      :message="toast.message"
      :type="toast.type"
      @close="toastList = toastList.filter((t) => t.id !== toast.id)"
    />
  </div>
</template>

<style scoped></style>
