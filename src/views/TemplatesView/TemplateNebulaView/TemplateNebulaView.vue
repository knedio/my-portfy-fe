<script setup lang="ts">
import Header from './components/NebulaHeader.vue';
import Banner from './components/NebulaBanner.vue';
import About from './components/NebulaAbout.vue';
import Skills from './components/NebulaSkills.vue';
import Projects from './components/NebulaProjects.vue';
import Contact from './components/NebulaContact.vue';
import { getPortfolioDetails } from '@/services/portfolioService';
import { onMounted, onUnmounted, watch } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';
import Loading from 'vue-loading-overlay';
import { PortfolioDetails } from '@/models/portfolio.model';

const portfolioStore = usePortfolioStore();

const props = defineProps<{
  data?: PortfolioDetails;
}>();

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

onMounted(async () => {
  if (!portfolioStore.data) {
    // if no prop and no existing data, fetch from API
    await onGetDetails();
  }
});

onUnmounted(() => {
  portfolioStore.$reset();
});
</script>

<template>
  <div class="overflow-y-auto nebula-template flex flex-col">
    <Header />
    <div class="flex-1">
      <Loading
        :active="portfolioStore.isLoading"
        loader="dots"
        :opacity="0.1"
        :is-full-page="false"
      />

      <div v-if="!portfolioStore.isLoading">
        <Banner />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
