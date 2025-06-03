<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, watchEffect, markRaw } from 'vue';
import TemplateNebulaView from '@/views/TemplatesView/TemplateNebulaView/TemplateNebulaView.vue';
import TemplateMistView from '@/views/TemplatesView/TemplateMistView/TemplateMistView.vue';
import TemplateLuminaView from '@/views/TemplatesView/TemplateLuminaView/TemplateLuminaView.vue';
import TemplateAetherView from '@/views/TemplatesView/TemplateAetherView/TemplateAetherView.vue';
import TemplateOrionView from '@/views/TemplatesView/TemplateOrionView/TemplateOrionView.vue';
import { getPortfolioDetails } from '@/services/portfolioService';
import { onMounted, onUnmounted, watch } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';
import { PortfolioDetails } from '@/models/portfolio.model';
import { useAuthStore } from '@/stores/auth';

const props = defineProps<{
  isPreview?: boolean;
  data?: PortfolioDetails;
}>();

const authStore = useAuthStore();
const portfolioStore = usePortfolioStore();

const route = useRoute(); // get current route
const router = useRouter(); // router instance

const component = ref(); // holds the current template component

watch(
  () => props.data,
  (newData) => {
    if (newData) {
      portfolioStore.setPortfolio(newData);
    }
  },
  { immediate: true, deep: true }
);

const onGetDetails = async () => {
  portfolioStore.setLoading(true);
  const { data } = await getPortfolioDetails();

  portfolioStore.setPortfolio(data);
  portfolioStore.setLoading(false);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const templateMap: Record<string, any> = {
  nebula: TemplateNebulaView,
  lumina: TemplateLuminaView,
  aether: TemplateAetherView,
  orion: TemplateOrionView,
  mist: TemplateMistView,
};

watchEffect(() => {
  const name = route.params.template as string; // get template name from route

  const template: string = props.isPreview
    ? (authStore.user?.template.name.toLocaleLowerCase() ?? name)
    : name;

  if (!templateMap[template] && !props.isPreview) {
    router.replace('/not-found'); // redirect if template not found
    return;
  }

  console.log('template', template);

  component.value = markRaw(templateMap[template]); // prevent vue from making component reactive
});

onMounted(async () => {
  console.log('portfolioStore.data', portfolioStore.data);
  if (!portfolioStore.data && !props.isPreview) {
    // if no prop and no existing data, fetch from API
    await onGetDetails();
  }
});

onUnmounted(() => {
  portfolioStore.$reset();
});
</script>

<template>
  <component :is="component" />
</template>
