<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Template } from '@/models/template.model';
import DataTable from '@/components/tables/DataTable/DataTable.vue';
import type { ColumnDef } from '@tanstack/vue-table';
import { getTemplates } from '@/services/templateService';

const templates = ref<Template[]>([]);
const paginationMeta = ref({
  total: 0,
  page: 1,
  perPage: 5,
  totalPages: 0,
});

const columns: ColumnDef<Template>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Description',
    accessorKey: 'description',
  },
  {
    header: 'Preview Image',
    accessorKey: 'previewImage',
  },
  {
    header: 'Created At',
    accessorKey: 'createdAt',
  },
  {
    header: 'Updated At',
    accessorKey: 'updatedAt',
  },
];

const fetchTemplates = async () => {
  const { data, meta } = await getTemplates({
    page: paginationMeta.value.page,
    perPage: paginationMeta.value.perPage,
  });
  const { total, perPage, currentPage, totalPages } = meta;

  templates.value = data;
  paginationMeta.value.total = total;
  paginationMeta.value.perPage = perPage;
  paginationMeta.value.page = currentPage;
  paginationMeta.value.totalPages = totalPages;
};

const handlePageChange = (page: number) => {
  paginationMeta.value.page = page;
  fetchTemplates();
};

onMounted(async () => {
  await fetchTemplates();
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Templates</h1>
    <DataTable
      :data="templates"
      :columns="columns"
      :meta="paginationMeta"
      :onPageChange="handlePageChange"
    />
  </div>
</template>
