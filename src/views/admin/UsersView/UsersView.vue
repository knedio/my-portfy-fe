<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { User } from '@/models/user.model';
import DataTable from '@/components/tables/DataTable/DataTable.vue';
import type { ColumnDef } from '@tanstack/vue-table';
import { getUsers } from '@/services/userService';

const users = ref<User[]>([]);
const paginationMeta = ref({
  total: 0,
  page: 1,
  perPage: 5,
  totalPages: 0,
});

const columns: ColumnDef<User>[] = [
  {
    header: 'Name',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Role',
    accessorFn: (row) => row.role?.name ?? '-',
  },
];

const fetchUsers = async () => {
  const { data, meta } = await getUsers({
    page: paginationMeta.value.page,
    perPage: paginationMeta.value.perPage,
  });
  const { total, perPage, currentPage, totalPages } = meta;

  users.value = data;
  paginationMeta.value.total = total;
  paginationMeta.value.perPage = perPage;
  paginationMeta.value.page = currentPage;
  paginationMeta.value.totalPages = totalPages;
};

const handlePageChange = (page: number) => {
  paginationMeta.value.page = page;
  fetchUsers();
};

onMounted(async () => {
  await fetchUsers();
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Users</h1>
    <DataTable
      :data="users"
      :columns="columns"
      :meta="paginationMeta"
      :onPageChange="handlePageChange"
    />
  </div>
</template>
