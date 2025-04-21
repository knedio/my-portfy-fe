<script setup lang="ts">
import { onMounted, ref } from 'vue';
import FormTabs from '@/components/forms/FormTab.vue';
import PortfolioDetailsTab from './components/PortfolioDetailsTab.vue';
import PortfolioTemplateTab from './components/PortfolioTemplateTab.vue';
import TemplateNebulaView from '@/views/TemplatesView/TemplateNebulaView/TemplateNebulaView.vue';
import { PortfolioDetails } from '@/models/portfolio.model';
import {
  PORTFOLIO_FORM,
  PORTFOLIO_SCROLL_CONTAINER_SELECTOR,
} from '@/models/constants/portfolio-form.constants';

type PortfolioTab = 'details' | 'template';

const activeTab = ref<PortfolioTab>('details');
const previewData = ref<PortfolioDetails>(PORTFOLIO_FORM);

const onUpdatePreview = (payload: PortfolioDetails) => {
  previewData.value = payload;
};

onMounted(async () => {});
</script>

<template>
  <div class="portfolio-container flex gap-8 px-6 py-4 overflow-hidden">
    <div class="w-1/2 overflow-y-auto pr-4">
      <FormTabs
        v-model:activeTab="activeTab"
        :tabs="[
          { label: 'Details', key: 'details' },
          { label: 'Template', key: 'template' },
        ]"
      >
        <template v-slot="slotProps">
          <div v-if="slotProps?.activeTab === 'details'">
            <PortfolioDetailsTab @update="onUpdatePreview" />
          </div>
          <div v-else-if="slotProps?.activeTab === 'template'">
            <PortfolioTemplateTab />
          </div>
        </template>
      </FormTabs>
    </div>
    <div class="preview-wrapper relative shadow-lg w-1/2">
      <div :class="'overflow-y-auto h-full ' + PORTFOLIO_SCROLL_CONTAINER_SELECTOR">
        <TemplateNebulaView :data="previewData" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.portfolio-container {
  height: 84vh;

  .preview-wrapper {
    aspect-ratio: 16 / 9;
    transform: scale(0.9);
    transform-origin: top;
    border: 1px solid #e5e7eb;
  }
}
</style>
