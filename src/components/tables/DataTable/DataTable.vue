<script setup lang="ts" generic="T">
import { ColumnDef, getCoreRowModel, useVueTable, FlexRender } from '@tanstack/vue-table';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

const props = defineProps<{
  data: T[];
  columns: ColumnDef<T, unknown>[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
}>();

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
});
</script>

<template>
  <div class="rounded-lg overflow-hidden bg-gray-900 shadow-lg border border-gray-700">
    <table class="min-w-full text-sm text-left text-gray-300">
      <thead class="bg-gray-800 uppercase text-xs text-gray-400 border-b border-gray-700">
        <tr>
          <th
            v-for="header in table.getHeaderGroups()[0]?.headers"
            :key="header.id"
            class="px-4 py-3"
          >
            <span v-if="!header.isPlaceholder">
              <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          class="hover:bg-gray-800 border-b border-gray-700"
        >
          <td v-for="cell in row.getVisibleCells()" :key="cell.id" class="px-4 py-3">
            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex justify-between items-center px-4 py-3 bg-gray-800 text-gray-300">
      <div>
        Showing
        <span class="font-semibold">{{ props.meta.perPage }}</span>
        per page —
        <span class="font-semibold">{{ props.meta.total }}</span> total
      </div>
      <div class="flex items-center gap-2">
        <button
          class="p-2 rounded hover:bg-gray-700 disabled:opacity-50"
          :disabled="props.meta.page === 1"
          @click="props.onPageChange?.(props.meta.page - 1)"
        >
          <ChevronLeft class="w-5 h-5" />
        </button>
        <span class="text-sm"> Page {{ props.meta.page }} of {{ props.meta.totalPages }} </span>
        <button
          class="p-2 rounded hover:bg-gray-700 disabled:opacity-50"
          :disabled="props.meta.page === props.meta.totalPages"
          @click="props.onPageChange?.(props.meta.page + 1)"
        >
          <ChevronRight class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>
