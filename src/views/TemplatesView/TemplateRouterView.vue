<script setup lang="ts">
import Loading from 'vue-loading-overlay';
import { useRoute, useRouter } from 'vue-router';
import { ref, markRaw } from 'vue';
import TemplateNebulaView from '@/views/TemplatesView/TemplateNebulaView/TemplateNebulaView.vue';
import TemplateMistView from '@/views/TemplatesView/TemplateMistView/TemplateMistView.vue';
import TemplateLuminaView from '@/views/TemplatesView/TemplateLuminaView/TemplateLuminaView.vue';
import TemplateAetherView from '@/views/TemplatesView/TemplateAetherView/TemplateAetherView.vue';
import TemplateOrionView from '@/views/TemplatesView/TemplateOrionView/TemplateOrionView.vue';
import { getPortfolioDetails, getPortfolioDetailsByUsername } from '@/services/portfolioService';
import { onMounted, onUnmounted, watch } from 'vue';
import { PortfolioDetails } from '@/models/portfolio.model';
import { usePortfolioStore } from '@/stores/portfolio';

const props = defineProps<{
  isPreview?: boolean;
  data?: PortfolioDetails;
}>();

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
  const username = route.params.username as string;

  const { data } = username
    ? await getPortfolioDetailsByUsername(username)
    : await getPortfolioDetails();

  portfolioStore.setPortfolio(data);

  const template: string = portfolioStore?.data?.template.name.toLocaleLowerCase() ?? '';

  if (!templateMap[template] && !props.isPreview) {
    router.replace('/not-found'); // redirect if template not found
    return;
  }

  component.value = markRaw(templateMap[template]); // prevent vue from making component reactive

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

onMounted(async () => {
  await onGetDetails();
});

onUnmounted(() => {
  portfolioStore.$reset();
});
</script>

<template>
  <div>
    <Loading
      :active="portfolioStore.isLoading"
      loader="dots"
      :opacity="0.1"
      :is-full-page="false"
    />
    <component v-if="!portfolioStore.isLoading" :is="component" />
  </div>
</template>
