<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Role } from '@/models/role.model';
import DataTable from '@/components/tables/DataTable/DataTable.vue';
import type { ColumnDef } from '@tanstack/vue-table';
import { getRoles } from '@/services/roleService';

const roles = ref<Role[]>([]);
const paginationMeta = ref({
  total: 0,
  page: 1,
  perPage: 5,
  totalPages: 0,
});

const columns: ColumnDef<Role>[] = [
  {
    header: 'Name',
    accessorFn: (row) => `${row.name}`,
  },
];

const fetchRoles = async () => {
  const { data, meta } = await getRoles({
    page: paginationMeta.value.page,
    perPage: paginationMeta.value.perPage,
  });
  const { total, perPage, currentPage, totalPages } = meta;

  roles.value = data;
  paginationMeta.value.total = total;
  paginationMeta.value.perPage = perPage;
  paginationMeta.value.page = currentPage;
  paginationMeta.value.totalPages = totalPages;
};

const handlePageChange = (page: number) => {
  paginationMeta.value.page = page;
  fetchRoles();
};

onMounted(async () => {
  await fetchRoles();
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Roles</h1>
    <DataTable
      :data="roles"
      :columns="columns"
      :meta="paginationMeta"
      :onPageChange="handlePageChange"
    />
  </div>
</template>
